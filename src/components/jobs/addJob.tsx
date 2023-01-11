import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { unitData } from "../../types/unitData";

function AddJob() {
    const backend = BackendAddress;

    const [unit, setUnit] = useState("adasdasdas");
    const [unitId, setUnitId] = useState("");
    const [unitName, setUnitName] = useState("");
    const [exStartDate, setExStartDate] = useState("");
    const [allocatedHours, setAllocatedHours] = useState(0);
    const [description, setDescription] = useState("");

    const [unitList, setUnitList] = useState<Array<unitData>>([]);
    const [unitDropdownList, setUnitDropdown] = useState<Array<JSX.Element>>([]);

    const options = RequestOptions;

    var { uId } = useParams();

    function getUnitList() {
        axios.get(backend + '/api/v1/units', options)
            .then(res => {
                console.log(res.data);
                var unitArray: Array<unitData> = res.data.data;
                setUnitList(unitArray);
            })
            .catch(err => {
                console.error(err);
            });
    };

    function submitForm(e: any) {
        e.preventDefault();
        var newJob = {
            'unitid': unitId,
            'expectedStartDate':exStartDate,
            'allocatedHours':allocatedHours,
            'description':description
        };
       
        axios.post(backend + '/api/v1/job', newJob, options)
            .then(res => {
                if (res.data.status === 'Success') {
                    alert("Successfully added new job");
                    // window.location.reload();
                }
            })
            .catch(err => {
                alert("Error creating new job");
            })
    }

    useEffect(() => {
        if (unitList.length > 0) {
            console.log("Setting dropdown list" + unitList.length);
            var unitElemets: Array<JSX.Element> = [];
            unitList.forEach(unit => {
                unitElemets.push(<Dropdown.Item href={`${unit._id}`} eventKey={unit.unitid} key={unit._id}>{unit.unitName}</Dropdown.Item>);
            });
            setUnitDropdown(unitElemets);
        }

        if (unit) {
            console.log(`UnitListsize: ${unitList.length}`);
            unitList.forEach(u => {
                const unitStr: string = unit;
                const uID: string = u._id;
                if (unitStr === uID) {
                    console.log(`${unitStr} - ${uID}`);
                    setUnitName(u.unitName);
                    setUnitId(u.unitid);
                    return;
                } else {
                    console.log(`No match : ${unitStr} - ${uID}`);
                }
            });


        } else {
            console.log(`Unit: ${unit.length}`);
        }

    }, [unitList, unit]);

    // useEffect(() => {
    //     getUnitList();
    //     if (unit) {
    //         console.log(`UnitListsize: ${unitList.length}`);
    //         unitList.forEach(u => {
    //             const unitStr: string = unit;
    //             const uID: string = u._id;
    //             if (unitStr === uID) {
    //                 console.log(`${unitStr} - ${uID}`);
    //                 setUnitName(u.unitName);
    //                 setUnitId(u.unitid);
    //                 return;
    //             } else {
    //                 console.log(`No match : ${unitStr} - ${uID}`);
    //             }
    //         });


    //     } else {
    //         console.log(`Unit: ${unit.length}`);
    //     }

    // }, [unit]);


    useEffect(() => {
        // debugger;

        if (uId) {
            let tempId: string = uId;

            // setUnit(tempId);
            // debugger;
            console.log(`Params: ${uId}`);

            getUnitList();

        }

    }, []);

    useEffect(() => {
        if (typeof (uId) === 'string' && uId.length > 0) {
            console.log("UID:" + uId)
            setUnit(uId);
        }

    }, [uId]);

    function makeTimestamp(dateStr: string): string {
        console.log("datestr:" + dateStr);
        var year = Number(dateStr.split('-')[0]),
            month = Number(dateStr.split('-')[1]),
            date = Number(dateStr.split('-')[2]);

        console.log(`${year} - ${month} - ${date}`);

        const timestamp = new Date(year, month - 1, date).toISOString();
        console.log(`Timestamp: ${timestamp}`);
        return timestamp;
    };

    function setTime(datestr: string) {
        if (datestr) {
            console.log("date string:" + datestr);
            const timestamp = makeTimestamp(datestr);
            setExStartDate(timestamp);
        }

    };



    return (
        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Form className="whitebg p-3">
                <Form.Group className="mb3">
                    <Form.Label>Unit ID</Form.Label>

                    <Dropdown className="my-3">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {unitName ? unitName : unitName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {unitDropdownList}
                        </Dropdown.Menu>
                    </Dropdown>

                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Expected Start Date</Form.Label>
                    <Form.Control type="date" onChange={e => { setExStartDate(e.target.value); setTime(e.target.value); }} />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Allocated Hours</Form.Label>
                    <Form.Control type="number" min={0} onChange={e => setAllocatedHours(Number(e.target.value))} />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={e => setDescription(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Control onClick={e => submitForm(e)} type="submit" className="btn btn-primary" value="Create Job" />
            </Form>

        </div>
    );
}

export default AddJob;