import internal from "stream"

export type orderRequestData={
    'req_id':string,
    'req_status':string,
    'material_name':string,
    'available_qty':number,
    'requested_date':string,
    'sent_to_purchase':boolean,
    'requested_qty':number,
    'price_per_unit':number,
    'completed_date':string
}