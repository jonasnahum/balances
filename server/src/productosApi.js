var ProductosApi = (function() {
    var ProductosApi = function(models, productoFactory) {
        this.models = models;
        this.productoFactory = productoFactory;
    };
    
    ProductosApi.prototype.getAll = function(req, res, next) {
        //guardar un producto con un id asociado
        //recibir el id del usuario actualmente loggeado.
        //buscar todos los productos que tienen este id.
        //y poblarlos no es necesario.
        var that = this;       

        that.models.producto.find({
            _balanceId: req.params.balanceId}).populate('_rubro _balanceId')
            .exec(function (err, productos) {
                if (err) return next(err);
                console.log(productos);
                res.json(productos);
            });   
    };
    
    ProductosApi.prototype.getByDateFromBalance = function(req, res, next) {
        var that = this; 
        that.models.producto.find({
            '_balanceId': req.params.balanceId,
            'fecha': {
                "$gte": req.params.fechaInicio, "$lt": req.params.fechaLimite
            }
        })
        //.sort('fecha')
        .populate("_rubro")
        .exec(function (err, productos){
            if (err){
                console.log(err); 
            }
            console.log(productos);
            res.json(productos);
        });
    };


    
    ProductosApi.prototype.balanceActual = function(tipoAguardar, balanceAnterior, cantidadActual){
        var bal = null;
        if (tipoAguardar === "ingreso"){
            bal = parseFloat(balanceAnterior) + parseFloat(cantidadActual);
            return bal;
        }
        if (tipoAguardar === "egreso"){
            bal = balanceAnterior - cantidadActual;
            return bal;
        }
        return bal;
    };
    
    ProductosApi.prototype.getBalanceAnterior = function(balanceId, callback) {
        var that = this;
        var o = {};
        o.map = function() {
            var balance = this.tipo === "ingreso" ? parseFloat(this.cantidad) : -1 * 
            parseFloat(this.cantidad);
            emit("balance", balance);
        }
        o.reduce = function(key, values) { return Array.sum(values);};
        o.query = { _balanceId: balanceId  }
    
        that.models.producto.mapReduce( o,  callback )
    };
    

    ProductosApi.prototype.save = function(req, res, next){
        var that = this;
  //debe recibir el req.body._balanceId.
        console.log("body");
        console.log(req.body);
        that.getBalanceAnterior(req.body._balanceId, function (err, model) {
            if(err){
                console.log("error en getBalanceAnterior");
                console.dir(err);
            }
            
            if(model.length === 0){
                model = [{value: 0}];
            }

            that.models.rubro.findById(req.body._rubro, function 
            (err, rubroObj) {
                    if (err) return next(err);
                var producto = that.productoFactory.get();
                for(var property in req.body) {
                    producto[property] = req.body[property];
                };
                producto._rubro = rubroObj._id;
                producto.balance = that.balanceActual(producto.tipo, model[0].value, producto.cantidad);
                producto.save(function(err, producto) {
                    if(err){
                        Object.keys(err.errors).forEach(function(key) {
                            var message = err.errors[key].message;
                            console.log('Validation error for "%s": %s', key, message);
                        });
                    }
                    console.log("producto");
                    console.log(producto);
                    res.json(producto);
                }); 
            });
        }); 
    };
    
    ProductosApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.producto.findOne({ _id: req.params.id })
        .populate('_rubro')
        .exec(function (err, producto) {
            if (err) return next(err);

            console.log(producto);
      
            res.json(producto);
        });
    };
    
    ProductosApi.prototype.update = function(req, res, next) {
        var that = this;
        
        console.log("updatemethod");
        console.log(req.body);

        that.models.producto.findById(req.body.id, function (err, producto) {
            if(err) return next(err);
            producto.fecha = req.body.fecha;
            producto.nombre = req.body.nombre;
            producto._rubro = req.body._rubro;
            producto.tipo = req.body.tipo;
            producto.cantidad = req.body.cantidad;
            producto.comentarios = req.body.comentarios;
            
            producto.save(function(err, producto) {
                if(err){
                    Object.keys(err.errors).forEach(function(key) {
                        var message = err.errors[key].message;
                        console.log('Validation error for "%s": %s', key, message);
                    });
                }
                res.json(producto);
            }); 
        });
    };
                                    
    ProductosApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.producto.findByIdAndRemove(req.params.id, function(err, producto) {
            if(err) return next(err);
            res.json(producto);
        }); 
    };      
    
    return ProductosApi;
})();

module.exports = ProductosApi;