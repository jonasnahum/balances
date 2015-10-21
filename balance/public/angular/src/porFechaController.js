(function() {
    var app = angular.module('app');
   
    app.controller('PorFechaController', ['$http', '$location', 'rubrosProxy', 'productosProxy', '$routeParams', function($http, $location, rubrosProxy, productosProxy, $routeParams) {
        
        var ctrl = this;
        ctrl.fechaInicio = '';
        ctrl.fechaLimite = '';
        ctrl.productos = [];
        ctrl._rubros = [];
        ctrl.rubroSeleccionado = "";
        ctrl.searchText = "";
        ctrl.balanceId = $routeParams.balanceId;

        
        ctrl.buscarPorFechas = function() {
            productosProxy.getByDateFromThisBalance(ctrl.balanceId,ctrl.fechaInicio, ctrl.fechaLimite,    
            function(productos){
                ctrl.productos = productos;
            });
        };
        
        
        rubrosProxy.getAll(function(rubros){
            ctrl._rubros = rubros;
        });
        var filtrarRubro = function (obj) {
            if (obj._rubro.nombre == ctrl.rubroSeleccionado) {
                return true;
            } else {
            return false;
            }        
        };
        ctrl.filtrar = function(){
            var arrPorRubro = ctrl.productos.filter(filtrarRubro);
            ctrl.productos = arrPorRubro;
        };
        
        
        $(function() {
            $( "#fechaInicio" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fechaInicio" ).change(function(){   
                ctrl.fechaInicio = $(this).val();
            });
          });
        $(function() {
            $( "#fechaLimite" ).datepicker({
              showWeek: true,
              firstDay: 1,
              dateFormat: "mm-dd-yy"
            });
            $( "#fechaLimite" ).change(function(){   
                ctrl.fechaLimite = $(this).val();
            });
          });     
    }]);
    
})();