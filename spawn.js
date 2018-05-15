'use strict';

(() => {
    const spawn = require('child_process').spawn,
        execute = require('child_process').exec

    class Spawn {
        constructor(command, folder, errorMsg) {
            this.command = command;
            this.folder = folder;
            this.errorMsg = errorMsg;
        }

        executeSpawn() {
            let allResponse;

            let child = spawn(this.command, {
                stdio: 'inherit',
                shell: true,
                cwd: process.cwd() + this.folder
            });

            child.on('data', (msg) => {
                console.log('Message from parent:', msg);
            });

            child.on('error', (err) => {
                console.log(`Error al ejecutar  ${this.command} \n`);
                console.log(this.errorMsg);
            });

            child.on('exit', function (code, signal) {
                console.log('Proceso terminado con éxito');
            });
        }
    }

    function getBranch(command, cb) {
        var branches = execute(command);

        branches.stdout.on('data', function (data) {
            cb(data.split('\n'));
        });

    }

    module.exports = {
        Spawn,
        getBranch
    };
})();
