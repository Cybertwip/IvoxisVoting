const Ballot = artifacts.require('Ballot');
const ERC20 = artifacts.require('MICE');


function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

contract('Ballot', () => {
	it('Deployment test', async() =>{
		const ballot = await Ballot.deployed();
		const erc20 = await ERC20.deployed();

		let accounts = await web3.eth.getAccounts();

		await ballot.setERC20ContractAddress(erc20.address);
		await ballot.setProposal(web3.utils.asciiToHex('New Ivoxis proposal'));
		
		sleep(1);


		await ballot.vote(0, {from: accounts[0]});

		let proposals = await ballot.getProposals();

		for (var i = 0; i < proposals.length; i++) {
			let proposal = proposals[i];

			console.log(web3.utils.hexToAscii(proposal.name));
			console.log(web3.utils.fromWei(proposal.noVoteCount));
			console.log(proposal.yesVoteCount);
		}

		await ballot.setProposal(web3.utils.asciiToHex('New Ivoxis proposal2'));
		await ballot.vote(0, {from: accounts[0]});

		proposals = await ballot.getProposals();

		for (var i = 0; i < proposals.length; i++) {
			let proposal = proposals[i];

			console.log(web3.utils.hexToAscii(proposal.name));
			console.log(web3.utils.fromWei(proposal.noVoteCount));
			console.log(proposal.yesVoteCount);
		}
		
		web3.eth.defaultAccount = web3.eth.accounts[0];

		let voters = await ballot.getVoters(0);

		console.log(voters);

	});

}
);