import React from "react";
import { useSelector } from "react-redux";
import Footer from "../home/footer/Footer";

const Recientes = () => {
  const comprasStore = useSelector((store) => store.comprasStore);
  console.log(comprasStore);
  return (
    <div>
      Recientes
      {comprasStore.length ? 
        comprasStore.map((item,index)=>(
          <section key={index}>
          <div > <h4>Restaurante: {item.restaurante} </h4>
          <span>{item.platoName} </span>
          <span>{item.price}x </span>
          <span>{item.quantity} </span>
          <span>total={item.total} </span>
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
