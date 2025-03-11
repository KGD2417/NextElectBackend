const { contract } = require("../utils/web3");
const Election = require("../models/election.js");
const { web3 } = require("../utils/web3");

let lastUsedAccountIndex = 0;


//Function to create Election via Blockchain
exports.createElection = async (req, res) => {
    try {
        const { name, candidates, durationInMinutes } = req.body;
        const endTime = new Date(Date.now() + durationInMinutes * 60000);

        const election = new Election({ name, candidates, endTime });
        await election.save();

        // ✅ Get first account from Ganache
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; // Using the first account from Ganache

        console.log("Using account:", sender);

        // ✅ Send transaction with an unlocked account
        await contract.methods.createElection(name, candidates, durationInMinutes)
            .send({ from: sender, gas: 3000000 });

        res.status(201).json({ message: "Election created successfully." });
    } catch (error) {
        console.error("Error creating election:", error);
        res.status(500).json({ message: "Failed to create election.", error: error.message });
    }
};

//Function to vote in the elections via blockchain
exports.vote = async (req, res) => {
    try {
        const { electionId, candidate } = req.body;

        // ✅ Get all accounts from Ganache
        const accounts = await web3.eth.getAccounts();

        // ✅ Select the next available account in a round-robin way
        const selectedAccount = accounts[lastUsedAccountIndex];

        // ✅ Update the index for next vote (cycling through accounts)
        lastUsedAccountIndex = (lastUsedAccountIndex + 1) % accounts.length;

        console.log(`Using account for voting: ${selectedAccount}`);

        // ✅ Cast the vote using the selected account
        await contract.methods.vote(electionId, candidate).send({ from: selectedAccount, gas: 3000000 });

        res.json({ message: "Vote casted successfully.", voter: selectedAccount });
    } catch (error) {
        console.error("Error voting:", error);
        res.status(500).json({ message: "Failed to cast vote.", error: error.message });
    }
};



// exports.vote = async (req, res) => {
//     const { electionId, candidate } = req.body;
    
//     await contract.methods.vote(electionId, candidate).send({ from: req.user.id });
//     res.json({ message: "Vote casted successfully." });
// };

exports.endElection = async (req, res) => {
    const { electionId } = req.body;
    await contract.methods.endElection(electionId).send({ from: req.user.id });
    res.json({ message: "Election ended successfully." });
};

exports.getResults = async (req, res) => {
    const { electionId } = req.params;
    const results = await contract.methods.getElectionResults(electionId).call();
    res.json({ results });
};

exports.fetchElections = async (req, res) => {
    try {
        const electionCount = await contract.methods.getElectionCount().call();
        let elections = [];

        for (let i = 0; i < electionCount; i++) {
            const election = await contract.methods.getElectionDetails(i).call();
            elections.push({
                id: i,
                name: election[0],
                candidates: election[1],
                endTime: Number(election[2]) * 1000, // Convert Solidity seconds to JS milliseconds
                isEnded: election[3]
            });
        }

        res.json({ success: true, data: elections });
    } catch (error) {
        console.error("Error fetching elections:", error);
        res.status(500).json({ success: false, message: "Failed to fetch elections.", error: error.message });
    }
};
