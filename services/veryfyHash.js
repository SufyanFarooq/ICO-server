const { ethers, JsonRpcProvider } = require('ethers');

const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s3.binance.org:8545/');


exports.verifyHashOnBlockchain = async (hash) => {
    try {
        const isValid = await provider.getTransactionReceipt(hash); 
        return isValid.status ? true : false;
    } catch (error) {
        // console.error("Error verifying hash:", error);
        return false;
    }
}

exports.verifyAddress = (address) => {
    try {
        let isAddress = ethers.isAddress(address)
        return isAddress
    } catch (error) {
        console.error("error while verify address", error);
    }
}