'use strict';
const chalk = require('chalk'),
    files = require('./files.js'),
    Spawn = require('./spawn'),
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
        let createFile = new files.file();
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
        files.getConfigDeployFile()
            .then((res) => {
                inquirer.getConfigDesa()
                    .then((resDesa) => {
                        let command = `sh deployDesa.sh ${res.legajo} ${resDesa.desa} ${res.rutaCore} ${(resDesa.ofuscado == 'SI') ? '' : 'NOO'}`;

                        console.log(chalk` 👉   Legajo: {cyan ${res.legajo}}`);
                        console.log(chalk` 👉   Ruta de core {cyan ${res.rutaCore}}`);
                        console.log(chalk` 👉   Desa {cyan ${resDesa.desa}}`);
                        console.log(chalk` 👉   Ofuscado: {cyan ${resDesa.ofuscado}}`);
                        console.log('\n');
                        console.log(command + '\n');

                        getBranchesCore(res.rutaCore)
                            .then((resBranch) => {
                                console.log(`El branch de CORE es: ${resBranch}`);
                            })

                        /* let deployDesa = new Spawn(command, '/scripts/', 'Verificar que te encuenras en el ROOT del proyecto.');
                        deployDesa.executeSpawn(); */



                    });
            });
    }

    function getBranchesCore(dir) {
        return new Promise((resolve, reject) => {
            console.log(`Obteniendo ramas de CORE`);

            function showBranches(res) {
                inquirer.getBranch(res)
                    .then((response) => {
                        console.log('Hay que ejecutar el pull');
                        resolve(response);
                    });
            }

            let getCoreBranchesCommand = `cd ${dir}/fnetcore && git fetch && git branch`;

            Spawn.getBranch(getCoreBranchesCommand, showBranches);
        })
    }

    function createFactory(variable) {
        console.log(chalk`{cyan PRÓXIMAMENTE ESTARÁ DISPONIBLE}  ✍️  ✍️  ✍️`);
    }

    module.exports = {
        init
    }

})();
