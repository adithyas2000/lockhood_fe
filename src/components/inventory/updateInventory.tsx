import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ResponseStatus } from "../../enums/enums";
import { materialData } from "../../types/materialData";

function UpdateInventoryPage() {

    const backend = process.env.REACT_APP_BACKEND_DOMAIN;
    const [currMatName,setCurrMatName]=useState("");
    const [matName, setMatName] = useState("");
    const [matList, setMatList] = useState<Array<materialData>>([]);

    const {mId}=useParams();

    const options = {
        headers: {
            Authorization: `bearer ${window.sessionStorage.getItem('token')}`
        }
    };


    useEffect(() => {
        getInventory();
        console.log(`MID: ${mId}`);
    }, []);

    useEffect(() => {
        console.log(matList.length);
        if(matList.length>0 && mId){
            matList.forEach(mat=>{
                if(mat.materialid===mId){
                    setCurrMatName(mat.materialName);
                    setMatName(mat.materialName);
                }
            })
        }
    }, [matList]);

    function getInventory() {
        axios.get(backend + '/api/v1/inventory/', options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    if (typeof (res.data.data) === 'object') {
                        const invList: Array<materialData> = res.data.data;
                        setMatList(invList);
                    }
                } else {
                    alert(`Error: ${res.data.status}`);
                }

            })
            .catch(err => {
                console.error(err);
                alert(`Error: ${err.response.data.message}`);
            })
    };

    function updateInventory() {
        if (matName) {
            const newMat = {
                "materialName": matName
            }
            axios.patch(backend + `/api/v1/inventory/${mId}`, newMat, options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        alert("Successfully updated");
                        window.location.reload();
                    } else {
                        alert(`Error : ${res.data.status}`);
                    }
                })
                .catch(err => {
                    if (err.response.code === 403) {
                        alert("Unauthorized");
                    } else {
                        alert(`Error: ${err.response.code}`);
                    }
                })
        }

    }


    return (
        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Form className="whitebg p-3">
                <Form.Group className="mb3">
                    <Form.Label>Current Material Name</Form.Label>
                    <Form.Control disabled value={currMatName}/>
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>New Material Name</Form.Label>
                    <Form.Control onChange={e => { setMatName(e.target.value) }} placeholder={currMatName}/>
                </Form.Group>
                <br />
                <Form.Control type="submit" className="btn btn-primary" onClick={e => { e.preventDefault(); updateInventory(); }} value="Update" disabled={(matName===currMatName)||(!(matName.trim().length>0))}/>
            </Form>
        </div>
    )
}

export default UpdateInventoryPage;