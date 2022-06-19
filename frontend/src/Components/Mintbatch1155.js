import {React,useState} from "react";
import { ethers } from 'ethers';
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import NFTMinter from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import "./Mintbatch1155.css";
import Batch from "./Batch"
import container from  "../images/container.png";
import { useNavigate } from 'react-router-dom';
import { onFileUpload } from '../contractFunction/erc1155batchfunction';
import SyncLoader from "react-spinners/SyncLoader";
import Navbar from "./Navbar";
import success from "../images/success.webp"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Mintbatch1155() {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [link, setLink] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [minting, setMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
  const [supply, setSupply] = useState([]);
  const [nft, setnft] = useState([1]);
  const [finish, setFinish] = useState(false);
  const errorNotify = (error) => toast.error(error);
  
  function addNFT(){
    
    console.log(finish)
    if(finish ===false){
      errorNotify("please finish all the data before adding new NFT")
    }
    else{
      setFinish(false)
      let count = nft.length+1;
      setnft([...nft,count]);
      console.log(count)
    }
  }

  function handleChange(_name,_description,_link,_supply,_selectedFile,_finish){
    setName([...name,_name])
    setDescription([...description,_description])
    setLink([...link,_link])
    setSupply([...supply,_supply])
    setSelectedFile([...selectedFile,_selectedFile])
    setFinish(_finish)
    console.log(_finish)
  }
  console.log(selectedFile)

  async function submitMint(page){
    if(name=="" || description=="" || link=="" || supply =="" || selectedFile == null || finish ===false)errorNotify("please finish all the data before minting")
    else{
      setMinting(true);
      let uri = await onFileUpload(selectedFile,name,description,link,supply).then((res)=>{
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
      { !isMinted ?
      <>
      {
        nft.map((item,i)=>(<Batch key={i} handleChange={handleChange}/>))
      }
      <button className= "add" onClick={addNFT}>
                  Add NFT
      </button>
      {
        minting ?
              <><p style={{marginBottom : "0px", marginTop : "0px"}}>Minting...</p><SyncLoader size={15} color="white" /> </>
            :
              <button className= "mint_btn" onClick={submitMint}>
                  Mint
              </button>
          }
          </>
      :
        <div className= "Container">
          <img src={success} style={{width : "200px", marginTop:"90px"}} />
          <h2>Your NFT minted sucessfully.</h2>
        </div>

      } 
        
        
        
      
    </div>
  );
}

export default Mintbatch1155;
