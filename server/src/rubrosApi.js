var RubrosApi = (function() {
    var RubrosApi = function(models, rubroFactory) {
        this.models = models;
        this.rubroFactory = rubroFactory;
    };
    
    RubrosApi.prototype.getAll = function(req, res, next) {
        var that = this;
        console.log("params e getallrubros");
        console.log(req.params);
        that.models.rubro.find({_userId: req.params.userId}, function (err, rubros) {
            if (err) return next(err);
            console.log(rubros);
            res.json(rubros);
        });
    };
    
    RubrosApi.prototype.save = function(req, res, next){
        var that = this;
        var rubro = that.rubroFactory.get();
        console.log("body");
        console.log(req.body);
        for(var property in req.body) {
            rubro[property] = req.body[property];
        };
        rubro.save(function(err, rubro) {
            if(err){
                console.log(err.message);
            }
            console.log("rubro");
            console.log(rubro);
            res.json(rubro);
        }); 
    };
    
    RubrosApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.rubro.findById(req.params.id, function (err, rubro) {
            if(err) return next(err);
            res.json(rubro);
        });
    };
    
    RubrosApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.rubro.findById(req.body.id, function (err, rubro) {
            if(err) return next(err);
            
            rubro.nombre = req.body.nombre;
            
            rubro.save(function(err, rubro) {
                if(err){
                    console.log(err.message);
                }
                res.json(rubro);
            }); 
        });
    };
                                    
    RubrosApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.rubro.findByIdAndRemove(req.params.id, function(err, rubro) {
            if(err) return next(err);
            res.json(rubro);
        }); 
    };      
    
    return RubrosApi;
})();

module.exports = RubrosApi;