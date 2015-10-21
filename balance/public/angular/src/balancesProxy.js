(function() {
    var app = angular.module('app');
    
    app.factory('balancesProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('http://localhost:3000/balances/api/');
        return proxy;     
    }]);
})();
