import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeVerificaction from "../components/CodeVerificaction";
import CreateAccount from "../components/CreateAccount";
import Home from "../components/home/Home";
import SignIn from "../components/SignIn";
import { auth } from "../Firebase/firebaseConfig";
import { actionSignPhoneSync } from "../redux/actions/userActions";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import Intro from "../components/home/intro/Intro";
import Carousel from '../components/home/carousel/carousel'
import AddRestaurant from "../components/AddRestaurant";
import Search from "../components/search.jsx/Search";
import Recientes from "../components/recientes/Recientes";
import Perfil from "../components/perfil/Perfil";
const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [check, setCheck] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  // user?.uid
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
          dispatch(
            actionSignPhoneSync({
              name: displayName,
              email,
              accessToken,
              phoneNumber,
              avatar: photoURL,
              uid,
              error: false,
            })
          );
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
