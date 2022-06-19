import {React,useState} from "react";
import { ethers } from 'ethers';
import logo from './logo.svg';
import './Landing.css';
import { uploadFileToIPFS , pinJSONToIPFS} from './services/PinataIPFSOptions';
import axiosHttpService from './services/axioscall';
import NFTMinter from "./artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import NFTMinter1155 from "./artifacts/contracts/NFTMinter1155.sol/NFTMinter1155.json";
import Minttype from "./Components/Minttype";
import Navbar from "./Components/Navbar";
import blur from  "./images/blur.png";
import main from  "./images/main.png";
import MINTIFY from  "./images/MINTIFY.png";
import title from  "./images/title.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Landing() {
  let navigate = useNavigate();

  function loadDapp(){
    navigate(`/Home`);
  }
   
  return (
    <div className="App-header">
      <div className="grid-land">
          <div className="left">
            <img src={MINTIFY} style={{width:"160px", marginBottom:"50px"}}/>
            <img src={title} style={{width:"500px"}}/>
            <p style={{width:"500px", marginTop : "25px"}}>Mint NFT’s of ERC 721 and ERC1155 on polygon in one single platform.</p>
            <button className="loadbtn" onClick={loadDapp}>Load DAPP</button>
          </div>
          <div className="right" style={{width:"300px", height :"500px"}} >

            <img src={main} style={{width:"400px", marginTop:"40px"}}/>
          </div>
      </div>
    </div>
  );
}

export default Landing;
