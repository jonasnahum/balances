(function() {
    var app = angular.module('app');
    
    app.controller('AyudaController', ['$routeParams', function($route) { 
        var ctrl = this;

        ctrl.balanceId = $route.balanceId;
    }]);
})();