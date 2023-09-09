const crypto = require('crypto');
const fs = require('fs');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 3048,
});

fs.writeFileSync('public.pem', publicKey.export({ type: 'pkcs1', format: 'pem' }));
fs.writeFileSync('private.pem', privateKey.export({ type: 'pkcs1', format: 'pem' }));

exports.getPublicKey = (req, res) => {
    const spkiPublicKey = publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
    res.json({ publicKey: spkiPublicKey });
};

exports.decryptData = async (req, res, next) => {
    try {
        let { encryptedData } = req.body
        const buffer = Buffer.from(encryptedData, 'base64');
        const decryptedData = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, buffer);
        // console.log("JSON.parse(decryptedData.toString())", JSON.parse(decryptedData.toString()));
        req.body.payload = JSON.parse(decryptedData.toString());

        next(); // Go to the next middleware or route handler
    } catch (error) {
        console.error("error while decrypt data", error);
    }
}

exports.encryptData = (paylaod, frontPublicKey) => {
    try {
        const dataToEncrypt = JSON.stringify(paylaod);
        const buffer = Buffer.from(dataToEncrypt);
        const bufferPublicKey = Buffer.from(frontPublicKey, 'base64');
        // Convert to PEM format
        const pemPublicKey = `-----BEGIN PUBLIC KEY-----\n${bufferPublicKey.toString('base64')}\n-----END PUBLIC KEY-----`;

        // Encrypt
        const encryptedData = crypto.publicEncrypt({
            key: pemPublicKey, // Use PEM formatted public key
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        }, buffer);

        const base64EncryptedData = encryptedData.toString('base64');
        return base64EncryptedData;
    } catch (error) {
        console.error("Error while encrypting data", error);
    }
};
