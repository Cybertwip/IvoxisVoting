pragma solidity >=0.4.22 <0.7.0;

import "./Owner.sol";

interface ERC20Interface {
    function totalSupply() external view returns (uint);
    function balanceOf(address tokenOwner) external view returns (uint balance);
}

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot is Owner {
   
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    mapping(address => Voter) public voters;

    Proposal[] public proposals;
    bytes32[] public proposalNames;

    ERC20Interface tokenContract;


    constructor() public {
    }

    function setProposals(bytes32[] memory _proposalNames) public isOwner{
        delete proposals;
        delete proposalNames;

        for (uint i = 0; i < _proposalNames.length; i++) {
            proposals.push(Proposal({
                name: _proposalNames[i],
                voteCount: 0
            }));

            proposalNames.push(_proposalNames[i]);
        }        
    }

    function setERC20ContractAddress(address _address) external isOwner {
      tokenContract = ERC20Interface(_address);
    }

    /**
     * @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
     * @param proposal index of proposal in the proposals array
     */
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];

        uint voteWeight = tokenContract.balanceOf(msg.sender);

        require(voteWeight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");

        sender.weight = voteWeight;
        sender.voted = true;
        sender.vote = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }
    
    function getProposalNames() public view returns(bytes32[] memory){
        return proposalNames;
    }

    /** 
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}
