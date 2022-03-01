/*

  << TestERC20 >>

*/
//SPDX-License-Identifier: Unlicense

pragma solidity 0.7.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20("test", "TST") {

    /**
     */
    constructor () public {
    }

    /**
     */
    function mint(address to, uint256 value) public returns (bool) {
        _mint(to, value);
        return true;
    }

}
