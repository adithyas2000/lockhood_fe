import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, FormControl, Tab, Table, Tabs } from "react-bootstrap";
import { DepartmentsCode, orderReqStatus, ResponseStatus, UnitsCodes } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { orderRequestData } from "../../types/orderRequestData";

function ViewOrderreqs() {

    const options = RequestOptions;
    const backend = BackendAddress;
    const deptId = window.sessionStorage.getItem('deptId');

    const [notSentList, setNotSentList] = useState<Array<orderRequestData>>([]);
    const [sentList, setSentList] = useState<Array<orderRequestData>>([]);
    const [completedList, setCompletedList] = useState<Array<orderRequestData>>([]);
    const [receivedList, setReceivedList] = useState<Array<orderRequestData>>([]);
    const [processingList, setProcessingList] = useState<Array<orderRequestData>>([]);
    const [pdCompletedList, setPDCompletedList] = useState<Array<orderRequestData>>([]);

    const [sentElements, setSentElements] = useState<Array<JSX.Element>>([]);
    const [notSentElements, setNotSentElements] = useState<Array<JSX.Element>>([]);
    const [completedElements, setcompletedElements] = useState<Array<JSX.Element>>([]);
    const [receivedElements, setReceivedElements] = useState<Array<JSX.Element>>([]);
    const [pdCompletedElements, setPDCompletedElements] = useState<Array<JSX.Element>>([]);

    function getNotSentReqs() {
        if (deptId === UnitsCodes.WHU) {
            axios.get(backend + '/api/v1/order-req/warehouse-unit/false', options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        const reqArray: Array<orderRequestData> = res.data.data;
                        console.log("Not sent reqs");
                        console.table(reqArray);
                        setNotSentList(reqArray);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }
    };

    function getSentReqs() {
        if (deptId === UnitsCodes.WHU) {
            axios.get(backend + '/api/v1/order-req/warehouse-unit/true', options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {

                        const reqArray: Array<orderRequestData> = res.data.data;
                        console.log("Sent reqs");
                        console.table(reqArray);
                        setSentList(reqArray);
                    } else {
                        alert(res.data.status);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }
    }

    function getCompletedReqs() {
        if (deptId === UnitsCodes.WHU) {
            axios.get(backend + '/api/v1/order-req/warehouse/completed', options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        const reqArray: Array<orderRequestData> = res.data.data;
                        setCompletedList(reqArray);
                    } else {
                        alert(res.data.status);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }
    };

    function getReceivedReqs() {
        if (deptId === DepartmentsCode.PD) {
            axios.get(backend + '/api/v1/order-req/purchasing-dept/false', options)
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        const tempArray: Array<orderRequestData> = res.data.data;
                        setReceivedList(tempArray);
                    } else {
                        alert(res.data.status);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                });
        }
    };

    function getPDCompletedReqs() {
        if (deptId === DepartmentsCode.PD) {
            axios.get(backend + '/api/v1/order-req/purchasing-dept/true', options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        const tempArray: Array<orderRequestData> = res.data.sata;
                        setPDCompletedList(tempArray);
                    } else {
                        alert(res.data.status);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }
    };

    function sendReqToPurchase(reqId: string, qty: number) {
        console.log(reqId);
        const data = { 'requestedQty': qty };
        axios.patch(`${backend}/api/v1/order-req/process-whu/${reqId}`, data, options)
            .then(res => {
                console.log(res.data);
                refreshReqData();
            })
            .catch(err => {
                console.error(err);
            })
    };

    function refreshReqData() {
        console.log("Refresing data");
        getNotSentReqs();
        getSentReqs();
        getCompletedReqs();
        getReceivedReqs();
        getPDCompletedReqs();
    };


    function MakeRow(props: { req: orderRequestData }) {
        const req: orderRequestData = props.req;
        const [val, setval] = useState(0);
        return (
            <tr key={req._id}><td>{req.reqid}</td><td>{req.unitid}</td><td>{req.reqStatus}</td><td>{req.materialid}</td><td>{req.availableQty}</td><td><input type='number' min={0} id={req.reqid} key={req.reqid} onChange={e => { setval(Number(e.target.value)); }} /></td><td><Button disabled={(val == 0) || (val == null)} id={req.reqid} onClick={e => { e.preventDefault(); const t = e.target as Element; sendReqToPurchase(t.id, val); }} className="btn btn-success">Send to purchase</Button></td></tr>
        )
    }


    useEffect(() => {

        refreshReqData();
    }, []);

    useEffect(() => {
        if (sentList.length > 0) {
            var tempItems: Array<JSX.Element> = [];
            sentList.forEach(req => {
                tempItems.push(<tr key={req._id}><td>{req.reqid}</td><td>{req.unitid}</td><td>{req.reqStatus}</td><td>{req.materialid}</td><td>{req.availableQty}</td><td>{req.requestedDate?.split('T')[0]}</td><td>{req.requestedQty}</td></tr>);

            });
            setSentElements(tempItems);
        }
    }, [sentList]);

    useEffect(() => {
        if (notSentList.length > 0) {
            var tempItems: Array<JSX.Element> = [];
            notSentList.forEach(req => {
                tempItems.push(<MakeRow key={req.reqid} req={req} />);

            });
            setNotSentElements(tempItems);
        }
    }, [notSentList]);

    useEffect(() => {
        if (completedList.length > 0) {
            var tempItems: Array<JSX.Element> = [];
            completedList.forEach(req => {
                tempItems.push(<tr key={req._id}><td>{req.reqid}</td><td>{req.unitid}</td><td>{req.reqStatus}</td><td>{req.materialid}</td><td>{req.availableQty}</td><td>{req.requestedDate?.split('T')[0]}</td><td>{req.requestedQty}</td><td>{req.pricePerUnit}</td><td>{req.completedDate?.split('T')[0]}</td></tr>)
            });
            setcompletedElements(tempItems);
        }
    }, [completedList]);

    useEffect(() => {
        if (receivedList.length > 0) {
            console.log("Making recieved elements");
            var tempElements: Array<JSX.Element> = [];
            receivedList.forEach(req => {
                tempElements.push(<tr key={req._id}><td>{req.reqid}</td><td>{req.unitid}</td><td>{req.reqStatus}</td><td>{req.materialid}</td><td>{req.availableQty}</td><td>{req.requestedDate?.split('T')[0]}</td><td>{req.requestedQty}</td><td>{req.reqStatus !== orderReqStatus.PROCESSING && <Button id={req.reqid} onClick={e => { e.preventDefault(); const t = e.target as Element; processReq(t.id) }}>Send to process</Button>}{!req.isCompleted && req.pricePerUnit && req.pricePerUnit > 0 ? <Button id={req.reqid} className="btn btn-success" onClick={e => { e.preventDefault(); const t = e.target as Element; markCompleted(t.id) }}>Mark Completed</Button> : <Button id={req.reqid} className="btn btn-success" onClick={e => { e.preventDefault(); const t = e.target as Element; window.location.href = `/orderreqs/setppu/${req.reqid}` }}>Set Price per unit</Button>}</td></tr>)
            });
            setReceivedElements(tempElements);
        }
    }, [receivedList]);

    function processReq(id: string | null) {
        if (id) {
            axios.get(backend + `/api/v1/order-req/process-pd/${id}`, options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        refreshReqData();
                    }
                })
        }
    }

    function markCompleted(id:string|null){
        if(id){
            axios.get(backend+`/api/v1/order-req/complete/${id}`,options)
            .then(res=>{
                if(res.data.status===ResponseStatus.SUCCESS){
                    alert("Successfully marked as completed");
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

    // useEffect(()=>{
    //     if(pdCompletedList.length>0){

    //     }
    // },[pdCompletedList])

    return (
        <div className=" p-5 mb-5 rounded  whitebg">
            <Tabs
                defaultActiveKey={deptId === UnitsCodes.WHU ? "notSent" : "received"}
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                {deptId === UnitsCodes.WHU && <Tab eventKey="notSent" title="Not Sent To Purchase">
                    <NotSentTab />
                </Tab>}
                {deptId === UnitsCodes.WHU && <Tab eventKey="sent" title="Sent To Purchase">
                    <SentTab />
                </Tab>}
                {deptId === UnitsCodes.WHU && <Tab eventKey="completed" title="Completed Requests">
                    <CompletedTab />
                </Tab>}
                {deptId === DepartmentsCode.PD && <Tab eventKey="received" title="Received Requests">
                    <ReceivedTab />
                </Tab>}
                {deptId === DepartmentsCode.PD && <Tab eventKey="processing" title="Processing Requests">
                    <ProcessingTab />
                </Tab>}

                {deptId === DepartmentsCode.PD && <Tab eventKey="pdcompleted" title="Completed Requests">
                    <PDCompletedRequests />
                </Tab>}
            </Tabs>
        </div>
    )

    function NotSentTab() {

        return (
            <div className=" p-5 mb-5 rounded fourth-color first-color-text">
                {notSentElements.length > 0 ? <Table hover striped bordered className="whitebg">
                    <thead>
                        <tr>
                            <td>Request Id</td>
                            <td>Unit Id</td>
                            <td>Request Status</td>
                            <td>Material ID</td>
                            <td>Available Quantity</td>
                            <td>Requesting quantity</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {notSentElements}
                    </tbody>
                </Table> : <h6>No data available</h6>}
            </div>
        )
    }

    function SentTab() {
        return (
            <div className=" p-5 mb-5 rounded fourth-color first-color-text">

                {sentElements.length > 0 ? <Table hover striped bordered className="whitebg">
                    <thead>
                        <tr>
                            <td>Request Id</td>
                            <td>Unit Id</td>
                            <td>Request Status</td>
                            <td>Material ID</td>
                            <td>Available Quantity</td>
                            <td>Requested Date</td>
                            <td>Requested Quantity</td>
                        </tr>
                    </thead>
                    <tbody>
                        {sentElements}
                    </tbody>
                </Table> : <h6>No data available</h6>}
            </div>
        )
    }

    function CompletedTab() {
        return (
            <div className=" p-5 mb-5 rounded fourth-color first-color-text">
                {completedElements.length > 0 ? <Table hover striped bordered className="whitebg">
                    <thead>
                        <tr>
                            <td>Request Id</td>
                            <td>Unit Id</td>
                            <td>Request Status</td>
                            <td>Material ID</td>
                            <td>Available Quantity</td>
                            <td>Requested Date</td>
                            <td>Requested Quantity</td>
                            <td>Price per Unit</td>
                            <td>Completed Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {completedElements}
                    </tbody>
                </Table> : <h6>No data available</h6>}
            </div>
        )
    }

    function ReceivedTab() {
        return (
            <div className=" p-5 mb-5 rounded fourth-color first-color-text">
                {receivedElements.length > 0 ? <Table hover striped bordered className="whitebg">
                    <thead>
                        <tr>
                            <td>Request Id</td>
                            <td>Unit Id</td>
                            <td>Request Status</td>
                            <td>Material ID</td>
                            <td>Available Quantity</td>
                            <td>Requested Date</td>
                            <td>Requested Quantity</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {receivedElements}
                    </tbody>
                </Table> : <h6>No data available</h6>}
            </div>
        )
    }

    function ProcessingTab() {
        return (
            <div className=" p-5 mb-5 rounded fourth-color first-color-text">
                <h1>Processing</h1>
            </div>
        )
    }

    function PDCompletedRequests() {
        return (
            <div className=" p-5 mb-5 rounded fourth-color first-color-text">
                <h1>PDCompleted</h1>
            </div>
        )
    }
}



export default ViewOrderreqs;