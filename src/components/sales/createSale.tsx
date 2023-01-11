import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { productData } from "../../types/productData";

function CreateSalePage() {
    const backend = BackendAddress;
    const options = RequestOptions;

    const [prodList, setProdList] = useState<Array<productData>>([]);
    const [prodDropdown, setProdDropdown] = useState<Array<JSX.Element>>([]);

    const [prodId, setProdId] = useState("");
    const [prodName, setProdName] = useState("");
    const [soldQty, setSoldQty] = useState(0);
    const [ppu, setppu] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        getAllProds();
    }, []);

    function getAllProds() {
        axios.get(backend + '/api/v1/product', options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    const tempData: Array<productData> = res.data.data;
                    setProdList(tempData);
                }
            })
    };

    function createSale() {
        if (prodId.trim().length > 0 && soldQty && ppu && startDate.trim().length > 0 && endDate.trim().length > 0) {
            const data = {
                'productid': prodId,
                'totalSoldQty': soldQty,
                'pricePerUnit': ppu,
                'periodStartDate': startDate,
                'periodEndDate': endDate
            };

            console.table(data);
            axios.post(backend + '/api/v1/sale', data, options)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        alert(res.data.status);
                    } else {
                        alert(`Error: ${res.data.status}`);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }else{
            alert("All fields required");
        }

    }

    useEffect(() => {
        if (prodList.length > 0) {
            console.table(prodList);
            var tempArray: Array<JSX.Element> = [];
            prodList.forEach(prod => {
                tempArray.push(<Dropdown.Item id={prod.productid} key={prod.productid} eventKey={prod.productid}>{prod.productName}</Dropdown.Item>)
            });
            setProdDropdown(tempArray);
        }
    }, [prodList]);

    function onSelectProd(pId: string | null) {
        console.log(`Prod ID: ${pId}`);
        if (pId) {
            setProdId(pId);
        }
    };

    useEffect(() => {
        if (prodId && prodList.length > 0) {
            prodList.forEach(prod => {
                const idFromList: string = prod.productid;
                const idFromDropdown: string = prodId;
                if (idFromDropdown === idFromList) {
                    setProdName(prod.productName);
                }
            })
        }
    }, [prodId])
    return (
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <h1>Create Sale</h1>
            <Form className="whitebg fourth-color-text p-3">
                <Form.Group className="m-3">
                    <Form.Label>Product Id</Form.Label>
                    <Dropdown onSelect={id => onSelectProd(id)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {prodName.trim().length > 0 ? prodName : "Select Product"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {prodDropdown}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                <Form.Group className="m-3">
                    <Form.Label>Total Sold Quantity</Form.Label>
                    <Form.Control required type="number" min={0} onChange={e => { setSoldQty(Number(e.target.value)) }} />
                </Form.Group>

                <Form.Group className="m-3">
                    <Form.Label>Price per unit</Form.Label>
                    <Form.Control required type="number" min={0} onChange={e => { setppu(Number(e.target.value)) }} />
                </Form.Group>

                <Form.Group className="m-3">
                    <Form.Label>Period start date</Form.Label>
                    <Form.Control required type="date" onChange={e => { setStartDate(e.target.value) }} />
                </Form.Group>

                <Form.Group className="m-3">
                    <Form.Label>Period end date</Form.Label>
                    <Form.Control required type="date" onChange={e => { setEndDate(e.target.value) }} />
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Control required onClick={e => { e.preventDefault(); createSale(); }} type="submit" className="btn btn-primary" value="Create Sale" />
                </Form.Group>

            </Form>
        </div>
    )
}

export default CreateSalePage;