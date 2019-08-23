#!/usr/bin/env node

const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
const { packageFile );

program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('package <tpmId> <privateKey> <publicKey>')
  .alias('p')
  .description('Package TPM2 private and public key into PEM file')
  .action((projectName) => {
    packageFile(tpmId, privateKey, publicKey);
  });

program
  .on('*', function() {
      console.log('Unknown Command: ' + program.args.join(' '))
    program.help();
  });
  

program.parse(process.argv);

