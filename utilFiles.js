'use strict';

(() => {

    let getCssData = (variable) => {
        return '.' + getCssClassName(variable) + ' {  /* Escriba el estilo aquí */  }'
    };

    let getCssClassName = (variable) => {
        var className = '';
        for (var index = 0; index < variable.length; index++) {
            var currentChar = variable.charAt(index);
            if (currentChar === currentChar.toUpperCase()) {
                className = className + '-' + currentChar.toLowerCase();
            }

            if (currentChar === currentChar.toLowerCase()) {
                className = className + currentChar;
            }
        }

        return className;
    }

    let getHTMLdata = (variable) => {
        return '<section class="'+ getCssClassName(variable) +'">\n\t<!-- Escribir código -->\n</section>';
    }

    let getJsData = (variable) => {
        let ctrlName = variable + "Ctrl";

        return "(function () { \n\t'use strict'; \n\tangular \n\t\t.module('clemente.components') \n\t\t.controller('"+ ctrlName +"', "+ ctrlName +"); \n\n\t\tfunction "+ ctrlName +"($scope) { \n\t\t\treturn { \n\t\t\t/* Escribir código */\n\t\t\t} \n\t\t}; \n})();"
    }

    module.exports = {
        getCssData,
        getCssClassName,
        getHTMLdata,
        getJsData
    };
})();


