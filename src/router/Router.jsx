import { onAuthStateChanged, ProviderId } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeVerificaction from "../components/CodeVerificaction";
import CreateAccount from "../components/CreateAccount";
import Home from "../components/home/Home";
import SignIn from "../components/SignIn";
import { auth,dataBase } from "../Firebase/firebaseConfig";
import { actionSignPhoneSync } from "../redux/actions/userActions";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import Intro from "../components/home/intro/Intro";
import Carousel from '../components/home/carousel/carousel'
import AddRestaurant from "../components/AddRestaurant";
import Search from "../components/search.jsx/Search";
import Recientes from "../components/recientes/Recientes";
import Perfil from "../components/perfil/Perfil";
import Restaurantes from "../components/restaurantes/Restaurantes";
import AddPlato from "../components/addPlato/AddPlato";
import Plato from "../components/plato/Plato";
import { doc,addDoc,updateDoc,collection,getDocs, setDoc,getDoc } from "firebase/firestore";
const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [check, setCheck] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  // user?.uid

  const traerInfo= async(uid,accessToken)=>{
    const docRef=doc(dataBase,`usuarios/${uid}`)
    const docu= await getDoc(docRef)
    const dataFinal= docu.data()
    console.log(uid);
   console.log(dataFinal);
   dispatch(
    actionSignPhoneSync({
      name: dataFinal.name,
      email:dataFinal.email,
      accessToken,
      phoneNumber:dataFinal.phoneNumber,
      avatar: dataFinal.avatar,
      uid,
      admin:dataFinal.admin,
      error: false,
      address:dataFinal.address
    })
  );
   
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setCheck(false);
      if (user?.auth.currentUser) {
        if (Object.entries(userStore).length === 0) {
          const {
            displayName,
            email,
            phoneNumber,
            accessToken,
            photoURL,
            uid,
          } = user.auth.currentUser;

        traerInfo(uid,accessToken)

          
        }
      }
    });
  }, [setIsLoggedIn, check]);
  if (check) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter isAuthentication={isLoggedIn} />}>
          <Route path="/" element={<Intro />} />
          <Route path="/intro" element={<Carousel/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/verification" element={<CodeVerificaction />} />
          
        </Route>
        <Route element={<PrivateRouter isAuthentication={isLoggedIn} />}>
        <Route path="/createaccount/:uid" element={<CreateAccount />} />
        
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/recientes" element={<Recientes/>} />
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/addRestaurant" element={<AddRestaurant/>} />
          <Route path="/restaurante:name" element={<Restaurantes/>} />
          <Route path="/addPlato" element={<AddPlato/>} />
          <Route path="/plato:name" element={<Plato/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
