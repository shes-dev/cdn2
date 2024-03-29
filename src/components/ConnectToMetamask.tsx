import { useState, useEffect } from "react";
import { ethers } from "ethers";
import React from "react";

export default function ConnectToMetamask() {
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const [isConnected, setIsConnected] = useState(false);

  //@ts-ignore
  const { ethereum } = window;

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider =
    //@ts-ignore
    window.ethereum != null
      ? //@ts-ignore
        new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  useEffect(() => {
    //@ts-ignore
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);

      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            ) : (
              <></>
            )}

            {isConnected ? (
              <p className="info">🎉 Connected Successfully</p>
            ) : (
              <button className="btn" onClick={connectWallet}>
                Connect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
}
