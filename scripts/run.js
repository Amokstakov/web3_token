const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("MelkeyToken");
  const TokenContract = await ContractFactory.deploy();
  await TokenContract.deployed();
  console.log("Contract deployed to:", TokenContract.address);

  totalSupply = await TokenContract.totalSupply();
  console.log("Initial supply", totalSupply);

  owner = await TokenContract.getOwner();
  console.log(owner.from);

  // mint some tokens
  await TokenContract.mint(owner.from, 1000);

  // check supply
  totalSupply = await TokenContract.totalSupply();
  console.log("After minting supply", totalSupply);
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
