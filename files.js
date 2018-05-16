'use strict';

const inquirier = require('./inquirer');

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
                if(!rootProject()) { 
                    return reject('❗  NO TE ENCUENTRAS EN EL ROOT DEL PROYECTO  😱');
                }
                if (fs.existsSync(routs.components + variable)) {
                    return reject('❗  EL COMPONENTE YA EXISTE, DEBES ELEGIR OTRO NOMBRE  🤔 ');
                } else {
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

    function rootProject() {
        try {
            return fs.statSync('./app/loginClementeApp-src.html').isFile();
        } catch (e) {
          return false;
        }
      }

    let addReferences = (variable) => {
        return new Promise((resolve, reject) => {
            let className = utilFiles.getCssClassName(variable);
            let scssData = '@import "../../js/app/components/' + variable + '/' + className + '";\n';
            fs.appendFile(routs.scss, scssData, function (err) {
                if (err) throw err;
            }, () => {

                console.log('\n✔️   Se agregó referencia a ' + routs.scss);
                resolve();
            })
        });
    }

    let createFile = (variable, extension, data) => {
        return new Promise((resolve, reject) => {
            let fileRoute = routs.components + variable + '/' + getFileName() + '.' + extension;
            fs.appendFile(fileRoute, data, function (err) {
                if (err) throw err;
            }, () => {
                console.log('✔️   ' + fileRoute);
                resolve();
            });
        });

        function getFileName() {
            return (extension == 'scss') ? '_' + utilFiles.getCssClassName(variable) : variable;
        }
    }

    let getConfigDeployFile = () => {
        return new Promise((resolve, reject) => {
            fs.readFile('./.fnetconfig', 'utf8', (err, res) => {
                if (err) {
                    inquirier.setServerData()
                            .then((response) => {
                                fs.appendFile('./.fnetconfig', JSON.stringify(response), function (err) {
                                    if (err) throw err;
                                }, () => {
                                    console.log('✔️   .fnetconfig');
                                    console.log(chalk`✔️   Se almacenó el legajo {cyan ${response.legajo}} y la ruta de core {cyan ${response.rutaCore}}`);
                                    console.log(`\n`);
                                    resolve(response);
                                });
                            });
                } else {
                    resolve(JSON.parse(res));
                }
            });
        });
    }

    module.exports = {
        file,
        getConfigDeployFile,
        rootProject
    };

})();