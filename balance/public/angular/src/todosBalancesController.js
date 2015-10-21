(function() {
    var app = angular.module('app');
    
    app.controller('TodosBalancesController', ['$http', '$location', 'balancesProxy', 'tokenStorage', function($http, $location, proxy, tokenStorage) {
       
        var ctrl = this;
        ctrl.balances = [];
        ctrl.searchText = "";
        ctrl.userId = tokenStorage.getId();

        proxy.getAllFromThisUser(ctrl.userId, function(balances){
            ctrl.balances = balances;
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