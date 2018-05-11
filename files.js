'use strict';

(()=>{
    const   fs = require('fs'),
            utilFiles = require('./utilFiles.js');
    
    class file {
        createComponent(variable) {
            if (fs.existsSync(variable)) {
                return console.log(' EL COMPONENTE YA EXISTE! ')
            } else {
                fs.mkdirSync(variable);
            }

            createFile(variable, 'scss', utilFiles.getCssData(variable));
            createFile(variable, 'html', utilFiles.getHTMLdata(variable));
            createFile(variable, 'js', utilFiles.getJsData(variable));
        }
    }

    let createFile = (variable, extension, data) => {
        var fileName = variable + '/' + variable + '.' + extension;
        fs.appendFile(fileName, data, function (err) {
            if (err) throw err;
            console.log('Saved!  ' + extension);
        });
    }
    
    module.exports = file;

})();