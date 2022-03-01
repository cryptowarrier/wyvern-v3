/*

  << TestERC1155 >>

*/
//SPDX-License-Identifier: Unlicense

pragma solidity 0.7.5;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TestERC1155 is ERC1155("http://test/{id}.json") {

	/**
	 */
	constructor () public {
	}

	function mint(address to, uint256 tokenId) public returns (bool) {
		_mint(to, tokenId, 1, "");
		return true;
	}

	function mint(address to, uint256 tokenId, uint256 amount) public returns (bool) {
		_mint(to, tokenId, amount, "");
		return true;
	}
}
