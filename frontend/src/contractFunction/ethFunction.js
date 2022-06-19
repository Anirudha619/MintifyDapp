import { ethers } from 'ethers';

export const requestAccount = async () => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
    });
    await window.ethereum.request({ method: "eth_requestAccounts"});
};
  
export const getEthAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    return await signer.getAddress();
};

export const isConnected = async () => {
    let connectionStatus = await window.ethereum.isConnected();
    return connectionStatus;
  };