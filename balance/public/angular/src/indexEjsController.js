(function() {
    var app = angular.module('app');
    
    app.controller('IndexEjsController', ['$http', '$location', 'rubrosProxy', 'tokenStorage', '$routeParams', function($http, $location, proxy, tokenStorage, $route) {
       
        var ctrl = this;
        ctrl.rubros = [];
        ctrl.userId = tokenStorage.getId();
        ctrl.balanceId = $route.balanceId;

        proxy.getAllFromThisUser(ctrl.userId, function(rubros){
            ctrl.rubros = rubros;
        });

    }]);
})();