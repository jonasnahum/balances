(function() {
    var app = angular.module('app');
    app.controller('NuevoRubroController', ['$http', '$location', 'rubrosProxy', 'tokenStorage', '$routeParams', function($http, $location, proxy, tokenStorage, $route) {
        
        var ctrl = this;
        ctrl.nombre = '';
        ctrl._userId = tokenStorage.getId();
        ctrl.balanceId = $route.balanceId;
        
        ctrl.guardar = function() {
            proxy.save(ctrl, function(rubro){
                $location.path('/todosRubros/' + ctrl.balanceId);
            });
        };
        
        ctrl.guardarRegresarAproducto = function() {
            proxy.save(ctrl, function(rubro){
                $location.path('/nuevoProducto/' + ctrl.balanceId);
            });
        };
        
    }]);
    
})();