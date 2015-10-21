module.exports = (function() {
    var ProductosController = function(express, productosApi, tokenMiddleware) {
        this.express = express.module;
        this.productosApi = productosApi;
        this.router = this.express.Router();
        
        var router = this.router;
        
        router.get('/:balanceId', tokenMiddleware.validate.bind(tokenMiddleware), productosApi.getAll.bind(productosApi));
        
        router.get('/fechaBalance/:balanceId/:fechaInicio/:fechaLimite', tokenMiddleware.validate.bind(tokenMiddleware), productosApi.getByDateFromBalance.bind(productosApi));
        
        router.post('/',  tokenMiddleware.validate.bind(tokenMiddleware), productosApi.save.bind(productosApi));
        
        router.get('/OneProduct/:id',  tokenMiddleware.validate.bind(tokenMiddleware), productosApi.getOne.bind(productosApi));
        
        router.put('/',  tokenMiddleware.validate.bind(tokenMiddleware), productosApi.update.bind(productosApi));
        
        router.delete('/:id',  tokenMiddleware.validate.bind(tokenMiddleware), productosApi.delete.bind(productosApi));

    }
    
    return ProductosController;
})();