// const ngrok = require("ngrok");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const electionRoutes = require("./routes/electionRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/elections", electionRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");

    // ngrok.connect(3000).then(ngrokUrl=>{
    //     console.log(`Ngrok tunnel is: ${ngrokUrl}`);
    // }).catch(error=>{
    //     console.log(`Couldn't tunnel ngrok: ${error}`)
    // })
});
