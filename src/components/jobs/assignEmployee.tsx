import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ResponseStatus } from "../../enums/enums";
import { BackendAddress, RequestOptions } from "../../functions/HTTPReqData";
import { employeeData } from "../../types/employeeData";


function AssignEmployeePage() {

    const [empList, setEmpList] = useState<Array<employeeData>>([]);
    const [empId,setEmpId]=useState("");
    const [empName,setEmpName]=useState("");
    const [empDropdown,setEmpDropdown]=useState<Array<JSX.Element>>([]);

    const { jId } = useParams();
    const options = RequestOptions;

    const backend = BackendAddress;

    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(()=>{
        var dropdownArray:Array<JSX.Element>=[];
        if(empList.length>0){
            empList.forEach(emp=>{
                dropdownArray.push(<Dropdown.Item eventKey={emp.empid} key={emp.empid}>{emp.firstName+" "+emp.lastName}</Dropdown.Item>)
            });
            setEmpDropdown(dropdownArray);
        }

    },[empList]);

    useEffect(()=>{
        if(empId && empList.length>0){
            empList.forEach(emp=>{
                if(emp.empid===empId){
                    setEmpName(emp.firstName+" "+emp.lastName);
                }
            })
        }
    },[empId])

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

    function onEmpSelect(eId:string|null){
        if(eId){
            setEmpId(eId);
        }
    }

    function assignEmp(){
        const data={
            "jobid":jId,
            "empid":empId
        };
        axios.post(backend+'/api/v1/job/assign',data,options)
        .then(res=>{
            if(res.data.status===ResponseStatus.SUCCESS){
                alert(`Successfully assigned job ${jId} to ${empName}`);
                window.location.href='/job/kanban';
            }else{
                alert(`Error : ${res.data.status}`);
            }
        })
        .catch(err=>{
            alert(`Error: ${err.response.data.message}`);
        })
    }


    return (
        <div className="fourth-color-text p-5 mb-5 rounded fourth-color first-color-text">
            <Form className="whitebg p-3">
                <Form.Group className="mb3">
                    <Form.Label>Job ID</Form.Label>
                    <Form.Control disabled value={jId} />
                </Form.Group>

                <Form.Group className="mb3">
                    <Form.Label>Assign to:</Form.Label>
                    <Dropdown className="m-3" onSelect={id => { onEmpSelect(id) }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {empName.trim() ? empName : "Select Employee"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {empDropdown}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Control className="btn btn-primary" type="submit" value="Assign" onClick={e=>{e.preventDefault();assignEmp();}}/>
            </Form>
        </div>
    )
}

export default AssignEmployeePage;