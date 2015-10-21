(function() {
    var app = angular.module('app');
    
    app.factory('productosProxy', ['proxyFactory', function(proxyFactory) {
        var proxy = proxyFactory('http://localhost:3000/productos/api/');
        return proxy;     
    }]);
})();
