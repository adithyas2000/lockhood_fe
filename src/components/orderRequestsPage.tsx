import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { orderRequestData } from "../types/orderRequestData";
import { salesReport } from "../types/salesReportData";
import { isLogindata, isOrderReqData, isSalesReportData } from "../validations/typeChecks";

const OrderRequestsPage = () => {
    const [reqData, setReqData] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        getSalesData();
    }, []);

    const getSalesData = async () => {
        console.log("Getting sales data");
        await axios.get(`https://80e4c611-9686-4f69-85ad-d4e548dc5d91.mock.pstmn.io/getOrderRequests`)
            .then(res => {

                // debugger;
                console.log(res.data);
                if (typeof (res.data) === 'object') {
                    var dataArray: Array<JSX.Element> = [];
                    res.data.forEach((record: any) => {

                        if (isOrderReqData(record)) {
                            const recObj: orderRequestData = record;
                            var tempArray:Array<JSX.Element>=[];
                            Object.values(recObj).forEach(val=>{
                                tempArray.push(<td>{`${val}`}</td>);
                            });
                            dataArray.push(<tr>{tempArray}</tr>);
                        } else {
                            console.table(record);
                        }
                    });
                    setReqData(dataArray);
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
            <h4>Order Requests</h4>
            <Table striped bordered hover className="whitebg">
                <thead>
                    <tr>
                        <td>Request ID</td>
                        <td>Request Status</td>
                        <td>Material Name</td>
                        <td>Available Quantity</td>
                        <td>Requested Date</td>
                        <td>Sent to Purchase</td>
                        <td>Requested Quantity</td>
                        <td>Price per Unit</td>
                        <td>Completed Date</td>
                    </tr>

                </thead>
                <tbody>
                    {reqData}
                </tbody>
            </Table>
        </div>

    );
}

export default OrderRequestsPage;