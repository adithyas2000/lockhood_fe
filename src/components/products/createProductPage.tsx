import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";

function CreateProductPage() {

    const backend=BackendAddress;
    const options=RequestOptions;

    const [prodName,setProdName]=useState("");
    const [prodDescription,setProdDescription]=useState("");

    function createProd(){
        const data={
            'productName':prodName,
            'productDescription':prodDescription
        }
        axios.post(backend+'/api/v1/product/',data,options)
        .then(res=>{
            if(res.data.status===ResponseStatus.SUCCESS){
                alert('Successfully added product');
                window.location.reload();
            }else{
                alert(`Error: ${res.data.status}`);
            }
        })
        .catch(err=>{
            alert(err.response.data.message);
        })
    }
    return (

        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Form className="whitebg p-3">
               
                <Form.Group className="mb3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" onChange={e => { setProdName(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" onChange={e => { setProdDescription(e.target.value) }} />
                </Form.Group>

               


                <br />
                <Form.Control type="submit" className="btn btn-primary" value="Add employee" onClick={e => { e.preventDefault(); createProd(); }} />
            </Form>
        </div>
    );
}
export default CreateProductPage;