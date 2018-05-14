(function(window, angular){
'use strict';

    function {{service_name}}($http, config){
        return  {
            {% if get %}
                get: function({{arguments}}){
                    return $http.get(config.{{ get }}({{arguments}}) );
                }
            {% endif %}
            {% if post %}
            ,
                post: function({{arguments}}){
                    return $http.post(config.{{ post }}({{arguments}}) );
                },
            {% endif %}
        };
    }

    angular
        .module('clemente.services')
        .factory('{{service_name}}', {{service_name}});

})(window, angular);
