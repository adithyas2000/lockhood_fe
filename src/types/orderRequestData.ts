

export type orderRequestData={
    '_id':string,
    'reqid':string,
    'unitid':string,
    'reqStatus':string,
    'sentToPurchase':boolean,
    'isCompleted':boolean,
    'availableQty':number,
    'materialid':string,
    'requestedDate'?:string,
    'requestedQty'?:number,
    'pricePerUnit'?:number,
    'completedDate'?:string
}