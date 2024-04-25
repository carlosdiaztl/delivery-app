import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, dataBase } from '../../Firebase/firebaseConfig';
import {
  actionBorrarTodo,
  actionDeleteCompra,
} from '../../redux/actions/comprasActions';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import Footer from '../home/footer/Footer';
import './style.scss';

const Recientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.userStore);
  const comprasStore = useSelector((store) => store.comprasStore);
  const [isEdit, setIsEdit] = useState(false);
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.displayName) {
        navigate(`/createaccount/${user.uid}`);
      }
    });
  }, []);

  const deleteItem = (index) => {
    const compra = [...comprasStore];
    compra.splice(index, 1);
    dispatch(actionDeleteCompra(compra));
  };

  const deleteAll = () => {
    dispatch(actionBorrarTodo());
  };

  const verCompras = async () => {
    const comprasTotales = [];
    const userCollection = collection(dataBase, 'compras');
    const querySnapshot = await getDocs(userCollection);

    querySnapshot.forEach((doc) => {
      comprasTotales.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setCompras(comprasTotales);
    setIsEdit(!isEdit);
  };

  const confirmBuy = () => {
    Swal.fire('Sus compras han sido recibidas', '', 'success');
  };

  return (
    <>
      {userStore && userStore.admin ? (
        <div>
          <button onClick={verCompras}>Ver historial de compras</button>
        </div>
      ) : (
        <div className="recientes">
          <h3>Recientes</h3>
          <button onClick={deleteAll}>Vaciar carrito</button>
          <button onClick={confirmBuy}>Confirmar compras</button>
          {comprasStore.length ? (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Restaurante</th>
                    <th>Plato</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {comprasStore.map((item, index) => (
                    <tr key={index}>
                      <td>{item.restaurante}</td>
                      <td>{item.platoName}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>${item.total}</td>
                      <td>
                        <span onClick={() => deleteItem(index)}>
                          {item.confirmacion ? 'Confirmado' : 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => deleteItem(index)}>
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h3>Tu lista está vacía, compra algo primero</h3>
          )}
        </div>
      )}
      {isEdit && userStore.admin
        ? ''
        : compras.map((item, index) => (
            <div className="comprasU" key={index}>
              <span>ID Compra: {item.id}</span>
              <span>Valor: {item.compra.valor}</span>
              <span>Producto: {item.compra.producto}</span>
              <span>{item.compra.restaurante}</span>
              <span>Cantidad: {item.compra.cantidad}</span>
            </div>
          ))}
      <Footer />
    </>
  );
};

export default Recientes;
