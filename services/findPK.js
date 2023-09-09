
const pkArray = [
    {
        address:"0xdab7563bd867642c5764162af06ca00cd903fc30",
        privateKey:"f7d2606df4350170c045ba6ae326201dee7e234cf29d96a243242d38a19cd36d"
    },
    {
        address:"0xc353bc8e1c4d3c6f4870d83262946e8c32e126b3",
        privateKey:"cd25609a5298a2deb114bf263c831ca80ff1f4d2755eb3b23657e3a4da308d7f"
    }
]
exports.findFreePK =  () => {
    let selectedWallet = null;

    for (let wallet of pkArray) {
        if (wallet.status === 'free') {
            selectedWallet = wallet;
            wallet.status = 'busy';
            break;
        }
    }
    return selectedWallet;
}

exports.freeSelectedWallet = () => {

}