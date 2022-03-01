import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

import { deployContracts } from './fixture';
import { parseEther } from "ethers/lib/utils";


describe("WyvernRegistry", function () {
  let watomicizer: Contract;
  let wstatic: Contract;
  let wstaticMarket: Contract;
  let wregistry: Contract;
  let wexchange: Contract;
  let owner: any;
  this.beforeEach(async() => {
    const contracts = await deployContracts();
    watomicizer = contracts.atomicizer;
    wstatic = contracts.static;
    wstaticMarket = contracts.staticMarket;
    wregistry = contracts.registry;
    wexchange = contracts.exchange;
    [owner] = await ethers.getSigners();
  });

  it('does not allow additional grant', async () => {
    await expect(wregistry.grantInitialAuthentication(wregistry.address)).to.be.revertedWith(
      "Wyvern Protocol Proxy Registry initial address already set"
    );
  });

  it('allows proxy registration',async () => {
    await wregistry.registerProxy();
    const proxy = await wregistry.proxies(owner.address);
    expect(proxy.length > 0).to.be.true;
  });

  it('allows proxy override',async () => {
    await wregistry.registerProxyOverride();
    const proxy = await wregistry.proxies(owner.address)
    expect(proxy.length > 0).to.be.true;
  });

  it('allows proxy upgrade',async () => {
    await wregistry.registerProxy();
    const proxy = await wregistry.proxies(owner.address);
    const contract = await ethers.getContractAt("OwnableDelegateProxy", proxy);
    const implementation = await wregistry.delegateProxyImplementation();
    await expect(contract.upgradeTo(wregistry.address)).to.be.ok;
    await expect(contract.upgradeTo(implementation)).to.be.ok;
  });

  it('allows proxy to receive ether',async () => {
    const proxy = await wregistry.proxies(owner.address);
    await expect( owner.sendTransaction({to: proxy, value: parseEther("1")})).to.be.ok;
  })

});