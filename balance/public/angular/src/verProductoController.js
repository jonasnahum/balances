(function() {
    var app = angular.module('app');
    
    app.controller('VerProductoController', ['$http', "$location", '$routeParams', 'productosProxy', function($http, $location, $route, proxy) {
        var ctrl = this;
        ctrl.fecha = '';
        ctrl.nombre = '';
        ctrl._rubro = '';
        ctrl.tipo = '';
        ctrl.cantidad = '';
        ctrl.comentarios = '';
        ctrl.id = $route.id;
        ctrl.balanceId = $route.balanceId;
        
        ctrl.obtener = function(id) {
            proxy.getOneProduct(id, function(producto){ 
                ctrl.fecha = producto.fecha;
                ctrl.nombre = producto.nombre;
                ctrl._rubro = producto._rubro.nombre;
                ctrl.tipo = producto.tipo;
                ctrl.cantidad = producto.cantidad;
                ctrl.comentarios = producto.comentarios;
            });
        };
    
        ctrl.obtener(ctrl.id);
        
        ctrl.delete = function () {
            proxy.delete(ctrl.id, function(){
                $location.path('/unBalance/' + ctrl.balanceId);
            });      
        };
        
    }]);
})();