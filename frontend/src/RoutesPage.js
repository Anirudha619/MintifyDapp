import React from "react";
import { BrowserRouter, Routes, Switch, Route } from "react-router-dom";
import App from "./App";
import Landing from "./Landing";
import Mint721 from "./Components/Mint721";
import Mint1155 from "./Components/Mint1155";
import Mintsingle1155 from "./Components/Mintsingle1155";
import Profile from "./Components/Profile";
import Mintbatch1155 from "./Components/Mintbatch1155";

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Home" element={<App/>} />
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/Mint721" element={<Mint721/>} />
        <Route exact path="/Profile" element={<Profile/>} />
        <Route exact path="/Mint1155" element={<Mint1155/>} />
        <Route exact path="/Mintsingle1155" element={<Mintsingle1155/>} />
        <Route exact path="/Mintbatch1155" element={<Mintbatch1155/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
