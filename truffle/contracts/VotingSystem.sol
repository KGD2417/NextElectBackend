// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Election {
        string name;
        string[] candidates;
        uint256 endTime;
        bool isEnded;
        mapping(address => bool) voters;
        mapping(string => uint256) votesReceived;
    }

    Election[] public elections;

    event ElectionCreated(uint256 electionId, string name, uint256 endTime);
    event VoteCasted(uint256 electionId, string candidate);
    event ElectionEnded(uint256 electionId);

    function createElection(string memory _name, string[] memory _candidates, uint256 _durationInMinutes) public {
        uint256 endTime = block.timestamp + (_durationInMinutes * 1 minutes);
        Election storage newElection = elections.push();
        newElection.name = _name;
        newElection.candidates = _candidates;
        newElection.endTime = endTime;
        newElection.isEnded = false;

        emit ElectionCreated(elections.length - 1, _name, endTime);
    }

    function vote(uint256 _electionId, string memory _candidate) public {
    require(_electionId < elections.length, "Invalid election ID");
    Election storage election = elections[_electionId];
    require(!election.voters[msg.sender], "You have already voted");
    require(!election.isEnded, "Election has ended");
    require(block.timestamp <= election.endTime, "Election has ended");

    bool isValidCandidate = false;
    for (uint256 i = 0; i < election.candidates.length; i++) {
        if (keccak256(bytes(election.candidates[i])) == keccak256(bytes(_candidate))) {
            isValidCandidate = true;
            break;
        }
    }
    require(isValidCandidate, "Invalid candidate");

    election.voters[msg.sender] = true;
    election.votesReceived[_candidate]++;

    emit VoteCasted(_electionId, _candidate);
}


    function endElection(uint256 _electionId) public {
        require(_electionId < elections.length, "Invalid election ID");
        Election storage election = elections[_electionId];
        require(!election.isEnded, "Election has already ended");
        require(block.timestamp > election.endTime, "Election is still ongoing");

        election.isEnded = true;

        emit ElectionEnded(_electionId);
    }

    function getElectionResults(uint256 _electionId) 
    public 
    view 
    returns (string[] memory, uint256[] memory) 
{
    require(_electionId < elections.length, "Invalid election ID");
    Election storage election = elections[_electionId];
    require(election.isEnded, "Election has not ended yet");

    uint256 candidatesLength = election.candidates.length;
    uint256[] memory votes = new uint256[](candidatesLength);

    for (uint256 i = 0; i < candidatesLength; i++) {
        votes[i] = election.votesReceived[election.candidates[i]];
    }

    return (election.candidates, votes);
}


    function getElectionDetails(uint256 _electionId) 
    public 
    view 
    returns (string memory name, string[] memory candidates, uint256 endTime, bool isEnded) 
{
    require(_electionId < elections.length, "Invalid election ID");
    Election storage election = elections[_electionId];
    return (election.name, election.candidates, election.endTime, election.isEnded);
}


    // Function to get the number of elections
    function getElectionCount() public view returns (uint) {
        return elections.length;
    }
}