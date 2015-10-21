module.exports = (function() {
    var BalancesController = function(express, balancesApi, tokenMiddleware) {
        this.express = express.module;
        this.balancesApi = balancesApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/:userId', tokenMiddleware.validate.bind(tokenMiddleware), balancesApi.getAll.bind(balancesApi));
            
        router.post('/',  tokenMiddleware.validate.bind(tokenMiddleware), balancesApi.save.bind(balancesApi));

        router.get('/oneBalance/:id',  tokenMiddleware.validate.bind(tokenMiddleware), balancesApi.getOne.bind(balancesApi));
        
        router.put('/',  tokenMiddleware.validate.bind(tokenMiddleware), balancesApi.update.bind(balancesApi));
        
        router.delete('/:id',  tokenMiddleware.validate.bind(tokenMiddleware), balancesApi.delete.bind(balancesApi));
        
    }
    
    return BalancesController;
})();