#!/usr/bin/env node
'use strict';

const chalk = require('chalk'),
    actions = require('./actions.js'),
    program = require('commander');


// HEADER
process.stdout.write('\x1Bc');

console.log(chalk`🔥  🔥  🔥    Frances Net CLI  Desarrollado por {cyan   NICOLÁS CROCE   ingcrocenicolas@outlook.com }   😉  🍺`);
console.log('\n');

program
    .version('1.1.3', '-v, --version')
    .description('Crear componente para fnet');

actions.init();

/*
program.on('--help', function () {
    console.log('fnet newComponent <Nombre>');
}); */

program.parse(process.argv);