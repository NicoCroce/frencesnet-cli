'use strict';

(() => {
    const fs = require('fs'),
        utilFiles = require('./utilFiles.js');

    class file {
        createComponent(variable) {
            return new Promise((resolve, reject) => {
                if (fs.existsSync(variable)) {
                    console.log(' EL COMPONENTE YA EXISTE! ');
                    reject();
                } else {
                    fs.mkdirSync(variable);
                    
                    Promise.all([createFile(variable, 'scss', utilFiles.getCssData(variable)),
                    createFile(variable, 'html', utilFiles.getHTMLdata(variable)),
                    createFile(variable, 'js', utilFiles.getJsData(variable))])
                    .then(() => {
                        resolve();
                    })
                }
            });
        }
    }

    let createFile = (variable, extension, data) => {
        return new Promise((resolve, reject) => {
            var fileName = variable + '/' + variable + '.' + extension;
            fs.appendFile(fileName, data, function (err) {
                if (err) throw err;
            }, () => {
                console.log('✔️   ' + variable + '.' + extension);
                resolve();
            });
        });
    }

    module.exports = file;

})();