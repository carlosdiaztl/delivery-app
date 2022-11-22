import { comprasTypes } from "../types/compraTypes";

export const compras=(state=[], action)=>{
    switch (action.type) {
        case comprasTypes.ADD_COMPRA:
            
            return[
                ...state,action.payload
            ]
            case comprasTypes.ALL_DELETE:
                const compra=[...state]
                compra.splice(action.payload,1)
                return[
                    ...compra
                ]
    
        default:
            return state;
    }
}