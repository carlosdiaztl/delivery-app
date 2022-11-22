import { comprasTypes } from "../types/compraTypes"

export const actionAddCompra=(compra)=>{
    return{
        type:comprasTypes.ADD_COMPRA,
        payload:compra
    }
}
export const actionDeleteCompra=(newList)=>{
    return{
        type:comprasTypes.DELETE_COMPRA,
        payload:newList
    }
}