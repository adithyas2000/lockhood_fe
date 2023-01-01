import axios from "axios";
import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import { Dropdown, FormGroup, FormLabel, Table } from "react-bootstrap";
import { kanbanData } from "../types/kanbanData";
import { isKanbanData } from "../validations/typeChecks";
import KanbanCard from "./kanbanCard";
import { JobStatus } from "../enums/enums";

function KanbanBoard() {
    
    const columns = [JobStatus.BACKLOG, JobStatus.INPROGRESS, JobStatus.TESTING, JobStatus.DONE];

    const [kanbanData, setKanbanData] = useState<Array<Array<kanbanData>>>([]);
    const backend = process.env.REACT_APP_BACKEND_DOMAIN;
    const [unit, setUnit] = useState("");
    const [unitName, setUnitName] = useState("");
    const [unitList, setUnitList] = useState<Array<unitData>>([]);
    const [unitDropdownList, setDropdownList] = useState<Array<JSX.Element>>([]);

    const options = {
        headers: {
            Authorization: `bearer ${window.sessionStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        // Get kanban data from backend
        if (typeof (backend) != 'undefined') {
            // getKanbanData();
            getUnits();
        } else {
            console.log("Backend not defined.");
        }

    }, []);

    useEffect(() => {
        if (unitList.length > 0) {
            setUnitDropdown();
        }

    }, [unitList]);

    useEffect(() => {
        if (unit) {
            unitList.forEach(u => {
                const unitStr: string = unit;
                const uID: string = u._id;
                if (unitStr === uID) {
                    console.log(`${unitStr} - ${uID}`);
                    setUnitName(u.unitName);
                    return;
                } else {
                    console.log(`No match : ${unitStr} - ${uID}`);
                }
            });

            console.log("Get kanban data");
            getKanbanData();
        } else {
            console.log(`Unit: ${unit}`);
        }

    }, [unit]);

    function setUnitDropdown() {
        console.log("Setting dropdown list" + unitList.length);
        var unitElemets: Array<JSX.Element> = [];
        unitList.forEach(unit => {
            unitElemets.push(<Dropdown.Item eventKey={unit._id} key={unit._id}>{unit.unitName}</Dropdown.Item>);
        });
        setDropdownList(unitElemets);
    };

    type unitData = {
        _id: string,
        unitid: string,
        unitName: string
    };

    function onUnitSelect(id: string | null) {
        console.log(id);
        if (id) {
            setUnit(id);
        }

    };







    return (
        <div className="centerContainer p-5 mb-5 rounded fourth-color first-color-text">

            <FormGroup className="leftContainer">
                <FormLabel>Select Unit:</FormLabel>

                <Dropdown className="m-3" onSelect={id => { onUnitSelect(id) }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {unitName ? unitName : "Select Unit"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {unitDropdownList}
                    </Dropdown.Menu>
                </Dropdown>

            </FormGroup>

            <Table striped bordered hover className="whitebg">
                <thead>
                    <tr>
                        <th>Backlog</th>
                        <th>In Progress</th>
                        <th>In Testing</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="kanbanCol d-flex align-items-center">
                            <MakeKanbanCard colNo={1} />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={2} />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={3} />
                        </td>
                        <td className="kanbanCol">
                            <MakeKanbanCard colNo={4} />
                        </td>
                    </tr>

                </tbody>
            </Table>
            { }
        </div>
    );
    type properties = {
        colNo: number
    };

    function MakeKanbanCard(props: properties) {
        var cardArray: Array<React.ReactElement> = [];

        const kanbanCol = kanbanData[props.colNo - 1];
        console.log(`Column ${props.colNo}`);
        if (kanbanCol == undefined) {
            return null;
        }
        kanbanCol.forEach(card => {
            cardArray.push(<table style={{ width: "33%", verticalAlign: "top" }} key={card.jobid}><tbody><tr><td><KanbanCard id={card.jobid} action={kanbanSendToNext} title={`${card.status} - ${card.empid}`} header={card.status} content={card.description} type={props.colNo} /></td></tr></tbody></table>);
        });
        // for (let n = 1; n < 10; n++) {
        //     cardArray.push(<tr><td key={n}><KanbanCard title={"Title: " + n} header={"Header : " + n} content={"Content: " + n} type={props.colNo} /></td></tr>);
        // }
        return <>{cardArray}</>;
    }

    function kanbanSendToNext(id: number, type: number) {
        console.log("Pressed button:" + id + " with type " + type);
        const changeData = {
            'jobid': id,
            'status': columns[type]
        };
        axios.post(backend + "/api/v1/job/update", changeData,options)
            .then(() => {
                console.log("Success");
                getKanbanData();
            })
    }

    function getKanbanData() {
        if (typeof (backend) != 'undefined') {
            console.log("Sending req to get kanban data");
            
            axios.get(backend + '/api/v1/job/LBU', options)
                .then(res => {
                    console.log(res.data);
                    const resArray: Array<any> = res.data.data;

                    console.log("Res array: ");
                    console.table(resArray);
                    //Seperate into columns
                    const tempKanbanData: Array<kanbanData> = res.data.data;
                    var tempKanbanCol: Array<Array<kanbanData>> = [];
                    columns.forEach(col => {
                        var tempData: Array<kanbanData> = [];
                        tempKanbanData.forEach(item => {
                            if (col === item.status) {
                                console.log(`Pushing ${item.status} to ${col}`);
                                tempData.push(item);
                            }
                           
                        });
                        if (tempData.length > 0) {
                            console.log("Pushing to tempCol: " + tempData.length);
                            console.table(tempData);
                            tempKanbanCol.push(tempData);
                        }

                        tempData = [];

                    });

                    if (isKanbanData(tempKanbanCol)) {
                        console.log("Kanban state:");
                        console.log(tempKanbanCol);
                        setKanbanData(tempKanbanCol);
                    } else {
                        console.error("Invalid kanban data");
                    }
                })
                .catch(err => console.error(err));
        }
    };

    function getUnits() {
        axios.get(backend + '/api/v1/units', options)
            .then(res => {
                console.log(res.data);
                var unitArray: Array<unitData> = res.data.data;
                setUnitList(unitArray);
                // setUnitDropdown();
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export default KanbanBoard;