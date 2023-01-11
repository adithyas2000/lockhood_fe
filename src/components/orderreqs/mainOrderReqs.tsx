import { ReactElement } from "react";
import ViewOrderreqs from "./viewOrderreqs";

function MainViewOrderreqs():ReactElement{
    if(window.sessionStorage.getItem('deptId')==='WHU'){
        return(<ViewOrderreqs/>)
    }else if(window.sessionStorage.getItem('deptId')==='PD'){
        return(<ViewOrderreqs/>)
    }else{
        return(<ViewOrderreqs/>)
    }
}

export default MainViewOrderreqs;