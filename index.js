#!/usr/bin/env node
'use strict';

const file = require('./files.js'),
    inquirer = require('inquirer'),
    program = require('commander');

let createFile = new file();


// HEADER
process.stdout.write('\x1Bc');

console.log('🔥  🔥  🔥    Frances Net CLI  Desarrollado por Nicolás Croce --> ingcrocenicolas@outlook.com 😉  🍺');
console.log('\n');

program
    .version('1.0.9', '-v, --version')
    .description('Crear componente para fnet');


let actions = {
    1: createComponenet,
    2: createFactory
}


inquirer
    .prompt([
        {
            type: 'list',
            name: "accion",
            message: '¿QUÉ QUIERES HACER?',
            choices: [
                '1 - Crear Componente',
                '2 - Crear Factory',
                new inquirer.Separator()
            ]
        },
        {
            type: 'input',
            name: 'nombre',
            message: '¿Qué nombre deseas utilizar?'
        }
    ])
    .then(answers => {
        console.log('\n');
        actions[answers.accion.charAt(0)](answers.nombre); //Obtiene el número de la acción
    });


function createComponenet(variable) {
    createFile.createComponent(variable)
        .then((res) => {
            console.log('\n');
            console.log('👌 ¡Componente creado con éxito! 🎉');
        });
}

function createFactory(variable) {
    console.log('Crea factoey');
}


/*
program.on('--help', function () {
    console.log('fnet newComponent <Nombre>');
}); */

program.parse(process.argv);