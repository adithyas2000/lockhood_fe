import { materialData } from "./materialData"

export type invUnitData={
    '_id':string,
    'materialid':string,
    'unitid':string,
    'availableQty':number,
    'lowLevelQty':number,
    'inventory':materialData
}