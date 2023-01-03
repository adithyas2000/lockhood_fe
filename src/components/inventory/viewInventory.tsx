import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { materialData } from "../../types/materialData";

function ViewInventory() {

    const [matList, setMatList] = useState<Array<materialData>>([]);
    const [rowList,setRowList]=useState<Array<JSX.Element>>([]);

    const backend = process.env.REACT_APP_BACKEND_DOMAIN;
    const options = {
        headers: {
            Authorization: `bearer ${window.sessionStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        getInventory();
    },[]);

    useEffect(()=>{
        if(matList.length>0){
            makeRows();
        }
    },[matList]);

    function makeRows(){
        var tempRowArray:Array<JSX.Element>=[];
        matList.forEach(mat=>{
            tempRowArray.push(<tr key={mat._id}><td><a href={`/inventory/update/${mat.materialid}`}>{mat.materialid}</a></td><td>{mat.materialName}</td></tr>);
        });
        setRowList(tempRowArray);
    }


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

    return (
        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Table striped bordered hover className="whitebg">
                <thead>
                    <tr>
                        <th>Material ID</th>
                        <th>Material Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rowList}
                </tbody>
            </Table>
        </div>
    );
}

export default ViewInventory;