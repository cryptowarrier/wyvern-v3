import { expect } from "chai";
import { ethers } from "hardhat";

const hardhatChainId = 31337;
const personalSignPrefix = "\x19Ethereum Signed Message:\n";

export async function deployContracts () {
  const WyvernAtomicizer = await ethers.getContractFactory("WyvernAtomicizer");
  const wyvernAtomicizer = await WyvernAtomicizer.deploy();
  await wyvernAtomicizer.deployed();

  const WyvernStatic = await ethers.getContractFactory("WyvernStatic");
  const wyvernStatic = await WyvernStatic.deploy(
    wyvernAtomicizer.address
  );
  await wyvernStatic.deployed();

  const StaticMarket = await ethers.getContractFactory("StaticMarket");
  const staticMarket = await StaticMarket.deploy();
  await staticMarket.deployed();

  const WyvernRegistry = await ethers.getContractFactory("WyvernRegistry");
  const wyvernRegistry = await WyvernRegistry.deploy();
  await wyvernRegistry.deployed();

  const WyvernExchange = await ethers.getContractFactory("WyvernExchange");
  const wyvernExchange = await WyvernExchange.deploy(
    hardhatChainId,
    [wyvernRegistry.address],
    Buffer.from(personalSignPrefix, 'binary')
  );
  await wyvernRegistry.grantInitialAuthentication(wyvernExchange.address);
  return {
    atomicizer: wyvernAtomicizer,
    static: wyvernStatic,
    staticMarket: staticMarket,
    registry: wyvernRegistry,
    exchange: wyvernExchange
  }
}
