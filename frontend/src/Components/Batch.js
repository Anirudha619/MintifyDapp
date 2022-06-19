import {React,useState} from "react";
import { ethers } from 'ethers';
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import NFTMinter from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import "./Mintbatch1155.css"
import container from  "../images/container.png";
import { useNavigate } from 'react-router-dom';
import { onFileUpload } from '../contractFunction/erc1155function';
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Batch({handleChange}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isFinish, setisFinish] = useState(false);
    const [supply, setSupply] = useState("");
    const errorNotify = (error) => toast.error(error);

    function submit(){
      if(name=="" || description=="" || link=="" || supply =="" || selectedFile == null)errorNotify("please fill all the data")
      else{
        setisFinish(true)
        handleChange(name,description,link,supply,selectedFile,true)

      }
    }
  
  return (
    <div className="dapp-">
        
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
          <label htmlFor="supply">Supply</label>
          <input type="text" id="supply" name="supply" onChange={(e)=>setSupply(e.target.value)} required/>
          </div>
          </div>
          {
            isFinish ?
                ""
            :
                <button className= "mint_btn" style={{marginLeft: "600px"}} onClick={submit}>
                    Finish
                </button>
            }

        </div>
      <ToastContainer theme="colored" />
       
      
    </div>
  );
}

export default Batch;
