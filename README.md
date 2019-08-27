# tpm2-asn-packer


```
@:~/git/tpm2-asn-packer$ npx @rpofuk/tpm2-asn-packer@1.0.2 --help
npx: installed 48 in 3.139s
Usage: re-gen [options] [command]

Contact management system

Options:
  -V, --version                                            output the version number
  -h, --help                                               output usage information

Commands:
  package|p <objectId> <privateKey> <publicKey> <outFile>  Package TPM2 private and public key into PEM file

```

Loading key: 
```
#!/bin/bash

set -ex 

tpm2_createprimary -C o -c parent.ctx -G rsa2048:null:aes128cfb
tpm2_evictcontrol -c parent.ctx

tpm2_import -i << PATH TO THE KEY >> -r private_key.tss -u public_key.tss -Grsa -C parent.ctx
tpm2_load -C parent.ctx -u public_key.tss -r private_key.tss -c wzhpor.ctx
tpm2_evictcontrol -c wzhpor.ctx

##################################
############ OUTPUT ##############
# Here you get 0x<< objectId >>
persistent-handle: 0x81000004


```

Example usage:

```
@:~/.tpm2$ npx @rpofuk/tpm2-asn-packer p 81800001 private_key.tss public_key.tss out.key
npx: installed 48 in 5.492s
Preparing outpuot
Packing hex asn 1
[ 48,
  [ [ 6, '6781050a0103' ],
    [ 160, [Array] ],
    [ 2, '81800001' ],
    [ 4,
      '<!-- HEX -->' ],
    [ 4,
      '<!-- HEX -->' ] ] ]
Generating pem file
Writing to ouput
Successfully written pen file
```

Output:
```
@:~/.tpm2$ openssl asn1parse -in  out.key 
    0:d=0  hl=4 l= 564 cons: SEQUENCE          
    4:d=1  hl=2 l=   6 prim: OBJECT            :2.23.133.10.1.3
   12:d=1  hl=2 l=   3 cons: cont [ 0 ]        
   14:d=2  hl=2 l=   1 prim: BOOLEAN           :1
   17:d=1  hl=2 l=   5 prim: INTEGER           :81800001
   24:d=1  hl=4 l= 280 prim: OCTET STRING      [HEX DUMP]: <!-- HEX -->
  308:d=1  hl=4 l= 256 prim: OCTET STRING      [HEX DUMP]: <!-- HEX -->

```
