//dependencies
var intravenous = require("intravenous");

//local modules
var Usuario = require("./usuariosCollection");
var Balance = require("./balancesCollection");
var Producto = require("./productosCollection");
var Rubro = require("./rubrosCollection");

var models = {
    usuario: Usuario,
    balance: Balance,
    producto: Producto,
    rubro: Rubro
};

var TokenMiddleware = require("./tokenMiddleware");
TokenMiddleware.$inject = ["models", "jwt"];

var UsuariosController = require("./usuariosController");
UsuariosController.$inject = ["express", "usuariosApi"];
var BalancesController = require("./balancesController");
BalancesController.$inject = ["express", "balancesApi", "tokenMiddleware" ];
var ProductosController = require("./productosController");
ProductosController.$inject = ["express", "productosApi", "tokenMiddleware"];
var RubrosController = require("./rubrosController");
RubrosController.$inject = ["express", "rubrosApi"];

var UsuariosApi = require("./usuariosApi");
UsuariosApi.$inject = ["models", "usuarioFactory", "moment", "jwt"];
var BalancesApi = require("./balancesApi");
BalancesApi.$inject = ["models", "balanceFactory"];
var ProductosApi = require("./productosApi");
ProductosApi.$inject = ["models", "productoFactory"];
var RubrosApi = require("./rubrosApi");
RubrosApi.$inject = ["models", "rubroFactory"];//factory de rubroColle.

var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var container = intravenous.create();

//register
container.register("usuario", Usuario);
container.register("balance", Balance);
container.register("producto", Producto);
container.register("rubro", Rubro);
container.register("models", models);

container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("moment", { module: require('moment') });
container.register("jwt", { module: require('jwt-simple') });

container.register("tokenMiddleware", TokenMiddleware);

container.register("usuariosController", UsuariosController);
container.register("balancesController", BalancesController);
container.register("productosController", ProductosController);
container.register("rubrosController", RubrosController);

container.register("usuariosApi", UsuariosApi);
container.register("balancesApi", BalancesApi);
container.register("productosApi", ProductosApi);
container.register("rubrosApi", RubrosApi);

container.register("dbConnection", DbConnection);

module.exports = container;









