import { ethers } from 'ethers';
import {requestAccount, getEthAddress} from "./ethFunction";
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import axiosHttpService from '../services/axioscall';
import NFTMinter from "../artifacts/contracts/NFTMinter.sol/NFTMinter.json";
import axios from "axios";

const NFTMinterAddress = "0xc67F457914869717E8fC128b32464D2376B61d16";
const NFTMinter1155Address = "0x49C48e5B0E5Dabfb53Fa43A171b69D403682CFEc";

async function mint_NFT(userAddress,tokenURI) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTMinterAddress, NFTMinter.abi, signer);
      const transaction = await contract.mint(userAddress,tokenURI);
      await transaction.wait();
      return true
    }
  }

  export async function onFileUpload (file,name,description,external_url) {
    try {
      console.log("Upload called"); 
      let ipfsUploadRes = await axiosHttpService(uploadFileToIPFS(file));
      console.log(ipfsUploadRes);
      //make metadata
      const metadata = new Object();
      metadata.image = ipfsUploadRes.res.IpfsHash;
      metadata.description = description;
      metadata.name = name;
      metadata.external_url = external_url
    
      //make pinata call
      const pinataResponse = await pinJSONToIPFS(metadata);
      if (!pinataResponse.success) {
          return {
              success: false,
              status: "😢 Something went wrong while uploading your tokenURI.",
          }
      } 
      const tokenURI = "ipfs://"+pinataResponse.hash;  
      console.log(tokenURI);

      let userAddress = await getEthAddress();
      console.log(userAddress)
      let tx = await mint_NFT(userAddress,tokenURI);
      return "https://gateway.pinata.cloud/ipfs/"+ipfsUploadRes.res.IpfsHash;
    } catch (error) {
      console.log(error);
      return false;
    }
  };