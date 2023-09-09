const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
const autopopulate = require('mongoose-autopopulate');
const schema = new Schema({
    BSCHash: {
        type: String,
        unique: true,
        // sparse: true
    },
    VRCHash: {
        type: String,
        // unique: true,

    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'PENDING'
    },
    amount: {
        type: Number,
        required: true,
    },
    // address: {
    //     type: ObjectId,
    //     ref: 'Address',  
    //     autopopulate: true  // this ensures the plugin populates this field automatically
    // }
}, { timestamps: true })
// schema.plugin(autopopulate);
const hashes = mongoose.model("Hashes", schema);
module.exports = hashes;