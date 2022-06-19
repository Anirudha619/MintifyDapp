import {React,useState} from "react";
import { ethers } from 'ethers';
import '../App.css';
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import axiosHttpService from '../services/axioscall';
import NFTMinter from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import "./Mint721.css"
import container from  "../images/container.png";
import { useNavigate } from 'react-router-dom';
import { onFileUpload } from '../contractFunction/erc721function';
import SyncLoader from "react-spinners/SyncLoader";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Mint721() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [minting, setMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
  const errorNotify = (error) => toast.error(error);

  async function submitMint(){
    if(name=="" || description=="" || link=="" || selectedFile == null)errorNotify("please fill all the data before minting")
    else{
      setMinting(true);
      let uri = await onFileUpload(selectedFile,name,description,link).then((res)=>{
          if(res === false){
            console.log("error")
            setMinting(false);
          }
          else{
            console.log(res);
            setTokenURI(res);
            setMinting(false);
            setIsMinted(true);
          }
        }
      )
    }
    
  }
  
  return (
    <div className="dapp-header">
      <Navbar page={0}/>
      {
        !isMinted ?
          <div className= "Container">
          <h3 style={{fontFamily:"Exo" , paddingTop:"5px", marginBottom:"40px" }} >Upload NFT Details</h3>
          
          <div className="gridbox">
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a NFT Art</button>
            <input
                    accept="audio/*, video/*, image/*, .html, .pdf"
                    id="upload-file"
                    type="file"
                    name="myfile"
                    onChange={ (e) => setSelectedFile(e.target.files[0])}
                    required
            />
          </div>
          
          <div className="c2">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={(e)=>setName(e.target.value)} required/>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" onChange={(e)=>setDescription(e.target.value)} required/>
          <label htmlFor="link">External link</label>
          <input type="text" id="link" name="link" onChange={(e)=>setLink(e.target.value)} required/>
          </div>
          </div>
          {
            minting ?
              <><p style={{marginBottom : "0px", marginTop : "0px"}}>Minting...</p><SyncLoader size={15} color="white" /> </>
            :
              <button className= "mint_btn" onClick={submitMint}>
                  Mint
              </button>
          }

        </div>
        :
        <div className= "Container">
          <img src={URL.createObjectURL(selectedFile)} style={{maxWidth : "500px", marginTop : "30px", maxHeight :"400px" }}/>
          <h2>Your NFT minted sucessfully.</h2>
        </div>

      }  
        
        <ToastContainer theme="colored" />
    </div>
  );
}

export default Mint721;
