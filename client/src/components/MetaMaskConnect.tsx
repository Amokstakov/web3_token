import { ethers } from "ethers";

const MetaMaskConnect = ({ setAccount }) => {
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setAccount(accounts[0]);

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 p-2"
        onClick={connectWallet}
      >
        Connect Meta Mask Wallet
      </button>
    </div>
  );
};

export default MetaMaskConnect;
