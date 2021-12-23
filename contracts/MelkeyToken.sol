// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MelkeyToken is ERC20("MelkeyToken", "MELK"), Ownable {
    function mint(address _to, uint256 _amount) external onlyOwner {
        _mint(_to,_amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function getOwner() external returns(address) {
        return msg.sender;
    }
}
