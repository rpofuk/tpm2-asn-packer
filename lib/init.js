const fs = require("fs")
const { ASN1, Enc, PEM } = require("asn1-packer")

global.btoa = require("btoa")

module.exports = (objectId, parentId, privateKey, publicKey, outFile) => {
   var  prv = fs.readFileSync(privateKey)
   var pub = fs.readFileSync(publicKey)

   console.log("Preparing outpuot")
   var arr =  [
  48,
  [
    [
      6,
      Buffer.from(objectId, 'utf8').toString('hex');
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
    ],
    [
      4,
      "01160001000b000204400000001000100800000000000100e25d117c352cee895ac90705261073535f2407bd0ce0322c0e176d72396ac43c68d6e62f9d433fd990429aaa6b5092459008baea2b331c91041005a45e0e66a8cd77f36c929de232689faf9caa018677337d4caa50458a2c9cb6a2a9570202870b086ca7a5aec5dbb72d6270fd821fe938c3f9cfca63e39df62d82931ef105bc9fa535e7aba321d25c21276c405725de7ac39c3d48ba65f4fcb7da9d0ad10d5488fa6eaccef4eb76c3ccb4679a34c9e5cf4831ef86aea3bfc28048d7ebdc633ef42934b1cefe757810749d7d71f72da99ca563bc6840159dedcc14503d5746e9bfbb8aa068518ecb03f644ab3d0ccd5df8c7a6470e2de1f8a73c433055c32065"
    ],
    [
      4,
      "00de0020ac22f7451701af21574e8a3d64ddff7f811e7848cae7c7a36289acc6abdc92180010cc5b4f6e9fa36876edbe0a3e59d4a6888bd893cb0745f3e8f24017c9f461d2543b7f35c61ccf4c8428a7cd41c658d32d5d82f561a7b396d60cf5bd22d11bbf851a944c057f1b16e0c6b9b262d69f703553054d675716fe8531fb79ce085d536606cc3eccd3a2a08f96920777dbceef4f6aa52c942c852464b1d2e8f50cec4498e54f357f80484f1251f9a61aa84ae78bf1432ec0d53f4310dc2b851de5031c8d2e133cdb7eead8163a69f7e71a6a85ae673a60558579a633dd82"
    ]
  ]
];
    console.log("Packing hex asn 1")
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



