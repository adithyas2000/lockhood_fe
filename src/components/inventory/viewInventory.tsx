import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DepartmentsCode, ResponseStatus, UnitsCodes } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { invUnitData } from "../../types/inventoryUnitData";
import { materialData } from "../../types/materialData";

function ViewInventory() {

    const [matList, setMatList] = useState<Array<invUnitData>>([]);
    const [rowList, setRowList] = useState<Array<JSX.Element>>([]);

    const backend = BackendAddress;
    const options = RequestOptions;
    const deptId = window.sessionStorage.getItem('deptId');

    useEffect(() => {
        getInventory();
    }, []);

    useEffect(() => {
        if (matList.length > 0) {
            makeRows();
        }
    }, [matList]);

    function makeRows() {
        var tempRowArray: Array<JSX.Element> = [];
        matList.forEach(mat => {
            tempRowArray.push(<tr key={mat._id}><td><a href={`/inventory/update/${mat.materialid}`}>{mat.materialid}</a></td><td>{mat.inventory.materialName}</td>{deptId===DepartmentsCode.ED&&<td>{mat.unitid}</td>}<td>{mat.availableQty}</td><td>{mat.lowLevelQty}</td></tr>);
        });
        setRowList(tempRowArray);
    }


    function getInventory() {
        var address='';
        if(deptId===UnitsCodes.WHU){
            address=`/api/v1/inventory-unit/`;
        }else{
            address=`/api/v1/inventory-unit/${deptId}/`
        }
        axios.get(backend + address, options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    if (typeof (res.data.data) === 'object') {
                        const invList: Array<invUnitData> = res.data.data;
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
                        {deptId === DepartmentsCode.ED && <th>Unit ID</th>}
                        <th>Available Quantity</th>
                        <th>Low Level Quantity</th>
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