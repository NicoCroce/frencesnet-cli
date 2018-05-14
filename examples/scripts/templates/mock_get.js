'use strict';

var {{mockname}} = require('../mocks/{{mockname}}.json');

var module{{mockname}} = {
    path: '{{path}}',
    //status: function(req, res, param) {
        // to get url params as /client/:idproduct/xxxx
        //var idProducto = req.params.idProducto;

        // to get get params
    //  var idProducto = req.query.idproduct
        //if(idProducto === productErrors.DISABLE.id) {
            //res.send(403, productErrors.DISABLE.text );
        //}
    //},

    container: {
        response : {{mockname}}
    }
};

module.exports = [module{{mockname}}];
