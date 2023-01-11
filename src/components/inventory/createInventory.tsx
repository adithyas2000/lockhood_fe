import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";

function CreateInventoryPage() {

    const backend = BackendAddress;
    const [matName, setMatName] = useState("");

    const options = RequestOptions;

    function addInventory() {
        if (matName) {
            const newMat = {
                "materialName": matName
            }
            axios.post(backend + '/api/v1/inventory/', newMat, options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        alert("Successfully added to inventory");
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

        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <h1>Create Inventory</h1>
            <Form className="whitebg p-3 fourth-color-text">
                <Form.Group className="mb3">
                    <Form.Label>Material Name</Form.Label>
                    <Form.Control onChange={e => { setMatName(e.target.value) }} />
                </Form.Group>
                <br />
                <Form.Control type="submit" className="btn btn-primary" onClick={e => { e.preventDefault(); addInventory(); }} value="Create" />
            </Form>
        </div>
    )
}

export default CreateInventoryPage;