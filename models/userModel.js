const mongoose = require("mongoose");

const schema = mongoose.Schema({
    walletAddress:{
        type:String,
        required:true,
        unique: true
    },
    usdtTrx:{
        type:String,
        unique: true
    },
    vrcTrx:{
        type:String,
        unique:true
    },
    isReceived:{
        type:Boolean,
        default:false
    },
    isSent:{
        type:Boolean,
        default:false
    }
})

const userSchema = mongoose.model("User", schema);
module.exports = userSchema;