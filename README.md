# bioblock
A blockchain-based platform for secure storage and management of medical data, ensuring privacy, transparency, and seamless access for patients and healthcare providers.

---

## Features

- **Secure Data Storage**: Medical records are stored on a blockchain to ensure immutability.
- **Database Integration**: Uses MongoDB to persist records for quick retrieval.
- **Peer-to-Peer Network**: Ensures blockchain synchronization across multiple nodes.
- **REST API**: Simplifies interaction with the blockchain and database.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (>= 14.0.0)
- MongoDB

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blockchain-medical-data.git
cd blockchain-medical-data
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

Start your MongoDB server and ensure it runs on the default port (`27017`). If using a different URI, update the configuration in `config/default.json`:

```json
{
  "port": 3000,
  "dbURI": "mongodb://localhost:27017/medicalDB"
}
```

### 4. Start the Application

#### Development Mode

```bash
npm run dev
```

#### Production Mode

```bash
npm start
```

---

## API Endpoints

### Base URL:

`http://localhost:3000/api/medical`

### Endpoints:

1. **Add Medical Record**

   - **POST** `/add-record`
   - **Request Body:**
     ```json
     {
       "patientID": "12345",
       "diagnosis": "Flu",
       "medication": "Antiviral"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Record added to blockchain and database",
       "newBlock": { ... }
     }
     ```

2. **Get Blockchain**

   - **GET** `/chain`
   - **Response:** Returns the full blockchain.

3. **Get All Medical Records**

   - **GET** `/records`
   - **Response:** Returns all records from MongoDB.

4. **Connect Peer**

   - **POST** `/connect`
   - **Request Body:**
     ```json
     {
       "peerUrl": "ws://peer-host:peer-port"
     }
     ```

---

## Running on Multiple Nodes

1. Start MongoDB and ensure it's accessible to all nodes.
2. Start the application on different ports and WebSocket ports:
   ```bash
   PORT=3001 P2P_PORT=6001 node src/app.js
   PORT=3002 P2P_PORT=6002 node src/app.js
   ```
3. Use the `/connect` endpoint to link peers:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"peerUrl": "ws://localhost:6002"}' http://localhost:3001/api/medical/connect
   ```

---

## Folder Structure

```
blockchain-medical-data/
├── src/
│   ├── app.js             # Main application file
│   ├── blockchain/
│   │   ├── block.js       # Block class
│   │   └── blockchain.js  # Blockchain class
│   ├── models/
│   │   └── medicalRecord.js  # MongoDB schema for medical records
│   ├── routes/
│   │   └── medicalRecords.js # API routes
│   ├── utils/
│       └── validateData.js   # Utility for validating input data
├── config/
│   └── default.json       # Configuration file
├── scripts/
│   └── setup-db.sh        # MongoDB setup script
├── logs/                  # Logs folder
│   └── blockchain.log     # Blockchain logs
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Added feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


