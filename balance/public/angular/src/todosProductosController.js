(function() {
    var app = angular.module('app');
    
    app.controller('TodosProductosController', ['$http', '$location', 'productosProxy', function($http, $location, proxy) {
       
        var ctrl = this;
        ctrl.productos = [];

        proxy.getAll(function(productos){
            ctrl.productos = productos;
        });

    }]);
})();