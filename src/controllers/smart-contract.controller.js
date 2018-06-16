const Web3 = require('web3');

class SmartContractController {
    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NETWORK_PROVIDER));
    }

    getBalance() {
        this.web3.eth.getBalance('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', (err, result) => {
            if (!err) {
                console.log('Ether:', this.web3.utils.fromWei(result, 'ether')); // Show the ether balance after converting it from Wei
            }
            else {
                console.log('Huston we have a promblem: ', err);
            }
        });
    }
}

module.exports = SmartContractController;