import axios from "axios";
import React, { LegacyRef, useRef } from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ErrorMessages, ResponseStatus, ViewUsersBy } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { chartData } from "../../types/chartData";
import { employeeData } from "../../types/employeeData";
import { MakePieChart } from "../util/makeChart";


function ViewAllEmployeesPage() {
    const componentRef = useRef<HTMLDivElement>(null);

    const backend = BackendAddress;
    const options = RequestOptions;

    const [userList, setUserList] = useState<Array<employeeData>>([]);
    const [viewMode, setViewMode] = useState(ViewUsersBy.ALL);
    const [userRows, setUserRows] = useState<Array<JSX.Element>>([]);
    const [foundUnits, setFoundUnits] = useState<Array<string>>([]);

    const [pieData, setPieData] = useState<Array<chartData>>([]);
    const [colors, setColors] = useState<Array<string>>([]);



    useEffect(() => {
        getEmployees();




    }, []);

    useEffect(() => {
        if (userList.length > 0) {
            var tempUnitArray: Array<string> = [];
            userList.forEach(user => {
                const uid: string = user.unitid;
                if (tempUnitArray.length > 0) {
                    var existing: boolean = false;
                    tempUnitArray.forEach(found => {
                        if (found === uid) {
                            console.log(`Existing: ${uid}`);
                            existing = true;
                        } else {
                            console.log(`Not Existing: ${uid}`);
                        }
                    });
                    if (!existing) {
                        tempUnitArray.push(user.unitid);
                    }
                } else {
                    console.log(`Pushing ${user.unitid} without checking`);
                    tempUnitArray.push(user.unitid);
                }
            });
            setFoundUnits(tempUnitArray);
            console.log("Temp found units:");
            console.table(tempUnitArray);

            makeUserRows();


        }


    }, [userList]);

    useEffect(() => {
        console.log("Found units:");
        console.table(foundUnits);
        var tempColors: Array<string> = [];
        if (foundUnits.length > 0) {
            const total: number = foundUnits.length;
            var chartData: Array<chartData> = [];
            foundUnits.forEach(unit => {
                var count = countUsers(unit);
                var unitData: chartData = {
                    name: unit,
                    value: count
                };
                chartData.push(unitData);
                const randomColor = Math.floor(Math.random() * 16777215).toString(16) + "#";
                console.log(randomColor);
                tempColors.push(randomColor);
            });
            console.log("Tempchart data:");
            console.table(chartData);
            setPieData(chartData);

            console.log("Colors:");
            console.table(tempColors);
            setColors(tempColors);

        }
    }, [foundUnits]);

    useEffect(() => {
        console.log("Chart data");
        console.table(pieData);
    }, [pieData]);

    function countUsers(unit: string): number {
        var count: number = 0;
        if (userList.length > 0) {
            userList.forEach(user => {
                if (user.unitid === unit) {
                    count++;
                }
            })
        }
        return count;
    }

    function makeUserRows() {
        var tempRows: Array<JSX.Element> = [];

        if (userList.length > 0) {
            userList.forEach(emp => {
                tempRows.push(<tr key={emp._id}><td>{emp.empid}</td><td>{emp.unitid}</td><td>{emp.designation}</td><td>{emp.firstName}</td><td>{emp.lastName}</td><td>{emp.email}</td><td>{emp.contactNumber}</td></tr>)
            });

            setUserRows(tempRows);

        }

    }

    function getEmployees() {
        axios.get(backend + '/api/v1/employee', options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    setUserList(res.data.data);
                    setViewMode(ViewUsersBy.ALL);
                } else {
                    alert(`Error: ${res.data.status}`);
                }
            })
            .catch(err => {
                if (err.response.data.message === ErrorMessages.UNAUTHORIZED_USER) {
                    getEmployeeByUnit();
                } else {
                    alert(`Error : ${err.response.data.message}`);
                }
            })
    }

    function getEmployeeByUnit() {
        var unitId: string = "";
        const tempId = window.sessionStorage.getItem('deptId');
        if (tempId) {
            unitId = tempId;
            axios.get(backend + `/api/v1/employee/${unitId}`, options)
                .then(res => {
                    if (res.data.status === ResponseStatus.SUCCESS) {
                        setUserList(res.data.data);
                        setViewMode(ViewUsersBy.UNIT_ID);
                    } else {
                        alert(`Error: ${res.data.status}`);
                    }
                })
                .catch(err => {
                    alert(err.response.data.message);
                })
        }

    }
    const Report = React.forwardRef((props, ref) => {
        // const cRef=useRef(null);
        return (
            <div className="mx-3" ref={ref as LegacyRef<HTMLDivElement> | null}>
                <table className=" table whitebg">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Unit ID</th>
                            <th>Designation</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRows}
                    </tbody>
                </table>
                <div className="whitebg" hidden={(viewMode === ViewUsersBy.UNIT_ID)}>
                    <h3>Employee count by Unit</h3>
                    <MakePieChart data={pieData} />
                </div>
            </div>
        );
    });
    return (
        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Report ref={componentRef} />
            <div>
                <br />
                <ReactToPrint documentTitle="Employee Report" trigger={() => <button className="btn btn-primary">Print report</button>} content={() => componentRef.current} />
            </div>
        </div>
    );
}
export default ViewAllEmployeesPage;