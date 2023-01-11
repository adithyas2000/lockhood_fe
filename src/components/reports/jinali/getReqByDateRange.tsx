import axios from "axios";
import React, { LegacyRef, useRef } from "react";
import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { ResponseStatus } from "../../../enums/enums";
import { BackendAddress, RequestOptions } from "../../../functions/HTTPReqData";
import { reqReportData } from "../../../types/reqReportData";

function GetReqByDateRangeReport(){

    const componentRef = useRef<HTMLDivElement>(null);
    const backend=BackendAddress;
    const options=RequestOptions;

    const [fromDate,setFromDate]=useState("");
    const [toDate,setToDate]=useState("");

    const [reportData,setReportData]=useState<Array<reqReportData>>([]);

    const [reportRows,setReportRows]=useState<Array<JSX.Element>>([]);

    function generateReport(){
        if(fromDate && toDate){
            const data={
                'from':fromDate,
                'to':toDate
            }
            axios.post(backend+'/api/v1/order-req/report/completed-requests',data,options)
            .then(res=>{
                if(res.data.status===ResponseStatus.SUCCESS){
                    const tempData:Array<reqReportData>=res.data.list;
                    setReportData(tempData);
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

    useEffect(()=>{
        if(reportData.length>0){
            var tempArray:Array<JSX.Element>=[];
            reportData.forEach(row=>{
                tempArray.push(<tr><td>{row.reqid}</td><td>{row.unitid}</td><td>{row.reqStatus}</td><td>{row.materialid}</td><td>{row.availableQty}</td><td>{`${row.isCompleted}`}</td><td>{`${row.sentToPurchase}`}</td><td>{row.requestedDate.split('T')[0]}</td><td>{row.requestedQty}</td><td>{row.pricePerUnit}</td><td>{row.completedDate.split('T')[0]}</td></tr>)
            });
            setReportRows(tempArray);
        }
    },[reportData])

    const Report=React.forwardRef((props,ref)=>{
        return(
            <div ref={ref as LegacyRef<HTMLDivElement> | null}>
            <Table striped hover className="whitebg">
                <thead>
                    <tr>
                        <td>Request Id</td>
                        <td>Unit Id</td>
                        <td>Request status</td>
                        <td>Material Id</td>
                        <td>Available Quantity</td>
                        <td>Is Completed</td>
                        <td>Sent to purchase</td>
                        <td>Requested Date</td>
                        <td>RequestedQuantity</td>
                        <td>Price per Unit</td>
                        <td>Completed Date</td>
                    </tr>
                </thead>
                <tbody>
                    {reportRows}
                </tbody>
            </Table>
            </div>
        )
    })

    return(
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">
            <Form>
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control type="date" onChange={e=>{setFromDate(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Form.Control type="date" onChange={e=>{setToDate(e.target.value)}}/>
                </Form.Group>

                <Form.Group>
                    
                    <Form.Control className="btn btn-primary" type="submit" value="Generate Report" onClick={e=>{e.preventDefault();generateReport()}}/>
                </Form.Group>
            </Form><br/><br/>
            <Report ref={componentRef}/>
            <ReactToPrint documentTitle="Order Request Report" trigger={() => <button className="btn btn-primary">Print report</button>} content={() => componentRef.current} />
        </div>
    )
}

export default GetReqByDateRangeReport;