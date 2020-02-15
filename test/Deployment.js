const Ballot = artifacts.require('Ballot');
const ERC20 = artifacts.require('MICE');

const BallotABI =  [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined
    },
    {
      anonymous: false,
      inputs: [Array],
      name: 'OwnerSet',
      type: 'event',
      constant: undefined,
      payable: undefined,
      signature: '0x342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a735'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'changeOwner',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xa6f9dae1'
    },
    {
      constant: true,
      inputs: [],
      name: 'getOwner',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x893d20e8'
    },
    {
      constant: true,
      inputs: [Array],
      name: 'proposals',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x013cf08b'
    },
    {
      constant: true,
      inputs: [Array],
      name: 'voters',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x9e319063'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'setERC20ContractAddress',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xac4a231d'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'setProposal',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x70a53748'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'vote',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x0121b93f'
    },
    {
      constant: true,
      inputs: [],
      name: 'getProposals',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x62564c48'
    }
  ];

const ERC20ABI = [
    {
      inputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined
    },
    {
      anonymous: false,
      inputs: [Array],
      name: 'Burn',
      type: 'event',
      constant: undefined,
      payable: undefined,
      signature: '0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5'
    },
    {
      anonymous: false,
      inputs: [Array],
      name: 'Transfer',
      type: 'event',
      constant: undefined,
      payable: undefined,
      signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    },
    {
      constant: true,
      inputs: [Array],
      name: 'allowance',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xdd62ed3e'
    },
    {
      constant: true,
      inputs: [Array],
      name: 'balanceOf',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x70a08231'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x313ce567'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x06fdde03'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x95d89b41'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [Array],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x18160ddd'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'transfer',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xa9059cbb'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'transferFrom',
      outputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x23b872dd'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'approve',
      outputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x095ea7b3'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'approveAndCall',
      outputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xcae9ca51'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'burn',
      outputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x42966c68'
    },
    {
      constant: false,
      inputs: [Array],
      name: 'burnFrom',
      outputs: [Array],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x79cc6790'
    }
  ];

const BallotContractAddress = '0xBE954fB8d9C6BD59D2479F12698c1ed828A88cdf';
const ERC20ContractAddress = '0xEB62e7c92Ac46E239c4ADd93cc9Af84B3F317dd4';

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