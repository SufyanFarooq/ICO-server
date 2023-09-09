const express = require("express");
const bodyParser = require("body-parser");
const { getSignatureDeposit } = require("../controller/signatueController");
const { getPublicKey, decryptData } = require("../services/encryptionData");
const { transferVRC } = require("../controller/sentController");
const { getDetailByAddress } = require("../controller/userController");

// import router 
// const {sendEmailtoUser, getEmailList} = require("../controller/userController")

const router = express.Router();
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
router.route("/getDepositSign").post(decryptData ,getSignatureDeposit)
router.get("/getPublicKey", getPublicKey)
router.post("/transferVRC", transferVRC)
router.route("/getDetailByAddress").get(getDetailByAddress);
// router.route("/users/emails").get(getEmailList)
module.exports = router;