import React from "react";
import location from "../../assets/location.png";
import restaurant1 from "../../assets/restaurant1.png";
import Dashboard from "./dashboard/Dashboard";
import Dashboardtwo from "./dashboardtwo/Dashboardtwo";
import fiveStars from '../../assets/5.png'
import fourStars from '../../assets/4.png'
import threeStars from '../../assets/3.png'

import "./style.scss";
import Footer from "./footer/Footer";
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

        <section className="nav_sectiontwo">
          <Dashboard />
        </section>
      </nav>
      <div className="main">
        <h4>Restaurants and cafes </h4>
        <section className="main_dashboard">
        <Dashboardtwo/>
        </section>
        <div className="main_content">
        <div className="main_cards"> 
        
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fiveStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards"> 
        
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fiveStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards">
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fourStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards">
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fiveStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards">
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={threeStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards">
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fiveStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards">
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fiveStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        <div className="main_cards">
          <figure>
            <img src={restaurant1} /> 
          </figure>
          <aside><h4>pardes restaurant</h4>
          <img src={fourStars} />
          <h5> Work time 09:30-21:00</h5>
          <p> before you 4 $</p>
           </aside>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
