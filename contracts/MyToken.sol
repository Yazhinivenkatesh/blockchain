pragma solidity ^0.8.2;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract MyToken is ERC20 {
//     constructor(string memory name_, string memory symbol_)
//     ERC20(name_,symbol_) public
//     {

//     }
//     function mint(address to, uint256 amount) public {
//         _mint(to, amount);
//     }
// }

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}