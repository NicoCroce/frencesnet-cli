'use strict';

(() => {
    const { spawn, exec } = require('child_process');



    function execSpawnShell(command, folder, errorMsg) {
        return new Promise((resolve, reject) => {
            let child = spawn(command, {
                stdio: 'inherit',
                shell: true,
                cwd: folder
            });

            /* child.on('data', (msg) => {
                console.log('Message from parent:', msg);
            });
 */
            child.on('error', (err) => {
                console.log(`Error al ejecutar  ${err} \n`);
                reject(errorMsg);
            });

            child.on('exit', function (code, signal) {
                resolve();
                //console.log('Proceso terminado con éxito');
            });
        });
    }

    
function execSpawnGetResult(command, folder, errorMsg) {
    return new Promise((resolve, reject) => {
        let child = spawn(command, {
            //stdio: 'inherit',
            shell: true,
            cwd: folder
        });

        let response = '';

        child.stdout.on('data', (msg) => {
            //console.log(`CHILD ::::: ${response}` )
            response = response + msg;
        });

        child.on('error', (err) => {
            console.log(`Error al ejecutar  ${err} \n`);
            reject(errorMsg);
        });

        child.on('exit', function (code, signal) {
            resolve(response);
            console.log('Proceso terminado con éxito');
        });
    });
}

    function getBranch(cwd, cb) {
        execute(`cd ${cwd} && git fetch -p && ls`)
            .stdout.on('data', function (data) {
                execute(`cd ${cwd} && git branch`)
                    .stdout.on('data', function (dataBranch) {
                        cb(dataBranch.split('\n'));
                    });
            });
    }

    function gitChangeBranch(cwd, branch) {
        return new Promise((resolve, response) => {
            execute(`cd ${cwd} && git checkout ${branch} && git pull && git status`)
                .stdout.on('data', (res) => {
                    resolve(res);
                });
        });
    }

    module.exports = {
        execSpawnGetResult,
        execSpawnShell,
        getBranch,
        gitChangeBranch
    };
})();
