import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import promo1 from "../../../assets/Promo1.png";
import promo2 from "../../../assets/Promo2.png";
import promo3 from "../../../assets/promo3.png";
import promo4 from "../../../assets/promo5.png";
import promo5 from "../../../assets/helados 2x1.jpg";
import promo6 from "../../../assets/promocomida.png";
import "./style.scss";
const Dashboard = () => {
  const [carrusel,setCarrusel]=useState(0)
  const [img,setImg]=useState(promo1)
  useEffect(() => {
    if (carrusel<5) {
      setTimeout(()=>{setCarrusel(carrusel+1)},2000)
      
    }
    if (carrusel===5) {
      setTimeout(()=>{setCarrusel(0)},2000)
    }  
   
  }, [carrusel])
  useEffect(() => {
   switch (carrusel) {
    case 0:
      return setImg(promo1)
    case 1:
      
      return setImg(promo2)
   case 2:
    return setImg(promo3)
    case 3:
      return setImg(promo4)
    case 4:
      return setImg(promo5)
      case 5:
        return setImg(promo6)
    default:
      break;
   }
  }, [carrusel])
  return (
    <div className="dashboard">
      <img src={img} />
    </div>
  );
};

export default Dashboard;
