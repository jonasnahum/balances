//debe enviar. req.body._balanceId.
(function() {
    var app = angular.module('app');
   
    app.controller('NuevoProductoController', ['$http', '$location', 'rubrosProxy', 'productosProxy', 'tokenStorage', '$routeParams', function($http, $location, rubrosProxy, productosProxy, tokenStorage, $route) {
        
        var ctrl = this;
        ctrl.fecha = '';
        ctrl.nombre = '';
        ctrl._rubros = [];
        ctrl._rubro = "";
        ctrl.tipo = '';
        ctrl.cantidad = '';
        ctrl.comentarios = '';
        ctrl.balanceId = $route.balanceId;
        ctrl.userId = tokenStorage.getId();
        
        
        ctrl.guardar = function() {
            productosProxy.save({
                fecha: ctrl.fecha,
                nombre: ctrl.nombre,
                _rubro: ctrl._rubro,
                _balanceId: ctrl.balanceId,
                tipo: ctrl.tipo,
                cantidad: ctrl.cantidad,
                comentarios: ctrl.comentarios,
            }, function(productos){
                $location.path('/unBalance/' + ctrl.balanceId);
            });
        };
        $(function() {
            $( "#fecha" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fecha" ).change(function(){   
                ctrl.fecha = $(this).val();
            });
          });
        
        rubrosProxy.getAllFromThisUser(ctrl.userId, function(rubros){
            ctrl._rubros = rubros;
        });
        
        
    }]);
    
})();