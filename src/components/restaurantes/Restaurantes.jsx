import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import Footer from '../home/footer/Footer';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import { auth } from '../../Firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Restaurantes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetPlatosAsync());
    dispatch(actionGetrestaurantesAsync());
  }, [dispatch]);

  // useEffect(() => {}, [dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        console.log(user?.displayName);
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  const { restaurantes } = useSelector((state) => state.restaurantStore);
  const { platos } = useSelector((state) => state.platosStore);
  console.log(platos);
  const { name, property } = useParams();
  console.log(property);
  const platosRestaurante = platos.filter((plato) => plato.property === name);
  console.log(platosRestaurante);
  console.log(restaurantes);
  const restaurante = restaurantes.filter(
    (restaurant) => restaurant.name === name
  );
  const restaurantSelect = restaurante[0];
  const goProduct = (name) => {
    navigate(`/plato${name}`);
  };
  return (
    <>
      <h2>Bienvenido a {name} </h2>
      {restaurantSelect ? (
        <header>
          <figure>
            <img src={restaurantSelect.image} />
          </figure>
          <aside>
            <h4> {restaurantSelect.name} </h4>
            <p> {restaurantSelect.description} </p>
          </aside>
        </header>
      ) : (
        <span></span>
      )}
      <div className="contenedor">
        {platosRestaurante.map((plate, index) => (
          <section
            onClick={() => {
              goProduct(plate.name);
            }}
            className="platos"
            key={index}
          >
            {' '}
            <img src={plate.image} />
            <p>{plate.name} </p>
            <h6>${plate.price} </h6>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Restaurantes;
