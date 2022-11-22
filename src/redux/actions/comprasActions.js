import { comprasTypes } from "../types/compraTypes"

export const actionAddCompra=(compra)=>{
    return{
        type:comprasTypes.ADD_COMPRA,
        payload:compra
    }
}
export const actionDeleteCompra=(index)=>{
    return{
        type:comprasTypes.DELETE_COMPRA,
        payload:index
    }
}