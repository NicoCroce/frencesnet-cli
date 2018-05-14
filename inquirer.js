'use strict'

const inquirer = require('inquirer');

(() => {
    let getMenu = () => {
        return new Promise((resolve, reject) => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: "accion",
                        message: '¿QUÉ QUIERES HACER?',
                        choices: [
                            '1 - Crear Componente',
                            '2 - Crear Factory',
                            '3 - Deploy en Desa',
                            new inquirer.Separator()
                        ]
                    },
                ])
                .then(answers => {
                    console.log('\n');
                    resolve(returnIndex(answers.accion));
                });
        });
    };

    let inputName = () => {
        return new Promise((resolve, reject) => {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'nombre',
                        message: '¿Qué nombre deseas utilizar? (respetar CamelCase)',
                        validate: (name) => {
                            return name !== '';
                        }
                    }
                ])
                .then(answers => {
                    console.log('\n');
                    resolve(answers.nombre);
                });
        })
    };

    function returnIndex(str){
        return str.substring(0, str.indexOf(' '));
    }

    module.exports = {
        getMenu,
        inputName
    }
})();
