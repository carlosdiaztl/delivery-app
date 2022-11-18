import React, { useEffect } from "react";
import location from "../../assets/location.png";
import restaurant1 from "../../assets/restaurant1.png";
import Dashboard from "./dashboard/Dashboard";
import Dashboardtwo from "./dashboardtwo/Dashboardtwo";
import fiveStars from '../../assets/5.png'
import fourStars from '../../assets/4.png'
import threeStars from '../../assets/3.png'
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogOutAsync } from "../../redux/actions/userActions";
import "./style.scss";
import Footer from "./footer/Footer";
import { actionGetrestaurantesAsync } from "../../redux/actions/restaurantesActions";
import { auth } from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate=useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        
      } 
      else{
        navigate(`/createaccount/${user.uid}`)
        console.log(user);

      }
      
      
    });
  }, []);

  const userStore = useSelector((store) => store.userStore);
  const {restaurantes}=  useSelector((store) => store.restaurantStore);
  console.log(userStore);
  console.log(restaurantes);
  
  const dispatch = useDispatch();
  const LogOutUser=()=>{
    // dispatch(actionUserCreateAsync({}))
    // dispatch(actionSignPhoneSync({}))
  //   signOut()
  //  .then(()=>{
  //   console.log('salir');
  //  })
  //  .catch((error)=>{console.log(error);})
  dispatch(actionUserLogOutAsync())
  }
  useEffect(() => {
    dispatch(actionGetrestaurantesAsync())
    
   
  }, [dispatch])
  
  
  return (
    <div className="body">
      <nav className="nav">
        <section className="nav_section">
          {" "}
          <img src={location} />
          <span>
            <p className="nav_p">Deliver to</p>
            <p> 882 Well St, New-York ↓ </p>
            <button onClick={LogOutUser}> Log Out</button>
          </span>{" "}
          {}
          <button className="nav_new"> Add restaurant</button>
          
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
