import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Carousel from "../components/home/carousel/carousel";
import Home from "../components/home/Home";
import Intro from "../components/home/intro/Intro";
import Login from "../components/loginAndReguster/Login";
import Register from "../components/loginAndReguster/Register";
import '../style.scss'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/intro" element={<Carousel/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
