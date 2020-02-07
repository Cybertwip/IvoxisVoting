//variables to map the contracts to useful variables
let Ballot = artifacts.require("Ballot");
let ERC20 = artifacts.require("MICE");

//module to deploy
module.exports = function(deployer) {
//deploys the exchange contract
  deployer.deploy(Ballot);
//deploys the token contract
  deployer.deploy(ERC20, 250000, "IVOX", "IVOX");
};