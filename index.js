#!/usr/bin/env node
'use strict';

    const   file = require('./files.js'),
            program = require('commander');
            
    let createFile = new file();

program
    .version('0.0.1', '-v, --version')
    .description('Crear componente para fnet');

program
    .command('fnet <variable>')
    .alias('nc')
    .description('   Crear componente para fnet')
    .action((variable) => {
        createFile.createComponent(variable);
    });


program.on('--help', function () {
    console.log('fnet newComponent <Nombre>');
});

program.parse(process.argv);