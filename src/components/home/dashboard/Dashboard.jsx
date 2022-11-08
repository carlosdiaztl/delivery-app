import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import promo1 from '../../../assets/Promo1.png'
import promo2 from '../../../assets/Promo2.png'

import "./style.scss";
const Dashboard = () => {
  


  

  return (
    <div className="dashboard">
      <section className="dashboard_center">
        <article className="dashboard__disponibles">
          
         
        </article>

        <div className="slider-container">
         
            
              <section  className="slider-item">
               
                
                  {" "}
                  <img src={promo1} />
               
               
                
                
              </section>
              <section  className="slider-item">
                
               
                  {" "}
                  <img src={promo2} />
               
                
              </section>
           
        </div>
      </section>
      
    </div>
  );
};

export default Dashboard;
