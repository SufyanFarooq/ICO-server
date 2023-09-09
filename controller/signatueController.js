const { ethers, JsonRpcProvider, SigningKey } = require('ethers');

const { encryptData } = require('../services/encryptionData');
const rpc_url = "https://data-seed-prebsc-1-s1.binance.org:8545/"

exports.getSignatureDeposit = async (req, res) => {
    try {
        let { payload: { contractAddress, userAddress, amount }, frontPublicKey } = req.body;
        // console.log("body", req.body);
        const provider = new JsonRpcProvider(rpc_url)
        const blockNumber = await provider.getBlockNumber();
        const nonce = (await provider.getBlock(blockNumber)).timestamp;
        console.log("nonce-timestamp:", nonce)
        console.log("amount", ethers.parseEther(amount));
        let hash = ethers.solidityPackedKeccak256(["string", "string", "uint256", "uint256"],
            [contractAddress.toLowerCase(), userAddress.toLowerCase(), nonce, ethers.parseEther(amount)]);
        let privateKey = "0xd19d2ab151ec3ddf329321ddcf947f65da41512be25d9f9b3ea8049d1bdf67ee"
        const key = new SigningKey(privateKey);
        let deployTx = key.sign(hash);
        const signature = ethers.Signature.from(deployTx).serialized
        console.log("Signature:", signature);
        let entData = encryptData({
            success: true,
            msg: "signature create Successfuly",
            signature: signature,
            nonce: nonce
        }, frontPublicKey)
        return res.status(201).send({
            success: true,
            msg: "signature create Successfuly",
            encryptData: entData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message,
        })
        console.error("error while get user", error);
    }
}