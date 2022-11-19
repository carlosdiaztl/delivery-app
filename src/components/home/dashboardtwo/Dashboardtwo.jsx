import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
const category = [
  "All",
  "fast food",
  "pizza",
  "hamburguers",
  "pasta",
  "mexican",
  "salads",
  "vegetarian",
];
const Dashboardtwo = () => {
  const { filtroRestaurantes } = useSelector((store) => store.restaurantStore);
  const {restaurantes}=  useSelector((store) => store.restaurantStore);
  const filtrarRstaurantes = (categoria) => {
   const filtrado= restaurantes.filter((item)=>item.category === categoria )
   console.log(filtrado);
  };
  return (
    <aside>
    {category.map((categoria,index)=>(
      <button key={index} onClick={()=>{filtrarRstaurantes(categoria)}  }>{categoria} </button>

    ))}
    
    </aside>
  );
};

export default Dashboardtwo;
