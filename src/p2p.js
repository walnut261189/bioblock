const WebSocket = require('ws');

const peers = []; // List of connected peers
let blockchain; // Reference to the blockchain instance

function initP2PServer(port, chainInstance) {
    const server = new WebSocket.Server({ port });
    blockchain = chainInstance;

    server.on('connection', (ws) => {
        initConnection(ws);
    });

    console.log(`P2P server running on port ${port}`);
}

function initConnection(ws) {
    peers.push(ws);
    console.log('New peer connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        handleMessage(data, ws);
    });

    ws.on('close', () => {
        console.log('Peer disconnected');
    });
}

function handleMessage(data, ws) {
    switch (data.type) {
        case 'CHAIN':
            syncChain(data.chain);
            break;
        case 'NEW_BLOCK':
            handleNewBlock(data.block);
            break;
        default:
            console.error('Unknown message type:', data.type);
    }
}

function syncChain(receivedChain) {
    if (receivedChain.length > blockchain.chain.length && blockchain.isChainValid(receivedChain)) {
        console.log('Replacing local chain with received chain');
        blockchain.chain = receivedChain;
    }
}

function handleNewBlock(block) {
    try {
        blockchain.addBlock(block);
        console.log('New block added to the chain:', block);
    } catch (error) {
        console.error('Failed to add new block:', error.message);
    }
}

function broadcast(message) {
    peers.forEach((peer) => peer.send(JSON.stringify(message)));
}

module.exports = { initP2PServer, broadcast, initConnection };
