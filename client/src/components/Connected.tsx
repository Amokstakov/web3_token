import { ethers } from "ethers";
import abi from "../utils/abi.json";
import { useForm } from "react-hook-form";
import { useState, useCallback, useRef } from "react";

export interface iTransfer {
  address: string;
  amount: number;
}

const Connected = ({ currentAccount }) => {
  const [transferTo, setTransferTo] = useState("");
  const [transferState, setTransferState] = useState<iLogin>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const getBalance = async () => {
    const contractAddress = "0x15D931951607056E398aa592Fb1c4793a01AB526";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const PortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const waveTxn = await PortalContract.balanceOf(currentAccount);
        const decimals = ethers.BigNumber.from(10).pow(18);
        const display = waveTxn.div(decimals);

        console.log("mining", display.toString());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const transfer = async (address, amount) => {
    const contractAddress = "0x15D931951607056E398aa592Fb1c4793a01AB526";
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const PortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const decimals = ethers.BigNumber.from(10).pow(18);
        const amountBig = ethers.BigNumber.from(amount);
        const display = amountBig.mul(decimals);
        const waveTxn = await PortalContract.transfer(address, display);
        await waveTxn.wait();
        console.log("Transferred!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: any) => {
    const { address, amount } = data;
    transfer(address, amount);
    reset();
  };

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;

    setTransferState((state: any) => ({
      ...state,
      [id]: value,
    }));
  }, []);

  const transferTokens = () => {};

  const openTransfer = () => {
    setTransferTo(!transferTo);
  };

  return (
    <div>
      <div>
        <div>
          <button
            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 p-2"
            onClick={openTransfer}
          >
            Transfer
          </button>
          {transferTo && (
            <div className="justify-center items-center">
              <div className="">
                <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex space-x-2">
                    <input
                      className="w-2/3 bg-gray-100 px-4 py-2"
                      type="text"
                      name="address"
                      id="address"
                      {...register("address")}
                      value={transferState?.address}
                      placeholder="Wallet Address"
                    />
                    <input
                      className="w-1/3 bg-gray-100 px-4 py-2"
                      type="text"
                      name="amount"
                      id="amount"
                      {...register("amount")}
                      value={transferState?.amount}
                      placeholder="Amount"
                    />
                  </div>
                  <button
                    type="submit"
                    className="break-all w-1/2 mt-2 bg-blue-600 p-2 text-sm text-white tracking-wide font-semibold font-sans mb-4 hover:bg-blue-700 "
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4 p-2"
            onClick={getBalance}
          >
            Check Balance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connected;
