import axios from "axios";
import { create } from "domain";
import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { materialData } from "../../types/materialData";

function CreateInventoryUnitPage() {

    const backend = BackendAddress;
    const options = RequestOptions;

    const deptId=window.sessionStorage.getItem('deptId');

    const [allMat, setAllMat] = useState<Array<materialData>>([]);
    const [allMatElements, setAllMatElements] = useState<Array<JSX.Element>>([]);
    const [matName, setMatName] = useState("");
    const [matId, setMatId] = useState("");
    const [availableQty, setAvailableQty] = useState(0);
    const [lowLevelQty, setLowLevelQty] = useState(0);

    useEffect(() => {
        getAllMat();
    }, [])

    function getAllMat() {
        axios.get(backend + '/api/v1/inventory/', options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    const tempData: Array<materialData> = res.data.data;
                    setAllMat(tempData);
                }
            })
    }

    useEffect(() => {
        if (allMat.length > 0) {
            var tempElements: Array<JSX.Element> = [];
            allMat.forEach(mat => {
                tempElements.push(<Dropdown.Item key={mat.materialid} id={mat.materialid} eventKey={mat.materialid}>{mat.materialName}</Dropdown.Item>)
            });
            setAllMatElements(tempElements);
        }
    }, [allMat]);

    function onMatSelect(id: string | null) {
        if (id) {
            const idFromDropdown: string = id;
            allMat.forEach(mat => {
                const idFromMat: string = mat.materialid
                if (idFromDropdown === idFromMat) {
                    setMatName(mat.materialName);
                    setMatId(id);
                }
            })
        }
    };

    function createUnitInv(){
        if(matId && lowLevelQty!=null && availableQty!=null){
            const data={
                'materialid':matId,
                'availableQty':availableQty,
                'lowLevelQty':lowLevelQty
            }
            axios.post(backend+`/api/v1/inventory-unit/${deptId}`,data,options)
            .then(res=>{
                if(res.data.status===ResponseStatus.SUCCESS){
                    alert("Successfully added unit inventory");
                }else{
                    alert(res.data.status);
                }
            })
            .catch(err=>{
                console.error(err);
                alert(err.response.data.message);
            })
        }else{
            alert('All fields are required');
        }
    }

    return (
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <h1>Create Inv Unit</h1>
            <Form className="whitebg p-3 fourth-color-text">
                <Form.Group className="m-3">
                    <Form.Label>Material</Form.Label>
                    <Dropdown onSelect={id => onMatSelect(id)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {matName.trim().length > 0 ? matName : "Select Material"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {allMatElements}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Label>Available Quantity</Form.Label>
                    <Form.Control type="number" min={0} onChange={e => { setAvailableQty(Number(e.target.value)) }} />
                </Form.Group>

                <Form.Group className="m-3">
                    <Form.Label>Low level Quantity</Form.Label>
                    <Form.Control type="number" min={0} onChange={e => { setLowLevelQty(Number(e.target.value)) }} />
                </Form.Group>
                <br />
                <Form.Control type="submit" className="btn btn-primary" onClick={e => { e.preventDefault();createUnitInv(); }} value="Add Unit Inventory" />
            </Form>
        </div>
    )
}

export default CreateInventoryUnitPage;