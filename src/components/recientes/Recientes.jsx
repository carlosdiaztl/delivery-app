import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionDeleteCompra } from "../../redux/actions/comprasActions";
import { actionGetPlatosAsync } from "../../redux/actions/platosActions";
import Footer from "../home/footer/Footer";

const Recientes = () => {
  const dispatch =useDispatch()
  const comprasStore = useSelector((store) => store.comprasStore);
  console.log(comprasStore);
  const [states,setStates]=useState("")
 useEffect(() => {
  dispatch(actionGetPlatosAsync())
 }, [dispatch])
 
  const deleteItem=(index)=>{
   const compra =[...comprasStore]
   compra.splice(index,1)
dispatch(actionDeleteCompra(compra))
console.log(compra);
console.log(comprasStore);
  }
  return (
    <div>
      Recientes
      {comprasStore.length ? 
        comprasStore.map((item,index)=>(
          <section key={index} onClick={()=>{deleteItem(index)}} >
          <div > <h4>Restaurante: {item.restaurante} </h4>
          <span>{item.platoName} </span>
          <span>{item.price}x </span>
          <span>{item.quantity} </span>
          <span>total={item.total} </span>
          <span  > pedido {item.confirmation?"confirmado":"sin confirmar"}</span>
          
          
          </div>
           
          </section>
        ))
       : (
        <h3> Tu lista esta vacia, compra algo primero </h3>
      )}
      
      <Footer />
    </div>
  );
};

export default Recientes;
