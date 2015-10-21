(function() {
    var app = angular.module('app');
    
    app.factory('rubrosProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('http://localhost:3000/rubros/api/');
        return proxy;     
    }]);
})();
