(function () {
    var app = angular.module('app', ['ngRoute', 'ngMessages', 'angularUtils.directives.dirPagination']);
    
    app.config(["$routeProvider", "$httpProvider", function ($router, $httpProvider ) { 
        
        $httpProvider.interceptors.push('httpInterceptor');
        
        $router.when("/", { templateUrl: "angular/views/signin.html" })
        .when('/signup', { templateUrl:
                              "angular/views/signup.html" })
        .when('/todosBalances', { templateUrl:
                              "angular/views/todosBalances.html" })
        .when('/nuevoBalance', { templateUrl:
                              "angular/views/nuevoBalance.html" })
        .when('/todosRubros/:balanceId', { templateUrl:
                              "angular/views/todosRubros.html" })
        .when('/todosProductos', { templateUrl:
                              "angular/views/todosProductos.html" })
        .when('/nuevoRubro/:balanceId', { templateUrl:
                              "angular/views/nuevoRubro.html" })
        .when('/nuevoProducto/:balanceId', { templateUrl:
                              "angular/views/nuevoProducto.html" })
        .when('/editarRubro/:id', { templateUrl:
                              "angular/views/editarRubro.html" })
        .when('/editarProducto/:id/:balanceId', { templateUrl:
                              "angular/views/editarProducto.html" })
        .when('/verRubro/:id/:balanceId', { templateUrl:
                              "angular/views/verRubro.html" })
        .when('/verProducto/:id/:balanceId', { templateUrl:
                              "angular/views/verProducto.html" })
        .when('/unBalance/:id', { templateUrl:
                              "angular/views/unBalance.html" })
        .when('/buscarPorFecha/:balanceId', { templateUrl:
                              "angular/views/porFecha.html" })
        .when('/ayuda/:balanceId', { templateUrl:
                              "angular/views/ayuda.html" })
        .when('/autor', { templateUrl:
                              "angular/views/autor.html" })
        .otherwise({ redirectTo: "/" });        
    }]);
})();