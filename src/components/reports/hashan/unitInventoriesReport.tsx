import axios from "axios";
import { useEffect, useRef } from "react";
import { ResponseStatus } from "../../../enums/enums";
import { BackendAddress, RequestOptions } from "../../../functions/HTTPReqData";

function UnitInventoriesReport(){
    const componentRef = useRef<HTMLDivElement>(null);
    
    const backend=BackendAddress;
    const options=RequestOptions;

    useEffect(()=>{
        getData();
    },[]);

    function getData(){
        axios.get(backend+'/api/v1/inventory-unit/report/inventory-unit',options)
        .then(res=>{
            if(res.data.status===ResponseStatus.SUCCESS){

            }
        })
    }

    return(
        <div className=" p-5 mb-5 rounded fourth-color first-color-text">

        </div>
    )
}

export default UnitInventoriesReport;