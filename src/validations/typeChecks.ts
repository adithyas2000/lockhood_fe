import { authRes } from "../types/authResponse.js";
import { kanbanData } from "../types/kanbanData.js";
import { loginData } from "../types/logindata.js";
import { orderRequestData } from "../types/orderRequestData.js";
import { salesReport } from "../types/salesReportData.js";

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

export function isKanbanData(data:Array<Array<any>>):Array<Array<kanbanData>>{
    var typeMismatch:boolean=false;
    data.forEach(column => {
        column.forEach(card => {
            if(!(typeof(card['title'])==='string' && typeof(card['header'])==='string' && typeof(card['content'])==='string')){
                typeMismatch=true;
            }
        });
    });

    if(!typeMismatch){
        return(
        data
    );
    }else{
        return([]);
    }
    
}

export function isSalesReportData(data:any):salesReport{
    return(
        data &&
        
        typeof(data['sale_id'])==='number' &&
        typeof(data['product_name'])==='string' &&
        typeof(data['total_sold_qty'])==='number' &&
        typeof(data['price_per_unit'])==='number' &&
        typeof(data['date'])==='string'
    );
};

export function isOrderReqData(data:any):orderRequestData{
    return(
        data&&
        typeof(data['req_id'])=='string' &&
        typeof(data['req_status'])=='string' &&
        typeof(data['material_name'])=='string' &&
        typeof(data['available_qty'])=='number' &&
        typeof(data['requested_date'])=='string' &&
        typeof(data['sent_to_purchase'])=='boolean' &&
        typeof(data['requested_qty'])=='number' &&
        typeof(data['price_per_unit'])=='number' &&
        typeof(data['completed_date'])=='string'
        
    );
};