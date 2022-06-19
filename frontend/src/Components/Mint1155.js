import {React,useState} from "react";
import { ethers } from 'ethers';
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import axiosHttpService from '../services/axioscall';
import NFTMinter from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
// import "./Mint1155.css"
import container from  "../images/container.png";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

const NFTMinterAddress = "0xc67F457914869717E8fC128b32464D2376B61d16";
const NFTMinter1155Address = "0x49C48e5B0E5Dabfb53Fa43A171b69D403682CFEc";

function Mint1155() {
  
  let navigate = useNavigate();


  function handlePage(page){
    if (page === 0)navigate(`/Mintsingle1155`);
    else navigate(`/Mintbatch1155`);
  }
  
  return (
    <div className="dapp-header">
        <Navbar page={0}/> 
      
        <div className= "Container">
            <h1 style={{fontFamily:"Exo" , paddingTop:"10px", marginBottom:"100px" }} >Select NFT Type</h1>

            <button className= "button_721" onClick={()=>handlePage(0)}>
                <h1 >Single Mint</h1>
                <h3>One NFT is minted at a time.</h3>
            </button>

            <button className= "button_1155" onClick={()=>handlePage(1)}>
                <h1 >Batch Mint</h1>
                <h3>Multiple NFT's are minted at a time.</h3>
            </button>

        </div>
      
    </div>
  );
}

export default Mint1155;
