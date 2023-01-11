import axios from "axios";
import React, { LegacyRef } from "react";
import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { ResponseStatus } from "../../../enums/enums";
import { BackendAddress, RequestOptions } from "../../../functions/HTTPReqData";
import { invUnitData } from "../../../types/inventoryUnitData";

function UnitInventoriesReport() {
    const componentRef = useRef<HTMLDivElement>(null);

    const backend = BackendAddress;
    const options = RequestOptions;

    const [reportData, setReportData] = useState<Array<invUnitData>>([]);
    const [reportRows, setReportRows] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(backend + '/api/v1/inventory-unit/report/inventory-unit', options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    const tempData: Array<invUnitData> = res.data.data;
                    setReportData(tempData);
                } else {
                    alert(res.data.response);
                }
            })
            .catch(err => {
                console.error(err);
                alert(err.response.data.message);
            });
    }

    useEffect(() => {
        if (reportData.length > 0) {
            var tempArray: Array<JSX.Element> = [];
            reportData.forEach(row => {
                tempArray.push(<tr key={reportData.indexOf(row).toString()}><td>{row.materialid}</td><td>{row.inventory.materialName}</td><td>{row.unitid}</td><td>{row.availableQty}</td><td>{row.lowLevelQty}</td></tr>)
            });
            setReportRows(tempArray);
        }
    }, [reportData]);

    const Report = React.forwardRef((props, ref) => {
        return (
            <div ref={ref as LegacyRef<HTMLDivElement> | null}>
                <h1>Inventory report per unit</h1>
                <Table striped hover className="whitebg">
                    <thead>
                        <tr>
                            <td>Material Id</td>
                            <td>Material Name</td>
                            <td>Unit ID</td>
                            <td>Available Quantity</td>
                            <td>Low Level Quantity</td>
                        </tr>
                    </thead>
                    <tbody>
                        {reportRows}
                    </tbody>
                </Table>
            </div>
        )
    })

    return (
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <Report ref={componentRef} />
            <ReactToPrint documentTitle="Inventory per Unit Report" trigger={() => <button className="btn btn-primary">Print report</button>} content={() => componentRef.current} />

        </div>
    )
}

export default UnitInventoriesReport;