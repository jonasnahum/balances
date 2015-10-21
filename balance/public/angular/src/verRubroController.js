(function() {
    var app = angular.module('app');
    
    app.controller('VerRubroController', ['$http', "$location", '$routeParams', 'rubrosProxy', function($http, $location, $route, proxy) {
        var ctrl = this;
        ctrl.nombre = '';
        ctrl.id = $route.id;
        ctrl.balanceId = $route.balanceId;
        
        ctrl.obtener = function(id) {
            proxy.getOneRubro(id, function(rubro){
                ctrl.nombre = rubro.nombre;
            });
        };
    
        ctrl.obtener(ctrl.id);
        
        ctrl.delete = function () {
            proxy.delete(ctrl.id, function(){
                $location.path('/todosRubros/' + ctrl.balanceId);
            });      
        };
        
    }]);
})();