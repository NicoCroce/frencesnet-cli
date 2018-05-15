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

    let setServerData = () => {
        return new Promise((resolve, reject) => {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'legajo',
                        message: 'Ingresa tu legajo:',
                        validate: (name) => {
                            return name !== '';
                        }
                    },
                    {
                        type: 'input',
                        name: 'rutaCore',
                        message: 'Ingresa la ruta de Core:',
                        validate: (name) => {
                            return name !== '';
                        }
                    }
                ])
                .then(answers => {
                    console.log('\n');
                    resolve(answers);
                });
        })
    };

    let getConfigDesa = () => {
        return new Promise((resolve, reject) => {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'desa',
                        message: 'Ingresa Desa:',
                        validate: (name) => {
                            return name !== '';
                        }
                    }
                ])
                .then(answers => {
                    console.log('\n');
                    if (answers.desa == '1') {
                        answers.ofuscado = 'SI';
                        resolve(answers);
                    } else {
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: "ofuscado",
                                    message: '¿Deseas ofuscar el código?',
                                    choices: [
                                        'SI',
                                        'NO',
                                        new inquirer.Separator()
                                    ]
                                }
                            ])
                            .then(answerList => {
                                console.log('\n');
                                answerList.desa = answers.desa;
                                resolve(answerList);
                            });
                    }
                });
        })
    };

    function returnIndex(str) {
        return str.substring(0, str.indexOf(' '));
    }

    let getBranch = (arrayList) => {
        console.log('\n');
        return new Promise((resolve, reject) => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: "accion",
                        message: '¿Qué branch deseas?',
                        choices: arrayList
                    },
                ])
                .then(answers => {
                    console.log('\n');
                    resolve(answers.accion);
                });
        });
    };

    module.exports = {
        getMenu,
        inputName,
        setServerData,
        getConfigDesa,
        getBranch
    }
})();
