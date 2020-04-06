const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('4371216abd496b6f27ad14c5800678630a287f1109ec59db5a1a7571c3ffe872');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const savvyCoin = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
savvyCoin.addTransaction(tx1);

// Mine block
savvyCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
savvyCoin.addTransaction(tx2);

// Mine block
savvyCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of Shinu is ${savvyCoin.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// savvyCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', savvyCoin.isChainValid() ? 'Yes' : 'No');

