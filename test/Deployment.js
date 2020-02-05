const SimpleSmartContract = artifacts.require('SimpleSmartContract');

contract('SimpleSmartContract', () => {
	it('Deployment test', async() =>{
		const simpleSmartContract = await SimpleSmartContract.deployed();
		assert(simpleSmartContract.address != '');
		console.log(simpleSmartContract.address);
	});

}
);