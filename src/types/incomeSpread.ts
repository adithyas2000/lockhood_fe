import { productData } from "./productData"

export type incomeSpread={
    'saleid':string,
    'totalSoldQty':number,
    'pricePerUnit':number,
    'periodStartDate':string,
    'periodEndDate':string,
    'product':{'productName':string,'productDescription':string},
    'saleRecordIncome':number

}