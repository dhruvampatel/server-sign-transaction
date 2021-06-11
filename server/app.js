const {CONTRACT_ADDRESS, URL, ABI, PRIVATE_KEY, ACCOUNT_ADDRESS } =  require('./config');
const Web3 = require('web3'); 
const Tx = require('ethereumjs-tx').Transaction;

const web3 = new Web3(new Web3.providers.HttpProvider(URL));
const SimpleStorage = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
const privateKey = Buffer.from(PRIVATE_KEY, 'hex');

const data = SimpleStorage.methods.setData(123456789).encodeABI();

web3.eth.getTransactionCount(ACCOUNT_ADDRESS)
  .then(nonce => {
    let rawTx = {
      nonce: nonce,
      gasPrice: '0x20000000000',
      gasLimit: '0x27511',
      to: CONTRACT_ADDRESS,
      value: 0,
      data: data
    };

    let tx = new Tx(rawTx);
    tx.sign(privateKey);

    let serializedTx = tx.serialize();

    web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'))
      .on('receipt', console.log);
  });