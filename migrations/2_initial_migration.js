//variables to map the contracts to useful variables
let Voting = artifacts.require("SimpleSmartContract");
//let erc20 = artifacts.require("erc20");

//module to deploy
module.exports = function(deployer) {
//deploys the exchange contract
  deployer.deploy(Voting);
//deploys the token contract
//  deployer.deploy(erc20);
};