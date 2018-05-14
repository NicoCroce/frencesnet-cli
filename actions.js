'use strict';
const chalk = require('chalk'),
    file = require('./files.js'),
    inquirer = require('./inquirer.js');

(() => {
    let actions = {
        1: createComponenet,
        2: createFactory,
        3: deployDesa
    };

    function init() {
        inquirer.getMenu()
            .then((index) => {
                return actions[index]();
            });
    }

    function createComponenet() {
        let createFile = new file();
        inquirer.inputName().then((variable) => {
            createFile.createComponent(variable)
                .then((res) => {
                    console.log('\n');
                    console.log('👌  ¡Componente creado con éxito! 🎉');
                })
                .catch((err) => {
                    console.log(chalk`{red  ${err}}`)
                });
        });
    }

    function deployDesa() {
        
    }

    function createFactory(variable) {
        console.log(chalk`{cyan PRÓXIMAMENTE ESTARÁ DISPONIBLE}  ✍️  ✍️  ✍️`);
    }

    module.exports = {
        init
    }

})();
