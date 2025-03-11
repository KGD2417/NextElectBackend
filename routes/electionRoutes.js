const express = require("express");
const electionController = require("../controllers/electionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, electionController.createElection);
router.get("/fetch",authMiddleware, electionController.fetchElections);
router.post("/vote", authMiddleware, electionController.vote);
router.post("/end", authMiddleware, electionController.endElection);
router.get("/results/:electionId", authMiddleware, electionController.getResults);

module.exports = router;