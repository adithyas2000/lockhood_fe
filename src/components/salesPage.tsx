import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { salesReport } from "../types/salesReportData";
import { isLogindata, isSalesReportData } from "../validations/typeChecks";

const SalesPage = () => {
    const [salesData, setSalesData] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        getSalesData();
    }, []);

    const getSalesData = async () => {
        console.log("Getting sales data");
        await axios.get(`https://80e4c611-9686-4f69-85ad-d4e548dc5d91.mock.pstmn.io/getSales`)
            .then(res => {

                // debugger;
                console.log(res.data);
                if (typeof (res.data) === 'object') {
                    var dataArray: Array<JSX.Element> = [];
                    res.data.forEach((record: any) => {

                        if (isSalesReportData(record)) {
                            const recObj: salesReport = record;
                            dataArray.push(<tr><td>{recObj.sale_id}</td><td>{recObj.product_name}</td><td>{recObj.total_sold_qty}</td><td>{recObj.price_per_unit}</td><td>{recObj.date}</td></tr>);
                        } else {
                            console.table(record);
                        }
                    });
                    setSalesData(dataArray);
                }
                var as: any = {};
                if (isLogindata(as)) {
                    console.log(as)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="centerContainer p-5 mb-5 rounded fourth-color first-color-text">
            <h4>Sales Report</h4>
            <Table striped bordered hover className="whitebg">
                <thead>
                    <tr>
                        <td>Sale ID</td>
                        <td>Product Name</td>
                        <td>Total Sold Quantity</td>
                        <td>Price per unit</td>
                        <td>Date</td>
                    </tr>

                </thead>
                <tbody>
                    {salesData}
                </tbody>
            </Table>
        </div>

    );
}

export default SalesPage;