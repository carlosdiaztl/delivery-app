import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carousel from "../components/home/carousel/carousel";
import Home from "../components/home/Home";
import Intro from "../components/home/intro/Intro";
import Login from "../components/loginAndReguster/Login";
import Register from "../components/loginAndReguster/Register";
import Perfil from "../components/perfil/Perfil";
import Recientes from "../components/recientes/Recientes";
import Search from "../components/search/Search";
import '../style.scss'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/intro" element={<Carousel/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/recientes" element={<Recientes/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
