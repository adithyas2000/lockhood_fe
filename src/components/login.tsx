import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { loginData } from "../types/logindata";
import { isAuthRes, isLogindata } from "../validations/typeChecks";

const backend = process.env.REACT_APP_BACKEND_DOMAIN;

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    console.log(backend);
    return (
        <div className="centerContainer p-5 mb-5 rounded fourth-color first-color-text">
            <h4>Login</h4><br />
            <div className="cardContainer fourth-color">


                <Form onSubmit={e => loginRequest(e)}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
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
            "username": username,
            "password": password
        };

        if (isLogindata(data)) {
            var formData = data;

            if (typeof (backend) != "undefined") {
                await axios.post(backend + "/", formData)
                    .then(res => {
                        if(isAuthRes(res.data)){
                            console.log("Auth response:");
                            console.log(res.data)
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

