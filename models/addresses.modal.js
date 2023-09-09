const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const autopopulate = require('mongoose-autopopulate');
const addressSchema = new Schema(
    {
    address: {
        type: String,
        required: true,
        unique: true
    },
    hash: [{
        type: ObjectId,
        ref: 'Hashes',  
        autopopulate: true  // this ensures the plugin populates this field automatically
    }]
}, 
{ timestamps: true }
)
addressSchema.plugin(autopopulate);
const walletAddress = mongoose.model("Address", addressSchema);
module.exports = walletAddress;