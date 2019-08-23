require("fs)


function packageFile(tpmId, privateKey, publicKey) {
    prv = fs.readFileSync(privateKey)
    pub = fs.readFileSync(publicKey)
    
}
