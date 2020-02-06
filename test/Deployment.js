const SimpleSmartContract = artifacts.require('Ballot');

contract('Ballot', () => {
	it('Deployment test', async() =>{
		const simpleSmartContract = await SimpleSmartContract.deployed();
		assert(simpleSmartContract.address != '');

		let proposals = await simpleSmartContract.getProposals();

		for (var i = 0; i < proposals.length; i++) {
			let proposal = proposals[i];

			console.log(web3.utils.hexToAscii(proposal.name));
		}

	});

}
);