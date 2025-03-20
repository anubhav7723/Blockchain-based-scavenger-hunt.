
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScavengerHunt {
    struct Challenge {
        string clue;
        string solution;
        bool completed;
        address winner;
    }

    address public owner;
    uint public challengeCount;
    mapping(uint => Challenge) public challenges;
    mapping(address => bool) public registeredPlayers;

    event ChallengeCreated(uint challengeId, string clue);
    event ChallengeCompleted(uint challengeId, address winner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyRegistered() {
        require(registeredPlayers[msg.sender], "Not registered");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function register() external {
        require(!registeredPlayers[msg.sender], "Already registered");
        registeredPlayers[msg.sender] = true;
    }

    function createChallenge(string memory _clue, string memory _solution) external onlyOwner {
        challenges[challengeCount] = Challenge(_clue, _solution, false, address(0));
        emit ChallengeCreated(challengeCount, _clue);
        challengeCount++;
    }

    function submitSolution(uint _challengeId, string memory _solution) external onlyRegistered {
        Challenge storage challenge = challenges[_challengeId];
        require(!challenge.completed, "Challenge already completed");
        require(keccak256(abi.encodePacked(_solution)) == keccak256(abi.encodePacked(challenge.solution)), "Incorrect solution");
        
        challenge.completed = true;
        challenge.winner = msg.sender;
        emit ChallengeCompleted(_challengeId, msg.sender);
    }
}
