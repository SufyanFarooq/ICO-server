const Addresses = require("../models/addresses.modal");
const Hashes = require("../models/hash.modal")

exports.getDetailByAddress = async (req, res) => {
    try {
        let {address} = req.query;
        console.log(address);
       const find = await Addresses.find({address})
       res.status(200).send(find)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}