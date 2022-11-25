import React, { useEffect, useState } from "react";
import location from "../../assets/location.png";
import restaurant1 from "../../assets/restaurant1.png";
import Dashboard from "./dashboard/Dashboard";
import Dashboardtwo from "./dashboardtwo/Dashboardtwo";
import fiveStars from "../../assets/5.png";
import fourStars from "../../assets/4.png";
import threeStars from "../../assets/3.png";
import { useDispatch, useSelector } from "react-redux";
import { actionUserLogOutAsync } from "../../redux/actions/userActions";
import "./style.scss";
import Footer from "./footer/Footer";
import { actionGetrestaurantesAsync } from "../../redux/actions/restaurantesActions";
import { auth } from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { actionGetPlatosAsync } from "../../redux/actions/platosActions";
const Home = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  const [mostar, setMostrar] = useState(false);
  const irCompras=()=>{
    navigate('/recientes')
    setMostrar(!mostar)
  }
  console.log(mostar);
  const userStore = useSelector((store) => store.userStore);
  const { restaurantes } = useSelector((store) => store.restaurantStore);
  const { filtroRestaurantes } = useSelector((store) => store.restaurantStore);
  const comprasStore = useSelector((store) => store.comprasStore);
  console.log(comprasStore);
  console.log(userStore);
  console.log(restaurantes);
  console.log(filtroRestaurantes);
  const dispatch = useDispatch();
  const LogOutUser = () => {
    // dispatch(actionUserCreateAsync({}))
    // dispatch(actionSignPhoneSync({}))
    //   signOut()
    //  .then(()=>{
    //   console.log('salir');
    //  })
    //  .catch((error)=>{console.log(error);})
    dispatch(actionUserLogOutAsync());
  };
  useEffect(() => {
    dispatch(actionGetrestaurantesAsync());
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);
  const addRestaurant = () => {
    navigate("/addRestaurant");
  };
  const addDish = () => {
    navigate("/addPlato");
  };

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
    
          {userStore.admin?  (
            <div className="buttonsH">
              {" "}
              <button className="nav_new" onClick={addRestaurant}>
                {" "}
                Add restaurant
              </button>
              <button className="nav_new" onClick={addDish}>
                {" "}
                Add dish
              </button>
            </div>
          ) : (
            <></>
          )}
        </section>

        <section className="nav_sectiontwo">
          <Dashboard />
        </section>
      </nav>
      <div className="main">
        <h4>Restaurants and cafes </h4>
        <section className="main_dashboard">
          <Dashboardtwo />
        </section>
        <div className="main_content">
          {filtroRestaurantes.length
            ? filtroRestaurantes.map((item, index) => (
                <div
                  key={index}
                  className="main_cards"
                  onClick={() => {
                    navigate(`/restaurante${item.name}`);
                  }}
                >
                  <figure>
                    <img src={`${item.image}`} />
                  </figure>
                  <aside>
                    <h4> {item.name} </h4>
                    <img src={fourStars} />
                    <h5>
                      {" "}
                      Work time {item.apertureTime}:30-{item.closeTime}:00
                    </h5>
                    <p> before you {item.minPrice} $</p>
                  </aside>
                </div>
              ))
            : restaurantes.map((item, index) => (
                <div
                  key={index}
                  className="main_cards"
                  onClick={() => {
                    navigate(`/restaurante${item.name}`);
                  }}
                >
                  <figure>
                    <img src={`${item.image}`} />
                  </figure>
                  <aside>
                    <h4> {item.name} </h4>
                    <img src={fourStars} />
                    <h5>
                      {" "}
                      Work time {item.apertureTime}:30-{item.closeTime}:00
                    </h5>
                    <p> before you {item.minPrice} $</p>
                  </aside>
                </div>
              ))}
          {}
        </div>
      </div>
      {comprasStore.length ? (
        <button
          onClick={irCompras
            
          }
          className="botonCompras"
        >
           <span> View card</span>
          {" "}
        </button>
      ) : (
        ""
      )}

      <Footer />
    </div>
  );
};

export default Home;
