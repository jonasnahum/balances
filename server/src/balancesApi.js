var BalancesApi = (function() {
    var BalancesApi = function(models, balanceFactory) {
        this.models = models;
        this.balanceFactory = balanceFactory;
    };
    
    BalancesApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.balance.find({//buscar balances cuyo userid sea este.
            _userId: req.params.userId}).populate('_userId')
            .exec(function (err, balances) {
                if (err) return console.log(err);
                console.log(balances);
                res.json(balances);
            });   
    };

    BalancesApi.prototype.save = function(req, res, next){
        var that = this;
        var balance = that.balanceFactory.get();
        for(var property in req.body) {
            balance[property] = req.body[property];//espero que guarde _userId
        };
        balance.save(function(err, balance) {
            if(err){
                Object.keys(err.errors).forEach(function(key) {
                    var message = err.errors[key].message;
                    console.log('Validation error for "%s": %s', key, message);
                });
            }
            console.log("balance");
            console.log(balance);
            res.json(balance);
        }); 
    };
    
    BalancesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.balance.findOne({ _id: req.params.id })
        .populate('_userId')
        .exec(function (err, balance) {
            if (err) return next(err);
            console.log(balance);
            res.json(balance);
        });
    };
    
    BalancesApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.balance.findById(req.body.id, function (err, balance) {
            if(err) return next(err);
            balance.nombre = req.body.nombre;

            balance.save(function(err, balance) {
                if(err){
                    Object.keys(err.errors).forEach(function(key) {
                        var message = err.errors[key].message;
                        console.log('Validation error for "%s": %s', key, message);
                    });
                }
                res.json(balance);
            }); 
        });
    };
                                    
    BalancesApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.balance.findByIdAndRemove(req.params.id, function(err, balance) {
            if(err) return next(err);
            res.json(balance);
        }); 
    };      
    
    return BalancesApi;
})();

module.exports = BalancesApi;