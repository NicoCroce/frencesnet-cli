'use strict';

var {{mockname}} = require('../mocks/{{mockname}}.json');

var module{{mockname}} = {
    path: '{{path}}',
    // status example
    //status: function(req, res, param) {
    //  to get params req.body.param
		//if(req.body.numeroDocumento == incidencias.NO_CLIENT) {
			//res.send(401, {statusText : statusText[incidencias.NO_CLIENT]});
		//}
    //},

    container: {
        response : {{mockname}}
    },
    // params example:
    //template: {
        //response : function(params, query, body){
            //if(body.numeroDocumento == incidencias.NO_USER_NO_QUESTIONS){return responseMockNoQuestions;}
            //return responseMockQuestions;
        //}
    //}

};

module.exports = [module{{mockname}}];
