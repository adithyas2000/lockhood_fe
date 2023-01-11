import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { employeeData } from "../../types/employeeData";
import { invUnitData } from "../../types/inventoryUnitData";
import { materialData } from "../../types/materialData";


function AssignEmployeePage() {

    const [empList, setEmpList] = useState<Array<employeeData>>([]);
    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [empDropdown, setEmpDropdown] = useState<Array<JSX.Element>>([]);
    const [allMats, setAllMats] = useState<Array<invUnitData>>([]);
    const [availableMats, setAvailableMats] = useState<Array<invUnitData>>([]);
    const [availableMatElements, setAvailableMatElements] = useState<Array<JSX.Element>>([]);
    const [usedMats, setUsedMats] = useState<Array<invUnitData>>([]);
    const [usedMatElements, setUsedMatElements] = useState<Array<JSX.Element>>([]);
    type matDataType = {
        'materialid': string,
        'qty': number
    }
    const [matData, setMatData] = useState<Array<matDataType>>([]);
    const [currentId, setCurrentId] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [currentQty, setCurrentQty] = useState(0);



    const { jId } = useParams();
    const options = RequestOptions;

    const backend = BackendAddress;

    const unitId = window.sessionStorage.getItem('deptId');

    useEffect(() => {
        getEmployees();
        getAllMats();
    }, []);

    useEffect(() => {
        var dropdownArray: Array<JSX.Element> = [];
        if (empList.length > 0) {
            empList.forEach(emp => {
                dropdownArray.push(<Dropdown.Item eventKey={emp.empid} key={emp.empid}>{emp.firstName + " " + emp.lastName}</Dropdown.Item>)
            });
            setEmpDropdown(dropdownArray);
        }

    }, [empList]);

    useEffect(() => {
        if (empId && empList.length > 0) {
            empList.forEach(emp => {
                if (emp.empid === empId) {
                    setEmpName(emp.firstName + " " + emp.lastName);
                }
            })
        }
    }, [empId])

    function getEmployees() {
        axios.get(backend + `/api/v1/employee/${window.sessionStorage.getItem('deptId')}`, options)
            .then(res => {
                console.log(res.data);
                if (res.data.status === ResponseStatus.SUCCESS) {
                    const tempArray: Array<employeeData> = res.data.data;
                    setEmpList(tempArray);
                }
            })
            .catch(err => {
                alert(`Error : ${err.response.data.message}`);
            })
    }

    function onEmpSelect(eId: string | null) {
        if (eId) {
            setEmpId(eId);
        }
    }

    function assignEmp() {
        var tempMatData:Array<matDataType>=[...matData];
        tempMatData.forEach(mat=>{
            if(mat.qty<=0){
                tempMatData.splice(tempMatData.indexOf(mat),1);
            }
        });
        const data = {
            "jobid": jId,
            "empid": empId,
            "materials":[...tempMatData]
        };
        axios.post(backend + '/api/v1/job/assign', data, options)
            .then(res => {
                if (res.data.status === ResponseStatus.SUCCESS) {
                    alert(`Successfully assigned job ${jId} to ${empName}`);
                    window.location.href = '/job/kanban';
                } else {
                    alert(`Error : ${res.data.status}`);
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.data.message}`);
            })
    };

    function getAllMats() {
        axios.get(backend + `/api/v1/inventory-unit/${unitId}`, options)
            .then(res => {
                console.log(res.data);
                if (res.data.status === ResponseStatus.SUCCESS) {
                    const tempData: Array<invUnitData> = res.data.data;
                    setAllMats(tempData);
                } else {
                    alert(res.data.status);
                }
            })
            .catch(err => {
                console.error(err);
                alert(`Error: ${err.response.data.message}`);
            })
    };

    useEffect(() => {
        console.log(`Available:${availableMats.length}`);
        if (availableMats.length >= 0) {
            var tempArray: Array<JSX.Element> = [];
            availableMats.forEach(mat => {
                console.log("Pushing " + mat.inventory.materialName);
                tempArray.push(<MakeDropdown key={mat.materialid} mat={mat} />)
            });
            setAvailableMatElements(tempArray);
        }
    }, [availableMats]);

    useEffect(() => {
        console.log(`Used:${usedMats.length}`);
        if (usedMats.length >= 0) {
            var tempArray: Array<JSX.Element> = [];
            usedMats.forEach(mat => {
                var cqty = 0;
                matData.forEach(data => {
                    if (mat.materialid === data.materialid) {
                        cqty = data.qty;
                    }
                })
                tempArray.push(<MakeUsedMat key={mat.materialid} mat={mat} qty={cqty} />)
            });
            setUsedMatElements(tempArray);
        }
    }, [usedMats]);

    useEffect(() => {
        setAvailableMats(allMats);
    }, [allMats]);

    function MakeDropdown(props: { mat: invUnitData }) {
        return (<Dropdown.Item eventKey={props.mat.materialid}>{props.mat.inventory.materialName}</Dropdown.Item>)
    }

    function MakeUsedMat(props: { mat: invUnitData, qty: number }) {
        return (<div key={props.mat.materialid} style={{ display: 'flex' }}><li>{props.mat.inventory.materialName} - {props.qty}</li><Button id={props.mat.materialid} onClick={e => { const t = e.target as Element; onRemoveMat(t.id); }} className="btn btn-danger">Remove</Button></div>);
    }

    function onSelectMat(id: string | null) {
        console.log(id);


        if (id) {
            setCurrentId(id);
            if (allMats.length > 0) {
                allMats.forEach(mat => {
                    if (mat.materialid === id) {
                        setCurrentName(mat.inventory.materialName);
                    }
                })
            }
        }

    }

    function onRemoveMat(id: string | null) {
        if (id) {
            onChangeQty(id, 0);
            const idFromButton: string = id;
            var tempUsed: Array<invUnitData> = [...usedMats];
            var tempAvailable: Array<invUnitData> = [...availableMats];
            tempUsed.forEach(mat => {
                const idFromMat: string = mat.materialid;
                if (idFromButton === idFromMat) {
                    const available = tempUsed.splice(tempUsed.indexOf(mat), 1);
                    tempAvailable = tempAvailable.concat(available);

                }
            });
            setUsedMats(tempUsed);
            setAvailableMats(tempAvailable);
        }
    }

    useEffect(() => {
        if (usedMats.length >= 0) {
            var tempArray: Array<invUnitData> = [...usedMats];
            var tempData: Array<matDataType> = [...matData];

            tempArray.forEach(mat => {
                var existing: boolean = false;
                tempData.forEach(data => {
                    if (mat.materialid === data.materialid) {
                        existing = true;
                    }
                });
                if (!existing) {
                    console.log("New Mat Used: " + mat.materialid);
                    tempData.push({ materialid: mat.materialid, qty: 0 });
                }
            });
            setMatData(tempData);
        }
    }, [usedMats]);

    useEffect(() => {
        console.log("Mat data");
        console.table(matData);
    }, [matData]);

    function onChangeQty(id: string, quantity: number) {
        console.log(`ID:${id} - QTY:${quantity}`);
        if (id && quantity!==null) {
            const data: matDataType = {
                materialid: id,
                qty: quantity
            };

            if (matData.length >= 0) {
                var tempData: Array<matDataType> = [...matData];
                var existing: boolean = false;
                var found: matDataType = { materialid: '0', qty: 0 };
                tempData.forEach(mat => {
                    if (mat.materialid === data.materialid) {
                        existing = true;
                        found = mat;
                    }
                });
                if (existing) {
                    tempData.splice(tempData.indexOf(found), 1);
                    existing = false;
                }
                if (!existing) {
                    tempData.push(data);
                    var tempAvailable: Array<invUnitData> = [...availableMats];
                    var tempUsed: Array<invUnitData> = [...usedMats];
                    const idFromDropdown: string = id;
                    tempAvailable.forEach(mat => {
                        const idFromMat: string = mat.materialid;
                        if (idFromDropdown === idFromMat) {
                            console.log("Splicing");
                            const used = tempAvailable.splice(tempAvailable.indexOf(mat), 1);
                            console.log(tempAvailable.length);

                            tempUsed = tempUsed.concat(used);

                        }
                    });
                    setAvailableMats(tempAvailable);
                    setUsedMats(tempUsed);
                }
                setMatData(tempData);
            } else {
                var tempArray: Array<matDataType> = [];
                tempArray.push(data);
                setMatData(tempArray);
            }

        }

        setCurrentId("");
        setCurrentName("");
        setCurrentQty(0);

    }

    return (
        <div className=" p-5 mb-5 rounded fourth-color ">
            <Form className="whitebg p-3">
                <Form.Group className="mb3">
                    <Form.Label>Job ID</Form.Label>
                    <Form.Control disabled value={jId} />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Assign Employee:</Form.Label>
                    <Dropdown className="m-3" onSelect={id => { onEmpSelect(id) }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {empName.trim() ? empName : "Select Employee"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {empDropdown}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb3">
                    <Form.Label>Assign materials:</Form.Label>
                    <ul>
                        {usedMatElements}
                    </ul>
                    <Dropdown className="m-3" onSelect={id => onSelectMat(id)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {currentName ? currentName : " Select Mat"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {availableMatElements}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control disabled={!currentId} type="number" placeholder="Enter Material Quantity" onChange={e => { setCurrentQty(Number(e.target.value)) }} />
                    <Button className="btn btn-success" onClick={e => { onChangeQty(currentId, currentQty) }}>Add Material</Button>
                </Form.Group>
                <Form.Control className="btn btn-primary" type="submit" value="Assign" onClick={e => { e.preventDefault(); assignEmp(); }} />
            </Form>
        </div>
    )
}

export default AssignEmployeePage;