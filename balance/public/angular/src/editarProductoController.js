(function() {
    var app = angular.module('app');
    var array = 
     ['$http','$location','$routeParams','productosProxy','rubrosProxy'];
    
    array.push(function($http, $location, $routeParams, proxy, rubrosProxy) {
        var ctrl = this;
        ctrl.id = $routeParams.id;
        ctrl.balanceId = $routeParams.balanceId;
        ctrl.fecha = "";
        ctrl.nombre = '';
        ctrl._rubros = [];
        ctrl._rubro = "";
        ctrl.tipo = '';
        ctrl.cantidad = '';
        ctrl.comentarios = '';

        ctrl.obtenerProducto = function(id) {
            proxy.getOneProduct(id, function(producto){
                var fecha = new Date(producto.fecha);
                $( "#fecha" ).datepicker( "setDate", fecha );//se pone en datepicker
                ctrl.fecha = producto.fecha;
                ctrl.nombre = producto.nombre;
                ctrl._rubro = producto._rubro._id;
                ctrl.tipo = producto.tipo;
                ctrl.cantidad = producto.cantidad;
                ctrl.comentarios = producto.comentarios;
            });
        };
        
        ctrl.editar = function(){
            proxy.update({
                id: ctrl.id,
                fecha:$( "#fecha" ).datepicker( "getDate" ),//recoge la fecha
                nombre: ctrl.nombre,
                _rubro: ctrl._rubro,
                tipo: ctrl.tipo,
                cantidad: ctrl.cantidad,
                comentarios: ctrl.comentarios
            }, function(producto){
               $location.path("/unBalance/" + ctrl.balanceId); 
            });
        }
        ctrl.obtenerProducto(ctrl.id);
        rubrosProxy.getAll(function(rubros){
            ctrl._rubros = rubros;
        });
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
    });
    
app.controller('EditarProductoController', array);
    
})();
