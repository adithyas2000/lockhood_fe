import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";

function SetPPUPage() {

    const backend = BackendAddress;
    const options = RequestOptions;

    const [ppu, setPPU] = useState(0);

    const { reqId } = useParams();

    function setPricePerUnit() {
        if (ppu && ppu !== 0) {
            const data={
                'pricePerUnit':ppu
            }
            axios.patch(backend + `/api/v1/order-req/update/${reqId}`,data, options)
            .then(res=>{
                if(res.data.status===ResponseStatus.SUCCESS){
                    alert("Successfully set Price per unit");
                    window.location.href='/orderreqs/view'
                }else{
                    alert(res.data.status);
                }
            })
            .catch(err=>{
                console.error(err);
                alert(err.response.data.message);
            })
        }

    }
    return (
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <h1>Set Price Per Unit for order request {reqId}</h1>
            <Form className="whitebg p-3 fourth-color-text">
                <Form.Group className="m-3">
                    <Form.Label>Price per unit</Form.Label>
                    <Form.Control type="number" min={0} onChange={e => { setPPU(Number(e.target.value)) }} />
                </Form.Group>
                <Form.Group className="m-3">
                    <Form.Control onClick={e=>{e.preventDefault();setPricePerUnit();}} className="btn btn-primary" type="submit" value="Set Price Per Unit" />
                </Form.Group>

            </Form>
        </div>
    )
}

export default SetPPUPage;