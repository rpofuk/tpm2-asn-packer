#!/usr/bin/env node

const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
const packageFile = require('../lib/init.js');

program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('package <objectId> <privateKey> <publicKey> <outFile>')
  .alias('p')
  .description('Package TPM2 private and public key into PEM file')
  .action((objectId, privateKey, publicKey, outFile) => {
    packageFile(objectId, privateKey, publicKey, outFile);
  });

program
  .on('*', function() {
      console.log('Unknown Command: ' + program.args.join(' '))
    program.help();
  });
  
program.parse(process.argv);

