import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { unitData } from "../../types/unitData";

function AddEmployeePage() {

    const [unitName, setUnitName] = useState("");
    const [unit, setUnit] = useState("");
    const [unitList, setUnitList] = useState<Array<unitData>>([]);
    const backend = BackendAddress;
    const [unitDropdownList, setUnitDropdown] = useState<Array<JSX.Element>>([]);
    const [unitId, setUnitId] = useState("");

    const [firstName,setFname]=useState("");
    const [lastName,setLname]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");


    const options = RequestOptions;

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

    useEffect(() => {

        getUnitList();

    }, []);

    useEffect(() => {
        if (unitList.length > 0) {
            console.log("Setting dropdown list" + unitList.length);
            var unitElemets: Array<JSX.Element> = [];
            unitList.forEach(unit => {
                unitElemets.push(<Dropdown.Item eventKey={unit._id}  key={unit._id}>{unit.unitName}</Dropdown.Item>);
            });
            setUnitDropdown(unitElemets);
        }

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

    }, [unitList, unit]);

    function addEmployee(){
        if(unitId && firstName && lastName && email && phone){
            const newEmp={
                "unitid":unitId,
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "contactNumber":phone,
                "designation":"employee"
            };
            axios.post(backend+'/api/v1/employee',newEmp,options)
            .then(res=>{
                console.log(res.data);
                if(res.data.status===ResponseStatus.SUCCESS){
                    alert("Successfully added new employee");

                }else{
                    alert(`Error: ${res.data.status}`);
                }
            })
            .catch(err=>{
                console.log("Error adding emo:");
                console.error(err.response.status);
                if(err.response.status && err.response.status===403){
                    alert("Unauthorized");
                }else{
                    alert(`Error: ${err.response.message}`);
                }
                
            })
        }else{
            alert("All fields are REQUIRED");
        }
    }

    return (
        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Form className="whitebg p-3">
                <Form.Group className="mb3">
                    <Form.Label> Unit Id:</Form.Label>
                    <Dropdown className="my-3" onSelect={(uid)=>{if(uid){setUnit(uid)}}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {unitName ? unitName : "Select Unit"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {unitDropdownList}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mb3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" onChange={e=>{setFname(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={e=>{setLname(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={e=>{setEmail(e.target.value)}}/>
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" onChange={e=>{setPhone(e.target.value)}}/>
                </Form.Group>


                <br />
                <Form.Control type="submit" className="btn btn-primary" value="Add employee" onClick={e=>{e.preventDefault();addEmployee();}}/>
            </Form>

        </div>
    );
}
export default AddEmployeePage;