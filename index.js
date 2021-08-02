const Web3 = require("web3");
const EthereumTx = require('ethereumjs-tx').Transaction;
const axios = require('axios');
const ethNetwork = 'https://rinkeby.infura.io/v3/03aad59b966240d480237838fcb3fbeb';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
 
async function transferAmount(senderData, recieverData, amountToSend) {
    return new Promise(async (resolve, reject) => {
        const nonce = await web3.eth.getTransactionCount(senderData.address);
        web3.eth.getBalance(senderData.address, async (err, result) => {
            if (err) {
                return reject();
            }
            const balance = web3.utils.fromWei(result, "ether");
            console.log(balance + " ETH");
            if(balance < amountToSend) {
                console.log('Amount is insufficient');
                return reject();
            }
   
            const gasPrices = await getGasPrices();
            const details = {
                "to": recieverData.address,
                "value": web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), 'ether')),
                "gas": 21000,
                "gasPrice": gasPrices.high * 1000000000,
                "nonce": nonce,
                "chainId": 4 
            };
        
            const transaction = new EthereumTx(details, {chain: 'rinkeby'});
            const privateKey = senderData.privateKey.split('0x');
            const privKey = Buffer.from(privateKey[1],'hex');
            transaction.sign(privKey);
            const serializedTransaction = transaction.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (err, id) => {
                if(err) {
                    console.log(err);
                    return reject();
                }
                const url = `https://rinkeby.etherscan.io/tx/${id}`;
                console.log(url);
                resolve({id: id, link: url});
            });
        });
    });
}

async function getGasPrices() {
    const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    const prices = {
      low: response.data.safeLow / 10,
      average: response.data.average / 10,
      high: response.data.fast / 10
    };
    return prices;
}

transferAmount({address: '0x47d0912896515d67a75a5b3c36a20345df3c310a', privateKey: '0x7057eb2e338a3917642c5a3c38377ebd1897268d05b9b658fc69bfbee45de618'},{address: '0xe1e249165c89448bcb9edb31d1b4c53098f1b47f'},0.30)