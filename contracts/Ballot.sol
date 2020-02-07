pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;


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
   ERC20Interface tokenContract;

    struct Voter {
        uint weight; // weight is accumulated by token balance
        bool voted;  // if true, that person already voted
        uint vote;   // yes or no (0 or 1)
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;   // short name (up to 32 bytes)
        uint yesVoteCount; // number of accumulated votes saying yes
        uint noVoteCount; // number of accumulated votes saying no

        uint dateProposed;
        uint expirationDate;
    }

    Proposal[] public proposals;

    mapping(uint => mapping(address => Voter)) public voters;
    mapping(uint => uint) public totalVoters;

    uint currentVoteBatch;

    constructor() public {

    }

    function setERC20ContractAddress(address _address) external isOwner {
      tokenContract = ERC20Interface(_address);
    }

    function setProposal(bytes32 _proposalName) public isOwner{

        proposals.push(Proposal({
            name: _proposalName,
            yesVoteCount: 0,
            noVoteCount: 0,
            dateProposed: now,
            expirationDate: now + 4 seconds
        }));

        currentVoteBatch = proposals.length - 1;
    }

    function vote(uint yesNo) public {
        Voter storage sender = voters[currentVoteBatch][msg.sender];

        uint voteWeight = tokenContract.balanceOf(msg.sender);

        require(voteWeight != 0, "Has no tokens, and no right to vote");
        require(!sender.voted, "Already voted.");
        require(proposals[currentVoteBatch].expirationDate >= now, "Proposal time to vote expired");

        sender.weight = voteWeight;
        sender.voted = true;
        sender.vote = yesNo;

        totalVoters[currentVoteBatch] = totalVoters[currentVoteBatch] + 1;

        if(yesNo == 0){
            proposals[currentVoteBatch].noVoteCount += sender.weight;            
        }
        else {
            proposals[currentVoteBatch].yesVoteCount += sender.weight;                        
        }

    }
    
    function getProposals() public view returns(Proposal[] memory){
        return proposals;
    }

    function getVoters() public view returns(Voter[] memory){
        
    }

}
