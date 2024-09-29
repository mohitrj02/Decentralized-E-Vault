import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from './ABI.json'; // Import the ABI file

const CONTRACT_ADDRESS = '0xC148A616E3Fe4ef2Bea7D1AB45cE40C05789cCc3'; // Replace with your deployed contract address
const RPC_URL = 'https://rpc-amoy.polygon.technology/'; // Amoy RPC URL

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeProvider = () => {
      const tempProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
      setProvider(tempProvider);
    };

    initializeProvider();
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await tempProvider.send('eth_requestAccounts', []);
        setProvider(tempProvider);
        setAccount(accounts[0]);
        const tempContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, tempProvider.getSigner());
        setContract(tempContract);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  useEffect(() => {
    const handleChainChanged = (chainId) => {
      window.location.reload(); // Reload the page to ensure correct network settings
    };

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts[0]);
    };

    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <WalletContext.Provider value={{ provider, contract, account, connectMetaMask, loading }}>
      {children}
      <div style={{ marginTop: '20px' }}>
        <button onClick={connectMetaMask} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect MetaMask'}
        </button>
        {account && <p>Connected as: {account}</p>}
      </div>
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
