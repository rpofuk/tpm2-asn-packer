const fs = require("fs")
const { ASN1, Enc, PEM } = require("asn1-packer")

global.btoa = require("btoa")

module.exports = (objectId, privateKey, publicKey, outFile) => {
   var  prv = fs.readFileSync(privateKey)
   var pub = fs.readFileSync(publicKey)

   console.log("Preparing outpuot")
   var arr =  [
  48,
  [
    [
      6,
      '6781050a0103' 
    ],
    [
      160,
      [
        [
          1,
          "01"
        ]
      ]
    ],
    [
      2,
      objectId
    ],
    [
      4, 
      pub.toString('hex')
    ],
    [
      4,
      prv.toString('hex')
    ]
  ]
]

    console.log("Packing hex asn 1")
    console.log(arr)
    var hex = ASN1.pack(arr);
    var buf = Enc.hexToBuf(hex);
    console.log("Generating pem file")
    var pem = PEM.packBlock({ type: "TSS2 PRIVATE KEY", bytes: buf })
    
    console.log("Writing to ouput")
    fs.writeFile(outFile, pem, (err) => {
       // throws an error, you could also catch it here
       if (err) throw err;

       // success case, the file was saved
       console.log("Successfully written pen file");
    });

}



