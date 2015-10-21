(function() {
    var app = angular.module('app');
    
    app.controller('UnBalanceController', ['$http', '$location', 'productosProxy', 'balancesProxy', 'tokenStorage', '$routeParams', function($http, $location, productosProxy, balancesProxy, tokenStorage, $route) {
       
        var ctrl = this;
        ctrl.productos = [];
        ctrl.searchText = "";
        ctrl.balanceId = $route.id;
        ctrl.balanceNombre = "";

        productosProxy.getAllFromThisBalance(ctrl.balanceId, function(productos){
            ctrl.productos = productos;
        });
     
        balancesProxy.getOneBalance(ctrl.balanceId, function(balance){
            ctrl.balanceNombre = balance.nombre;
        });
        
        ctrl.emailUsuario = "";
        
        ctrl.getEmail = function (){
            ctrl.emailUsuario = tokenStorage.getEmail();
        };
        ctrl.getEmail();
        
        ctrl.logout = function (){
            tokenStorage.clearToken();
            $location.path("/signin");
            return false;
        };

    }]);
})();