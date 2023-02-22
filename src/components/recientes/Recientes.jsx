import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, dataBase } from "../../Firebase/firebaseConfig";
import {
  actionBorrarTodo,
  actionCambioConfirm,
  actionDeleteCompra,
} from "../../redux/actions/comprasActions";
import { actionGetPlatosAsync } from "../../redux/actions/platosActions";
import Footer from "../home/footer/Footer";
import "./style.scss";

const Recientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.userStore);
  console.log(userStore);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  const comprasStore = useSelector((store) => store.comprasStore);
  console.log(comprasStore);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);

  const deleteItem = (index) => {
    const compra = [...comprasStore];
    compra.splice(index, 1);
    dispatch(actionDeleteCompra(compra));
    console.log(compra);
    console.log(comprasStore);
  };
const[lista,setLista]=useState([])
  const changeStatus = (index) => {
    console.log(index);
    const compra = [...comprasStore];
    console.log(compra);
    compra[index].confirmacion = !compra[index].confirmacion;
    console.log(compra[index].confirmacion);
    console.log(compra);
    setLista(compra)
    dispatch()
  };
 
 const deleteAll=()=>{
  dispatch(actionBorrarTodo())
 }
 const collectionName = "compras";
 const [compras,setCompras]=useState([])
 const verCompras= async()=>{
  
    const comprasTotales = [];
    const userCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(userCollection);


    querySnapshot.forEach((doc) => {
      comprasTotales.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(comprasTotales);
    setCompras(comprasTotales)
    setIsEdit(!isEdit);
    console.log(isEdit);
  
  console.log('mostando datos ');
 }
 const  confirmBuy=()=>{
  console.log(comprasStore);
  Swal.fire('sus compras han sido recibidas','','success')
  const docRef=doc(dataBase,collectionName)
  
  // updateDoc(docRef, {});
  
 }
 console.log(compras);
  return (
    <> 
    { userStore && userStore.admin ?<div>
    <button onClick={verCompras}> Ver historial de compras </button>
     </div>: 
    <div className="recientes">
      Recientes
      
      <button onClick={deleteAll}> Vaciar carrito</button>
      <button onClick={confirmBuy}> confirmar compras</button>
      {userStore && userStore.adim ?
      
      <span>viendo los datos
      

       </span>:
      <> {comprasStore.length ? (
        comprasStore.map((item, index) => (
          <section key={index}>
            <div>
              {" "}
              <h4> {item.restaurante} </h4>
              <span>{item.platoName} </span>
          <span>{item.price}x </span>
          <span>{item.quantity} </span>
              <button
                onClick={() => {
                  deleteItem(index);
                }}
              >
                {" "}
                Cancelar pedido
              </button>
              <span> {item.total}$ </span>
              <span onClick={() => changeStatus(index)}>
                {" "}
                 pedido{" "}
                {item.confirmacion ? "confirmado" : "sin confirmar"}
              </span>
            </div>
          </section>
        ))
      ) : (
        <h3> Tu lista esta vacia, compra algo primero </h3>
      )}</>}
    </div>
    }
    {
      isEdit && userStore.admin?"":
      compras.map((item,index)=>(
        <section className="comprasU" key={index} >
        
      <span> id compra:{item.id} </span>
       <span>valor:{item.compra.valor}</span>
       <span>producto:{item.compra.producto}  </span>
       <span>{item.compra.restaurante}</span>
       <span>Cantidad: {item.compra.cantidad} </span>
        
        </section>
      ))
    }
      <Footer />
    
    </>
  );
};

export default Recientes;
