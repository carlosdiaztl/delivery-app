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
export const actionCambioConfirm=(nuevaLista)=>{
    return{
       type:comprasTypes.CHANGE_STATUS,
       payload:nuevaLista
    }
}
export const actionBorrarTodo=()=>{
    return{
        type:comprasTypes.ALL_DELETE
    }
}