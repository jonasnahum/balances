(function() {
    var app = angular.module('app');
   
    app.controller('NuevoBalanceController', ['$http', '$location', 'balancesProxy', 'tokenStorage', function($http, $location, balancesProxy, tokenStorage) {
        
        var ctrl = this;
        ctrl.nombre = '';
        ctrl.usuarioId =  tokenStorage.getId();
        
        ctrl.guardar = function() {
            balancesProxy.save({
                nombre: ctrl.nombre,
                _userId: ctrl.usuarioId
            }, function(balances){
                $location.path('/todosBalances');
            });
        };
        
    }]);
    
})();
