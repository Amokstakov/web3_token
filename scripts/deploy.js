const Ethers = require("ethers");
const ethers = Ethers.ethers;

const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("MelkeyToken");
  const TokenContract = await ContractFactory.deploy();
  await TokenContract.deployed();
  console.log("Contract deployed to:", TokenContract.address);

  owner = await TokenContract.getOwner();
  console.log(owner.from);

  // mint some tokens
  const txn = await TokenContract.mint(
    owner.from,
    ethers.utils.parseUnits("1000", 18)
  );
  await txn.wait();

  // check supply
  totalSupply = await TokenContract.totalSupply();
  console.log("Supply", totalSupply);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
