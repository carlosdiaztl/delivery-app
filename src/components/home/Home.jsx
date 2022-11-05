import React from "react";
import location from "../../assets/location.png";
import restaurant1 from "../../assets/restaurant1.png";

import "./style.scss";
const Home = () => {
  return (
    <div className="body">
      <nav className="nav">
        <section className="nav_section">
          {" "}
          <img src={location} />
          <span>
            <p className="nav_p">Deliver to</p>
            <p> 882 Well St, New-York ↓ </p>
          </span>{" "}
        </section>
        <section className="nav_sectiontwo"> cupones</section>
      </nav>
      <div className="main">
        <h4>Restaurants and cafes </h4>
        <section>barras de elecciones </section>
        <div>
          <section>
            <img src={restaurant1} /> cards
          </section>
        </div>
      </div>
      <div className="footer"> </div>
    </div>
  );
};

export default Home;
