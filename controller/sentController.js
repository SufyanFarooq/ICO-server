const { ethers } = require('ethers');
const { verifyHashOnBlockchain, verifyAddress } = require('../services/veryfyHash');
const wallets = require("../utils/utils");
const { transferCoin } = require('../services/trnsferCoin');
const Addresses = require("../models/addresses.modal")
const Hashes = require("../models/hash.modal")


const transactionQueue = [];
let isProcessing = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let recentlyUsedWallets = [];

async function processQueue() {
    isProcessing = true; 
    while (true) {
        let selectedWallet;

        // Check if there are wallets that haven't been used recently
        if (recentlyUsedWallets.length < wallets.length) {
            selectedWallet = wallets.find(w => w.status === 'free' && !recentlyUsedWallets.includes(w));
        } else {
            // All wallets have been used recently, so get the least recently used wallet
            for (let wallet of recentlyUsedWallets.reverse()) {
                if (wallet.status === 'free') {
                    selectedWallet = wallet;
                    break;
                }
            }
        }

        if (!selectedWallet) {
            await sleep(5000);
            continue;
        }

        if (transactionQueue.length === 0) {
            isProcessing = false;
            break;
        }

        const transaction = transactionQueue.pop();
        selectedWallet.status = 'busy';

        try {
            let trx = await transferCoin(transaction.userAddress, transaction.amount, selectedWallet.privateKey, transaction);
            
            // let updateTrx = await Hashes.findById(transaction._doc._id)
            // updateTrx.VRCHash = trx.hash;
            // updateTrx.status = 'SUCCESS';
            // await updateTrx.save();

        } catch (error) {
            console.error("Transaction failed:", error);
            
            // let updateTrx = await Hashes.findById(transaction._doc._id)
            // updateTrx.status = 'FAILED';
            // await updateTrx.save();

        } finally {
            selectedWallet.status = 'free';

            // Mark the wallet as recently used
            if (recentlyUsedWallets.includes(selectedWallet)) {
                const index = recentlyUsedWallets.indexOf(selectedWallet);
                recentlyUsedWallets.splice(index, 1);
            }
            recentlyUsedWallets.unshift(selectedWallet);
        }
    }
}

// async function processQueue() {
//     isProcessing = true; 
//     while (true) {
//         let selectedWallet;
//         if (recentlyUsedWallets.length < wallets.length) {
//             // If not all wallets have been recently used, find one which hasn't been used recently and is free
//             selectedWallet = wallets.find(w => w.status === 'free' && !recentlyUsedWallets.includes(w));
//         } else {
//             // All wallets have been used recently. Choose the least recently used one which is free.
//             for (let wallet of recentlyUsedWallets.reverse()) {
//                 if (wallet.status === 'free') {
//                     selectedWallet = wallet;
//                     break;
//                 }
//             }
//         }

//         if (!selectedWallet) {
//             await sleep(5000);
//             continue;
//         }

//         if (transactionQueue.length === 0) {
//             isProcessing = false;
//             break;
//         }

//         const transaction = transactionQueue.pop();
//         selectedWallet.status = 'busy';

//         // Rest of the logic remains same...

//         // Once done with the transaction, mark the wallet as recently used
//         if (recentlyUsedWallets.includes(selectedWallet)) {
//             const index = recentlyUsedWallets.indexOf(selectedWallet);
//             recentlyUsedWallets.splice(index, 1);
//         }
//         recentlyUsedWallets.unshift(selectedWallet);
//     }
// }
// async function processQueue() {
//     isProcessing = true; 
//     while (true) {
//         let selectedWallet = wallets.find(w => w.status === 'free');
//         if (selectedWallet) {
//             if (transactionQueue.length === 0) {
//                 isProcessing = false;
//                 break; // If no transaction in the queue, break out of the infinite loop.
//             }
//             const transaction = transactionQueue.pop();
//             selectedWallet.status = 'busy';

//             try {
//                 let trx = await transferCoin(transaction.userAddress, transaction.amount, selectedWallet.privateKey);
//                 // console.log("trx", trx.hash);
//                 let updateTrx = await Hashes.findById(transaction._doc._id)
//                 // console.log("updateTrx", updateTrx);
//                 // Update MongoDB transaction status
//                 updateTrx.VRCHash = trx.hash
//                 updateTrx.status = 'SUCCESS';
//                 await updateTrx.save();
//             } catch (error) {
//                 console.error("Transaction failed:", error);
//                 // Update MongoDB transaction status
//                 let updateTrx = await Hashes.findById(transaction._doc._id)
//                 updateTrx.status = 'FAILED';
//                 await updateTrx.save();
//             } finally {
//                 selectedWallet.status = 'free';
//             }
//         } else {
//             await sleep(5000);
//         }
//     }
// }



exports.transferVRC = async (req, res) => {
    try {
        const { hash, userAddress, amount } = req.body;
        console.log("Received hash:", hash);

        // Logic for verification of hash and transfer
        const isHashValid = await verifyHashOnBlockchain(hash)
        if (!isHashValid) {
            return res.status(400).send({ error: 'Invalid Hash' });
        }
        let isVerifyAddress = verifyAddress(userAddress);
        if (!isVerifyAddress) {
            return res.status(400).send({ error: 'Invalid user Address' });
        }
        let storedAddress = await Addresses.findOne({ address: userAddress });
        if (!storedAddress) {
            storedAddress = new Addresses({ address: userAddress });
            await storedAddress.save();
        }
     

        const newTransaction = new Hashes({
            BSCHash: hash,
            amount:amount,
            // address: storedAddress._id,
            status: "PENDING"
        });

        await newTransaction.save();
        storedAddress.hash.push(newTransaction._id);
        await storedAddress.save();
        transactionQueue.push({ ...newTransaction, userAddress, amount });

        // Background mein queue process karo
        if (!isProcessing) {
            processQueue();
        }
        // let trx = await transferCoin(userAddress, "0.001", wallets[0].privateKey)
        res.status(200).send({ message: 'Transaction request added. It will be processed soon.', transactionId: newTransaction._id });

    } catch (error) {
        res.status(500).send(error.message)
        // console.error("error while trsfer vrc", error);
    }
};
