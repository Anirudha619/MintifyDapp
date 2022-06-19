import {React,useState} from "react";
import { ethers } from 'ethers';
import '../App.css';
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import axiosHttpService from '../services/axioscall';
import NFTMinter from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import "./Minttype.css"
import container from  "../images/container.png";
import { useNavigate } from 'react-router-dom';

const NFTMinterAddress = "0xc67F457914869717E8fC128b32464D2376B61d16";
const NFTMinter1155Address = "0x49C48e5B0E5Dabfb53Fa43A171b69D403682CFEc";

function Minttype() {
  
  let navigate = useNavigate();


  function handlePage(page){
    if (page === 0)navigate(`/Mint721`);
    else navigate(`/Mint1155`);
  }
  
  return (
    <div className="dapp"> 
      
        <div className= "Container">
            <h1 style={{fontFamily:"Exo" , paddingTop:"10px", marginBottom:"100px" }} >Select NFT Type</h1>

            <button className= "button_721" onClick={()=>handlePage(0)}>
                <h1 >ERC 721</h1>
                <h3>NFTs minted using this standard are unique, transferable and can only be owned by one wallet at a time</h3>
            </button>

            <button className= "button_1155" onClick={()=>handlePage(1)}>
                <h1 >ERC 1155</h1>
                <h3>NFTs minted using this standard can have multiple quantity and transferable</h3>
            </button>

        </div>
      
    </div>
  );
}

export default Minttype;
