import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";

function EditProductPage() {

    const backend = BackendAddress;
    const options = RequestOptions;

    const { pid } = useParams();

    const [prodName, setProdName] = useState("");
    const [prodDescription, setProdDescription] = useState("");

    console.log(pid);

    function editProd() {
        const data = {
            'productName': prodName,
            'productDescription': prodDescription
        }
        axios.patch(backend + `/api/v1/product/${pid}`, data, options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    alert('Successfully updated product details');
                    window.location.reload();
                } else {
                    alert(`Error: ${res.data.status}`);
                }
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }
    return (

        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Form className="whitebg p-3">
                <Form.Group className="mb3">
                    <Form.Label>Product Id</Form.Label>
                    <Form.Control type="text" value={pid} disabled />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" onChange={e => { setProdName(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" onChange={e => { setProdDescription(e.target.value) }} />
                </Form.Group>




                <br />
                <Form.Control type="submit" className="btn btn-primary" value="Update Product" onClick={e => { e.preventDefault(); editProd(); }} />
            </Form>
        </div>
    );
}
export default EditProductPage;