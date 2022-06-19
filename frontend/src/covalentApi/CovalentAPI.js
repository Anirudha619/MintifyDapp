
import axios from "axios";
import {requestAccount, getEthAddress} from "../contractFunction/ethFunction";

console.log(process.env.REACT_APP_covalent_key)
export let getNFTData = async() => {
    let signerAddress = await getEthAddress();
    let { data } = await axios({
      method: 'get',
      url: `https://api.covalenthq.com/v1/80001/address/${signerAddress}/balances_v2/?nft=true&key=${"ckey_0fefa8a6b4fc42e38654efa68bc"}`
      
    });
    const items = data.data.items;
    console.log(items)
    let nft=[]
    if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].nft_data && (items[i].contract_address ==="0xc67f457914869717e8fc128b32464d2376b61d16" || items[i].contract_address ==="0x49c48e5b0e5dabfb53fa43a171b69d403682cfec")) {
            
            for (let j = 0; j < items[i].nft_data.length; ++j) {
              const obj = {};
              let str = items[i].nft_data[j].token_url ;
              str = str.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
              console.log(str);
              const url = new URL(str);
              const response = await fetch(url);
              const result = await response.json();
              let data1 = result.image;
              try{
                data1 = "https://gateway.pinata.cloud/ipfs/"+data1;
                obj.name = result.name;
                obj.image = data1;
                obj.nftType = (items[i].contract_address ==="0xc67f457914869717e8fc128b32464d2376b61d16" ? "ERC 721" : "ERC 1155");
                obj.quantity = items[i].nft_data[j]?.token_balance;
                obj.contract_address = items[i].contract_address;
                obj.token_id = items[i].nft_data[j]?.token_id;
                nft.push(obj);
              }
              catch{
                
              }
              
            }
          } else {
          }
        }
       
      }
      console.log(nft);
      return nft;

  }