import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC721A", function () {
  it("mint", async() => {
    const ERC721A = await ethers.getContractFactory("ERC721AMock");
    const erc721A = await ERC721A.deploy("Trip", "TRIP");
    await erc721A.deployed();
    const [owner] = await ethers.getSigners();
    await erc721A.safeMint(owner.address, 1, "aaa");
    const balance = await erc721A.balanceOf(owner.address);
    const supply = await erc721A.totalSupply();
    const ownership = await erc721A.ownerOf(0);
    expect(owner.address).to.eq(ownership);
    const uri = await erc721A.tokenURI(0);
    console.log(uri);
  })
});