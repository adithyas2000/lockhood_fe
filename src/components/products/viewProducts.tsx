import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { productData } from "../../types/productData";

function ViewProducts() {
    const backend = BackendAddress;
    const options = RequestOptions;
    const [prodList, setProdList] = useState<Array<productData>>([]);
    const [prodElements, setProdELements] = useState<Array<JSX.Element>>([]);

    useEffect(()=>{
        getAllProds();
    },[]);

    function getAllProds() {
        axios.get(backend + '/api/v1/product', options)
            .then(res => {

                if (res.data.status === ResponseStatus.SUCCESS) {
                    console.table(res.data.data);
                    const tempData: Array<productData> = res.data.data;
                    setProdList(tempData);
                } else {
                    alert(res.data.status);
                }
            })
            .catch(err => {
                alert(err.response.data.message);
            });
    };

    useEffect(() => {
        if (prodList.length > 0) {
            var tempArray: Array<JSX.Element> = [];
            prodList.forEach(prod => {
                tempArray.push(<tr key={prod.productid}><td><a href={`/products/edit/${prod.productid}`}>{prod.productid}</a></td><td>{prod.productName}</td><td>{prod.productDescription}</td></tr>)
            });

            setProdELements(tempArray);
        }
    }, [prodList])

    return (
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <Table className="whitebg">
                <thead>
                    <tr>
                        <td>Product Id</td>
                        <td>Product Name</td>
                        <td>Product Description</td>
                    </tr>
                </thead>
                <tbody>
                    {prodElements}
                </tbody>

            </Table>
        </div>
    );
}

export default ViewProducts;