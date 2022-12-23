import { authRes } from "../types/authResponse.js";
import { loginData } from "../types/logindata.js";

export function isLogindata(data:any):loginData{
    return(
        data &&
        typeof(data["username"])==="string" &&
        typeof(data["password"])==="string"
    );
}

export function isAuthRes(data:any):authRes{
    return(
        data&&
        typeof(data['authLevel'])==="number" &&
        typeof(data['authToken'])==="string" &&
        typeof(data['userId'])==="string"
    );
}