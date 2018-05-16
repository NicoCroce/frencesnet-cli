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
        if (!files.rootProject()) {
            return console.log(chalk`{red ❗  NO TE ENCUENTRAS EN EL ROOT DEL PROYECTO}  😱`);
        }
        files.getConfigDeployFile()
            .then((res) => {
                inquirer.getConfigDesa()
                    .then((resDesa) => {
                        let commandDeploy = `sh deployDesa.sh ${res.legajo} ${resDesa.desa} ${res.rutaCore} ${(resDesa.ofuscado == 'SI') ? '' : 'NOO'}`;
                        getBranches(res.rutaCore, 'CORE')
                            .then((resBranch) => {
                                return getBranches(process.cwd(), 'FRONT')
                            })
                            .then((resBranch) => {
                                console.log(chalk`\nEjecutando deploy`);
                                console.log(chalk` 👉   Legajo: {cyan ${res.legajo}}`);
                                console.log(chalk` 👉   Ruta de core {cyan ${res.rutaCore}}`);
                                console.log(chalk` 👉   Desa {cyan ${resDesa.desa}}`);
                                console.log(chalk` 👉   Ofuscado: {cyan ${resDesa.ofuscado}}`);
                                return child_process.execSpawnShell(commandDeploy, process.cwd() + '/scripts/', 'Verificar que te encuenras en el ROOT del proyecto.')
                            })
                            .then((res) => {
                                console.log(res);
                            }).catch(err => console.log(err));
                    });
            });
    }

    function getBranches(srcRoute, branchType) {
        console.log(chalk`\nTRABAJANDO SOBRE EL REPOSITORIO DE {cyan ${branchType}}\n`);
        return new Promise((resolve, reject) => {
            child_process.execSpawnShell('git fetch -p', srcRoute, 'No se actualizaron las ramas', `Obteniendo ramas de ${branchType}`)
                .then(resFetch => {
                    return child_process.execSpawnGetResult('git branch', srcRoute, 'No se actualizaron las ramas')
                })
                .then((dataBranch) => {
                    inquirer.getBranch(dataBranch.split('\n'))
                        .then((branchName) => {
                            branchName = (branchName.charAt(0) == '*') ? branchName.substr(1) : branchName;
                            console.log(chalk`\nEl branch de ${branchType} es: {cyan ${branchName}}. \n`);
                            return child_process.execSpawnShell(`git checkout ${branchName} && git pull && git status`, srcRoute);
                        })
                        .then((resBranchUpdated) => {
                            resolve();
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
