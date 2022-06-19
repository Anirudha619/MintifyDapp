import {React,useState,useEffect} from "react";
import { ethers } from 'ethers';
import "./Profile.css"
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import {getNFTData} from "../covalentApi/CovalentAPI";


function Profile() {
  const [nft, setNFT] = useState([{image:""}]);

  let navigate = useNavigate();

  function handlePage(page){
    navigate(`/Mint721`);
  }

  

  useEffect(() => {
    const getNFT = async() => {
        let nftdata = await getNFTData();
        setNFT(nftdata)
      }
       getNFT()
    }, []);
  
  return (
    <div className="profile-header">
        <Navbar page={1}/>
        <h2 >Your NFT's</h2>
        {/* <button onClick={getNFT}>GET</button> */}
        <div className="cardgrid">
        {
            nft[0].image==="" 
            ? 
                <h3></h3> 
            :  
                nft.map((nfts,i)=>{
                    return(
                        <div className="card" key = {i}>
                            <div className="image"><img src={nfts.image} key={i} style={{maxWidth : "290px", maxHeight :"330px" }}/></div>
                            <h4 style={{margin:"0"}}>Name : {nfts.name}</h4>
                            <h4 style={{margin:"0"}}>Type : {nfts.nftType}</h4>
                            <h4 style={{margin:"0"}}>Quantity : {nfts.quantity}</h4>
                            <button className="opensea" onClick={()=>window.open(`https://testnets.opensea.io/assets/mumbai/${nfts.contract_address}/${nfts.token_id}`)} >Opensea</button>
                        </div>)
                })
        }
        </div>
    </div>
  );
}

export default Profile;
