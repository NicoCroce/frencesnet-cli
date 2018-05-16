'use strict';

(() => {
    const { spawn, exec } = require('child_process');
    const ora = require('ora');

    class Spinner {
        constructor() {
            this.spinner;
        };

        start(msg) {
            this.spinner = ora();
            if (msg) this.spinner.text = msg;
            this.spinner.start();
            this.spinner.spinner = {
                "interval": 80,
                "frames": [
                    "⠋",
                    "⠙",
                    "⠹",
                    "⠸",
                    "⠼",
                    "⠴",
                    "⠦",
                    "⠧",
                    "⠇",
                    "⠏"
                ]
            };
            this.spinner.color = 'yellow';
        }

        stop() {
            this.spinner.stop();
        }
    };

    function execSpawnShell(command, folder, errorMsg, loadingMsg) {
        return new Promise((resolve, reject) => {
            let spinner = new Spinner;

            if (!command.includes('deployDesa.sh')) {
                spinner.start(loadingMsg);
            }

            let child = spawn(command, {
                stdio: 'inherit',
                shell: true,
                cwd: folder
            });

            child.on('error', (err) => {
                console.log(`\nError al ejecutar  ${err} \n`);
                if (spinner) {
                    spinner.stop();
                }
                reject(errorMsg);
            });

            child.on('exit', function (code, signal) {
                console.log(`SPINNERRR  ${spinner}`)
                if (spinner) {
                    spinner.stop();
                }
                resolve();
                //console.log('Proceso terminado con éxito');
            });
        });
    }


    function execSpawnGetResult(command, folder, errorMsg) {
        let spinner = new Spinner;
        spinner.start();
        return new Promise((resolve, reject) => {
            let child = spawn(command, {
                //stdio: 'inherit',
                shell: true,
                cwd: folder
            });

            let response = '';

            child.stdout.on('data', (msg) => {
                response = response + msg;
            });

            child.on('error', (err) => {
                console.log(`Error al ejecutar  ${err} \n`);
                spinner.stop();
                reject(errorMsg);
            });

            child.on('exit', function (code, signal) {
                spinner.stop();
                resolve(response);
                //console.log('Proceso terminado con éxito \n');
            });
        });
    }

    module.exports = {
        execSpawnGetResult,
        execSpawnShell
    };
})();
