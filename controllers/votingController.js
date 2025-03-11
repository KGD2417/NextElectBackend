const { web3, contract } = require("../config/web3");

exports.castVote = async (req, res) => {
    try {
        const { electionId, candidateId } = req.body;
        const accounts = await web3.eth.getAccounts();
        
        await contract.methods.vote(electionId, candidateId).send({ from: accounts[0] });
        res.json({ message: "Vote cast successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
