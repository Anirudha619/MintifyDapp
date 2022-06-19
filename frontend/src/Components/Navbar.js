import {React,useState} from "react";
import { ethers } from 'ethers';
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import { requestAccount, isConnected} from '../contractFunction/ethFunction';


function Navbar({page}) {
    const [connection, setConnection] = useState(false);
    async function connectWallet(){
        await requestAccount();
        setConnection(true);
    }
    
    let navigate = useNavigate();

    function handlePage(page){
      if(page===0)
      navigate(`/Profile`);
      else 
      navigate(`/Home`);
    }

  return (
    <div className="nav">
        
        <button className="profile" onClick={()=>handlePage(page)}>{page===0 ? "Profile" : "Home"}</button>
        <button className="wallet" onClick={connectWallet}>Connect Wallet</button>
        
    </div>
  );
}

export default Navbar;
