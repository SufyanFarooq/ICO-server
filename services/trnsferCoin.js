const { ethers, JsonRpcProvider, Contract } = require("ethers");
const { vrc_rpc_url } = require("../config")
const sentAbi = require("../abis/sentAbi.json")
const provider = new JsonRpcProvider(vrc_rpc_url)
const contract = new Contract("0xb5A5E6c6989b501d8410Ed1f1e4e0b02dc444d70", sentAbi, provider);
const Hashes = require("../models/hash.modal")

exports.transferCoin = async (userAddress, amount, privateKey, trxObj) => {
    try {
        console.log("calling");
        const wallet = new ethers.Wallet(privateKey, provider);
        const contractWithSigner = contract.connect(wallet);

        // Assuming VRCTransfer takes two arguments: address and amount
        const txResponse = await contractWithSigner.VRCTransfer(userAddress, ethers.parseEther(amount.toString()));

        // Wait for the transaction to be mined
        const receipt = await txResponse.wait();
        let updateTrx = await Hashes.findById(trxObj._doc._id)
        updateTrx.VRCHash = receipt.hash;
        updateTrx.status = 'SUCCESS';
        await updateTrx.save();
        return receipt
    } catch (error) {
        let updateTrx = await Hashes.findById(trxObj._doc._id)
        updateTrx.status = 'FAILED';
        await updateTrx.save();
        console.error("error while transfer coin", error);
    }
}