(function() {
    var app = angular.module('app');
    var array = ['$http', '$location', '$routeParams','rubrosProxy'];
    
    array.push(function($http, $location, $routeParams, proxy) {
        var ctrl = this;
        ctrl.nombre = '';
        ctrl.id = $routeParams.id;


        ctrl.obtener = function(id) {
            proxy.getOne(id, function(rubro){
                ctrl.nombre = rubro.nombre;
            });
        };
        ctrl.editar = function(){
            proxy.update(ctrl, function(rubro){
               $location.path("/todosRubros"); 
            });
        }
        ctrl.obtener(ctrl.id);
    });
    
app.controller('EditarRubroController', array);
    
})();

