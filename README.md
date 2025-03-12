# NextElect Backend

## Overview
NextElect is a blockchain-based voting system that ensures secure, transparent, and tamper-proof elections. This backend service is built using **Node.js with Express.js** and interacts with a **Solidity smart contract** deployed on **Ganache** via **Web3.js**. The backend provides REST API endpoints for the **Flutter frontend** to facilitate user authentication, election management, and voting.

## Features
- **User Authentication**
  - JWT-based authentication.
  - Aadhaar ID, Birth Date, and Gender-based login.
  - PIN setup for added security.
  - Wallet address assignment from Ganache.

- **Election Management**
  - Create new elections with candidates.
  - View available elections.
  - Cast votes securely using blockchain.
  - End elections and store results.

- **Admin Panel API**
  - Add new users.
  - Create new elections.
  - End elections.
  - View election results.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Blockchain:** Solidity (Ganache)
- **Web3 Integration:** Web3.js (Backend only)
- **Database:** MongoDB (User & authentication storage)
- **Authentication:** JWT-based authentication

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **Ganache** (for local blockchain testing)
- **MongoDB** (local or cloud instance)
- **Truffle** (for compiling and deploying smart contracts)

### Clone the Repository
```sh
git clone https://github.com/KGD2417/NextElect-Backend.git
cd NextElect-Backend
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/nextelect
JWT_SECRET=your_secret_key
GANACHE_RPC_URL=http://127.0.0.1:7545
```

### Compile & Deploy Smart Contracts
```sh
truffle migrate --reset
```

### Run the Server
```sh
npm start
```
The server should be running on `http://localhost:5000`.

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|--------------|
| `POST` | `/api/auth/login` | Authenticate user & issue JWT token |
| `POST` | `/api/auth/set-pin` | Set user PIN after first login |
| `GET` | `/api/elections` | Fetch available elections |
| `POST` | `/api/elections/vote` | Cast a vote for a candidate |
| `POST` | `/api/admin/elections` | Create a new election (Admin) |
| `POST` | `/api/admin/end-election` | End an election & store results (Admin) |
| `GET` | `/api/admin/results` | View election results (Admin) |

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any queries, contact kshitijdesai179@gmail.com.

