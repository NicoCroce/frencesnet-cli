'use strict';
const chalk = require('chalk'),
    files = require('./files.js'),
    child_process = require('./child_process'),
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
                        let commandDeploy = `sh deployDesa.sh ${res.legajo} ${resDesa.desa} ${res.rutaCore} ${(resDesa.ofuscado == 'SI') ? '' : 'NOO'}`;

                        console.log(chalk` 👉   Legajo: {cyan ${res.legajo}}`);
                        console.log(chalk` 👉   Ruta de core {cyan ${res.rutaCore}}`);
                        console.log(chalk` 👉   Desa {cyan ${resDesa.desa}}`);
                        console.log(chalk` 👉   Ofuscado: {cyan ${resDesa.ofuscado}}`);
                        console.log('\n');
                        console.log(commandDeploy + '\n');

                        getBranchesCore(res.rutaCore)
                            .then((resBranch) => {
                                console.log(`RESULTADO FINAL  ::::   ${resBranch}`);
                            });

                        /* child_process.execSpawnShell(commandDeploy, process.cwd() + '/scripts/', 'Verificar que te encuenras en el ROOT del proyecto.')
                            .then((res) => {
                                console.log(res);
                            }).catch(err => console.log(err)); */
                    });
            });
    }

    function getBranchesCore(dir) {
        return new Promise((resolve, reject) => {
            let coreRoute = `${dir}/fnetcore`;

            child_process.execSpawnShell('git fetch -p', coreRoute, 'No se actualizaron las ramas')
                .then(resFetch => {
                    return child_process.execSpawnGetResult('git branch', coreRoute, 'No se actualizaron las ramas')
                })
                .then((dataBranch) => {
                    inquirer.getBranch(dataBranch.split('\n'))
                        .then((branchName) => {
                            branchName = (branchName.charAt(0) == '*') ? branchName.substr(1) : branchName;
                            console.log(`\nEl branch de CORE es: ${branchName}.`);
                            console.log(`Actualizando rama...`)
                            return child_process.execSpawnShell(`git checkout ${branchName} && git pull && git status`, coreRoute, 'No se actualizaron las ramas');
                        })
                }).catch(err => console.log(err));
        })
    }

    function createFactory(variable) {
        console.log(chalk`{cyan PRÓXIMAMENTE ESTARÁ DISPONIBLE}  ✍️  ✍️  ✍️`);
    }

    module.exports = {
        init
    }

})();
