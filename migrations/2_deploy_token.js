const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
    //const name_ = "My Token";
    //const symbol_ = "MTK";
    //const decimals_ = 18;
  deployer.deploy(MyToken);
};
//await token.mint('0x46b68a577f95d02d2732cbe93c1809e9ca25b443','1000000000000000000000')
