import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authRes } from "../../types/authResponse";
import { loginData } from "../../types/logindata";
import { isAuthRes, isLogindata } from "../../validations/typeChecks";
import { Departments,DepartmentsCode,Units,UnitsCodes } from "../../enums/enums";
import { BackendAddress } from "../../functions/HTTPReqData";

const backend = BackendAddress;

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        if(window.sessionStorage.getItem('email')){
            window.location.href='/job/kanban';
        }
    });
    return (
        <div className="centerContainer p-5 mb-5 rounded fourth-color first-color-text">
            <h4>Login</h4><br />
            <div className="cardContainer fourth-color">


                <Form onSubmit={e => loginRequest(e)}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </div>
        </div>
    );


    async function loginRequest(event: React.FormEvent<HTMLFormElement>) {
        console.log("Send req to " + backend);
        event.preventDefault();


        const data = {
            "email": email,
            "password": password
        };

        if (isLogindata(data)) {
            var formData = data;
            if (typeof (backend) != "undefined") {
                await axios.post(backend + "/api/v1/auth/login", formData)
                    .then(res => {
                        if(isAuthRes(res.data)){
                            console.log("Auth response:");
                            console.log(res.data)
                            var authData:authRes=res.data;
                            window.sessionStorage.setItem('token',authData.token);
                            window.sessionStorage.setItem('refreshToken',authData.refreshToken);
                            window.sessionStorage.setItem('userDept',authData.data.user.userDept);
                            window.sessionStorage.setItem('email',email);
                            window.sessionStorage.setItem('deptId',authData.data.user.userDeptid);
                            
                            window.location.reload();
                        }else{
                            console.log("Invalid response:");
                            console.log(res.data);
                        };
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.error("Backend domain undefined:" + backend);
            }
        }else{
            window.alert("Invalid data")
        }



    }
}

export default LoginPage;

