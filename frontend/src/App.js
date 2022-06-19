import {React,useState} from "react";
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';
import { uploadFileToIPFS , pinJSONToIPFS} from './services/PinataIPFSOptions';
import axiosHttpService from './services/axioscall';
import NFTMinter from "./artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import NFTMinter1155 from "./artifacts/contracts/NFTMinter1155.sol/NFTMinter1155.json";
import Minttype from "./Components/Minttype";
import Navbar from "./Components/Navbar";
import blur from  "./images/blur.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let covalent_key= "ckey_0fefa8a6b4fc42e38654efa68bc"
const NFTMinterAddress = "0xc67F457914869717E8fC128b32464D2376B61d16";
const NFTMinter1155Address = "0x49C48e5B0E5Dabfb53Fa43A171b69D403682CFEc";
console.log(process.env.covalent_key)

async function mint(){
  await mint_NFT("0x23aE63E9b272B8243C5a2296D444556417465865",["ipfs://QmZdUDXv7nbuomtqWMMvVd9gKMHJ4ipSzksbKzV76mAXQW","ipfs://QmVAQYkV9yyVACid2a8YjuKt6V9qF8j3aMVe2o1Ctby3gP"])
}

async function mint_NFT(userAddress,tokenURI) {
    if (typeof window.ethereum !== 'undefined') {
      console.log("hi")
      // await requestAccount()
      console.log("account receive")
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTMinter1155Address, NFTMinter1155.abi, signer);
      const transaction = await contract.batchMint(userAddress,tokenURI,[10,7]);
      await transaction.wait();
      // console.log(`${tokenURI} has minted sucessfully.`);
      // setTokenURI(imageURI)
      return true
    }
  }
// let nft = [];
// async function getWalletBalance( ) {
//   let signerAddress = await getEthAddress();
//   const url = new URL(`https://api.covalenthq.com/v1/137/address/${signerAddress}/balances_v2/?nft=true&key=${covalent_key}`);
//   const response = await fetch(url);
//   const result = await response.json();
//   const data = result.data;
//   console.log(data)
//   const items = data.items;
//       if (items.length > 0) {
//         for (let i = 0; i < items.length; i++) {
//           if (items[i].nft_data) {
//             for (let j = 0; j < items[i].nft_data.length; ++j) {
//               const obj = {};
//               obj.name = items[i].nft_data[j].external_data?.name;
//               obj.image = items[i].nft_data[j].external_data?.image;
//               obj.nftType = items[i].nft_data[j].supports_erc[1];
//               obj.quantity = items[i].nft_data[j]?.token_balance;
//               nft.push(obj);
//             }
//           } else {
//             const obj = {};
//             obj.name = items[i].contract_name;
//             obj.image = items[i].logo_url;
//             obj.nftType = items[i].contract_ticker_symbol;
//             nft.push(obj);
//           }
//         }
//       }
//       console.log(nft);
//       console.log(nft[0].image);
// }






function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [imageURI, setimageURL] = useState("");
   
  // let getData = async() => {
  //   let signerAddress = await getEthAddress();
  //   let { data } = await axios({
  //     method: 'get',
  //     url: `https://api.covalenthq.com/v1/137/address/${signerAddress}/balances_v2/?nft=true&key=${covalent_key}`
      
  //   });
  //   let str = data.data.items[0].nft_data[0].token_url;
  //   str = str.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  //   console.log(str);
  //   const url = new URL(str);
  //   const response = await fetch(url);
  //   const result = await response.json();
  //   let data1 = result.image;
  //   data1 = data1.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  //   console.log(data1)
  //   setimageURL(data1)
  // }

  // const getNFT = async() => {
  //   await getData();
  // }

  

  // async function mint_NFT1155(tokenURI,imageURI,amount) {
  //   if (typeof window.ethereum !== 'undefined') {
  //     await requestAccount()
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(NFTMinter1155Address, NFTMinter1155.abi, signer);
  //     const transaction = await contract.mint(tokenURI,amount);
  //     await transaction.wait();
  //     console.log(`${tokenURI} has minted sucessfully.`);
  //     // setTokenURI(imageURI)
  //   }
  // }

  
  
  return (
    <div className="App-header">
        <Navbar page={0}/>
        <Minttype/>
        {/* <input type="file" style={{maxWidth:"500px"}} onChange={ (event) => setSelectedFile(event.target.files[0]) } className="custom-file-upload" />
        <button onClick={onFileUpload} >Mint</button>
        <button onClick={getNFT} >get NFT</button>
        <img src={imageURI} /> */}
    </div>
  );
}

export default App;
