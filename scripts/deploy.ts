// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { utils } from 'ethers'

const personalSignPrefix = "\x19Ethereum Signed Message:\n";

async function main() {
  const [owner, addr1] = await ethers.getSigners();

  // const ERC721A = await ethers.getContractFactory("ERC721AMock");
  // const erc721A = await ERC721A.deploy("Trip", "TRIP");
  // await erc721A.deployed();
  // console.log("erc721A:", erc721A.address);
  const ERC20 = await ethers.getContractFactory("TestERC20");
  const erc20 = await ERC20.deploy();
  await erc20.deployed();
  console.log("erc20: ", erc20.address);
  await erc20.mint(owner.address, utils.parseEther("1000000"));

  // const WyvernAtomicizer = await ethers.getContractFactory("WyvernAtomicizer");
  // const wyvernAtomicizer = await WyvernAtomicizer.deploy();
  // await wyvernAtomicizer.deployed();
  // console.log("atomicizer:",wyvernAtomicizer.address);

  // const WyvernStatic = await ethers.getContractFactory("WyvernStatic");
  // const wyvernStatic = await WyvernStatic.deploy(
  //   wyvernAtomicizer.address
  // );
  // await wyvernStatic.deployed();
  // console.log("static:", wyvernStatic.address);

  // const StaticMarket = await ethers.getContractFactory("StaticMarket");
  // const staticMarket = await StaticMarket.deploy();
  // await staticMarket.deployed();
  // console.log("staticMarket:", staticMarket.address);

  // const WyvernRegistry = await ethers.getContractFactory("WyvernRegistry");
  // const wyvernRegistry = await WyvernRegistry.deploy();
  // await wyvernRegistry.deployed();
  // console.log("registry:", wyvernRegistry.address)

  // const WyvernExchange = await ethers.getContractFactory("WyvernExchange");
  // const wyvernExchange = await WyvernExchange.deploy(
  //   97,
  //   [wyvernRegistry.address, owner.address],
  //   Buffer.from(personalSignPrefix, 'binary')
  // );
  // await wyvernExchange.deployed();
  // console.log("exchange:", wyvernExchange.address);
  // console.log(Buffer.from(personalSignPrefix, 'binary'));
  // await wyvernRegistry.grantInitialAuthentication(wyvernExchange.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
