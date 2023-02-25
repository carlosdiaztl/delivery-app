import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase/firebaseConfig';
import { actionAddCompra } from '../../redux/actions/comprasActions';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
// import { actionGetrestaurantesAsync } from "../../redux/actions/restaurantesActions";
import './stylePlato.scss';
const Plato = () => {
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        console.log(true);
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);
  // useEffect(() => {}, [dispatch]);
  const { platos } = useSelector((state) => state.platosStore);
  console.log(platos);
  const { name } = useParams();
  console.log(name);
  const platosRestaurante = platos.filter((plato) => plato.name === name);
  console.log(platosRestaurante);
  const platoSelect = platosRestaurante[0];
  const goBack = (restaurante) => {
    navigate(`/restaurante${restaurante}`);
  };
  const changeValue = (p) => {
    if (p === 'minus') {
      if (value < 2) {
        console.log('menor');
      } else {
        setValue(value - 1);
      }
    }
    if (p === 'mas') {
      if (value === 10) {
        console.log('menor');
      } else {
        setValue(value + 1);
      }
    }
  };
  const agregarCompra = () => {
    const newBuy = {
      restaurante: platoSelect.property,
      platoName: platoSelect.name,
      price: platoSelect.price,
      quantity: value,
      total: platoSelect.price * value,
      confirmacion: false,
    };
    console.log(newBuy);
    dispatch(actionAddCompra(newBuy));
    Swal.fire(
      'Tu compra ha sido agregada con exito',
      'que la disfrutes',
      'success'
    );
  };
  return (
    <>
      {platoSelect ? (
        <>
          {' '}
          <div>
            <button
              onClick={() => {
                goBack(platoSelect.property);
              }}
            >
              <strong>{`<`} </strong>{' '}
            </button>
            <span className="platoS">
              <img src={platoSelect.image} />
              <p>{platoSelect.name} </p>
              <p>{platoSelect.price ? platoSelect.price : ''} </p>
            </span>{' '}
          </div>{' '}
          <div className="divbotones">
            <aside className="compraButtons">
              {' '}
              <span
                className="compraButtons_buttons"
                onClick={() => {
                  changeValue('minus');
                }}
              >
                {' '}
                -
              </span>
              <span>{value} </span>
              <span
                className="compraButtons_buttons"
                onClick={() => {
                  changeValue('mas');
                }}
              >
                {' '}
                +
              </span>
            </aside>
            <button className="divbotones_compra" onClick={agregarCompra}>
              {' '}
              <span>Add </span>
              <span>{platoSelect ? value * platoSelect.price : ''} </span>
            </button>
          </div>
          <div className="divbotones">
            <aside className="compraButtons">
              {' '}
              <span
                className="compraButtons_buttons"
                onClick={() => {
                  changeValue('minus');
                }}
              >
                {' '}
                -
              </span>
              <span>{value} </span>
              <span
                className="compraButtons_buttons"
                onClick={() => {
                  changeValue('mas');
                }}
              >
                {' '}
                +
              </span>
            </aside>
            <button className="divbotones_compra" onClick={agregarCompra}>
              {' '}
              <span>Add </span>
              <span>{platoSelect ? value * platoSelect.price : ''} </span>
            </button>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default Plato;
