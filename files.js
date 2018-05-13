'use strict';

(() => {
    const fs = require('fs'),
        chalk = require('chalk'),
        utilFiles = require('./utilFiles.js');

    const routs = {
        components: 'app/js/app/components/',
        scss: 'app/assets/scss/app-part-2.scss'
    };

    class file {
        createComponent(variable) {
            return new Promise((resolve, reject) => {
                if (fs.existsSync(routs.components + variable)) {
                    reject('❗  EL COMPONENTE YA EXISTE, DEBES ELEGIR OTRO NOMBRE  🤔 ');
                } else {
                    try {
                        fs.mkdirSync(routs.components + variable);
                    } catch(err) {
                        reject('❗  NO TE ENCUENTRAS EN EL ROOT DEL PROYECTO  😱');
                        throw err;
                    }

                    Promise.all([createFile(variable, 'scss', utilFiles.getCssData(variable)),
                    createFile(variable, 'html', utilFiles.getHTMLdata(variable)),
                    createFile(variable, 'js', utilFiles.getJsData(variable))])
                        .then(() => {
                            addReferences(variable).then(() => {
                                resolve();
                            });
                        });
                }
            });
        }
    }

    let addReferences = (variable) => {
        return new Promise((resolve, reject) => {
            let className = utilFiles.getCssClassName(variable);
            let scssData = '@import "../../js/app/components/' + variable + '/' + className +'";\n';
            fs.appendFile(routs.scss, scssData, function (err) {
                if (err) throw err;
            }, ()=> {

                console.log('\n✔️   Se agregó referencia a ' + routs.scss);
                resolve();
            })
        });
    }

    let createFile = (variable, extension, data) => {
        return new Promise((resolve, reject) => {
            let underscore = (extension == 'scss') ? '_' : '';
            var fileName = routs.components + variable + '/' + underscore + variable + '.' + extension;
            fs.appendFile(fileName, data, function (err) {
                if (err) throw err;
            }, () => {
                console.log('✔️   ' + fileName);
                resolve();
            });
        });
    }

    module.exports = file;

})();