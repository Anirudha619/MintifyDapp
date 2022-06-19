import { ethers } from 'ethers';
import {requestAccount, getEthAddress} from "./ethFunction";
import { uploadFileToIPFS , pinJSONToIPFS} from '../services/PinataIPFSOptions';
import axiosHttpService from '../services/axioscall';
import NFTMinter1155 from "../artifacts/contracts/NFTMinter1155.sol/NFTMinter1155.json";
import axios from "axios";

const NFTMinterAddress = "0xc67F457914869717E8fC128b32464D2376B61d16";
const NFTMinter1155Address = "0x49C48e5B0E5Dabfb53Fa43A171b69D403682CFEc";

async function mint_NFT1155(userAddress,tokenURI,supply) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTMinter1155Address, NFTMinter1155.abi, signer);
      const transaction = await contract.batchMint(userAddress,tokenURI,supply);
      await transaction.wait();
      return true
    }
  }

  export async function onFileUpload (file,name,description,external_url,supply) {
    let tokenURIList=[];
    try {
        for(let i = 0  ; i<file.length ; i++){
            let ipfsUploadRes = await axiosHttpService(uploadFileToIPFS(file[i]));
            console.log(ipfsUploadRes);
            //make metadata
            const metadata = new Object();
            metadata.image = ipfsUploadRes.res.IpfsHash;
            metadata.description = description[i];
            metadata.name = name[i];
            metadata.external_url = external_url[i]
            
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
            tokenURIList.push(tokenURI)
        }
        

        let userAddress = await getEthAddress();

        let tx = await mint_NFT1155(userAddress,tokenURIList,supply);
        return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };