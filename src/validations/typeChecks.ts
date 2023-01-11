import { authRes } from "../types/authResponse.js";
import { employeeData } from "../types/employeeData.js";
import { kanbanData } from "../types/kanbanData.js";
import { loginData } from "../types/logindata.js";
import { materialData } from "../types/materialData.js";
import { orderRequestData } from "../types/orderRequestData.js";
import { salesReport } from "../types/salesReportData.js";

export function isLogindata(data: any): loginData {
    return (
        data &&
        typeof (data["email"]) === "string" &&
        typeof (data["password"]) === "string"
    );
}

export function isAuthRes(data: any): authRes {
    return (
        data &&
        typeof (data['data']) === 'object' &&
        typeof (data['status']) === "string" &&
        typeof (data['token']) === "string" &&
        typeof (data['refreshToken']) === 'string'
    );
}

export function isKanbanData(data: Array<Array<any>>): Array<Array<kanbanData>> {
    var typeMismatch: boolean = false;
    data.forEach(column => {
        column.forEach(card => {
            if (!(
                typeof (card['jobid']) === 'string' &&
                typeof (card['unitid']) === 'string' &&
                typeof (card['empid']) === 'string' &&
                typeof (card['expectedStartDate']) === 'string' &&
                typeof (card['expectedFinishDate']) === 'string' &&
                typeof (card['actualStartDate']) === 'string' &&
                typeof (card['actualFinishDate']) === 'string' &&
                typeof (card['allocatedHours']) === 'number' &&
                typeof (card['description']) === 'string' &&
                typeof (card['status']) === 'string'
            )) {
                typeMismatch = true;
            }
        });
    });

    if (!typeMismatch) {
        return (
            data
        );
    } else {
        return ([]);
    }

}

export function isSalesReportData(data: any): salesReport {
    return (
        data &&

        typeof (data['sale_id']) === 'number' &&
        typeof (data['product_name']) === 'string' &&
        typeof (data['total_sold_qty']) === 'number' &&
        typeof (data['price_per_unit']) === 'number' &&
        typeof (data['date']) === 'string'
    );
};

export function isOrderReqData(data: any): orderRequestData {
    return (
        data &&
        typeof (data['reqid']) == 'string' &&
        typeof (data['unitid']) == 'string' &&
        typeof (data['reqStatus']) == 'string' &&
        typeof (data['sentToPurchase']) == 'boolean' &&
        typeof (data['isCompleted']) == 'boolean' &&
        typeof (data['availableQty']) == 'number' &&
        typeof (data['materialid']) == 'string'

    );
};

export function isMaterialData(data: any): materialData {
    return (
        data &&
        typeof (data['_id']) === 'string' &&
        typeof (data['materialid']) === 'string' &&
        typeof (data['materialName']) === 'string'
    );
}

export function isEmployeeData(data: any): employeeData {
    return (
        data &&
        typeof (data['_id']) === 'string' &&
        typeof (data['unitid']) === 'string' &&
        typeof (data['empid']) === 'string' &&
        typeof (data['designation']) === 'string' &&
        typeof (data['firstName']) === 'string' &&
        typeof (data['lastName']) === 'string' &&
        typeof (data['email']) === 'string' &&
        typeof (data['contactNumber']) === 'string'
    )
}