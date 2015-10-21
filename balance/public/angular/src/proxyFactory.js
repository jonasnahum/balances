(function() {
    var app = angular.module('app');
    
    app.factory('proxyFactory', ['$http', '$log', function($http, $log) {//singleton.
        
        var Proxy = function(url) {
            this.url = url;
        };
        
        Proxy.prototype.error = function(data, status, headers, config){
            $log.error('%s %s %s', config.method, config.url, status);
        };
        
        Proxy.prototype.getOne = function(id, success) {
            var that = this;
            $http({
                method: "GET",
                url: that.url + id
            }).success(success).error(that.error);
        };
        Proxy.prototype.getOneRubro = function(id, success) {
            var that = this;
            $http({
                method: "GET",
                url: that.url + "oneRubro/" + id
            }).success(success).error(that.error);
        };
        Proxy.prototype.getOneBalance = function(id, success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url + "oneBalance/" + id
            }).success(success).error(that.error);
        };
        Proxy.prototype.getOneProduct = function(id, success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url + "OneProduct/" + id
            }).success(success).error(that.error);
        };
        
        Proxy.prototype.getAll = function(success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url
            }).success(success).error(that.error);
        };
        Proxy.prototype.getAllFromThisUser = function(userId, success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url + userId
            }).success(success).error(that.error);
        };
        Proxy.prototype.getAllFromThisBalance = function(balanceId, success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url + balanceId
            }).success(success).error(that.error);
        };
        
        Proxy.prototype.getByDateFromThisBalance = function(balanceId, fechaInicio, fechaLimite, success) {
            var that = this;
            $http({
                method: 'GET',
                url: that.url + "fechaBalance/" + balanceId + "/"+ fechaInicio + "/" + fechaLimite,
            }).success(success).error(that.error);
        };
        
        Proxy.prototype.delete = function(id, success) {
            var that = this;
            $http({
                method: "DELETE",
                url: that.url + id
            }).success(success).error(that.error);       
        };
        
        Proxy.prototype.save = function(model, success) {
            var that = this;
            $http({
                method: 'POST',
                url: that.url,
                data: model
            }).success(success).error(that.error);
        };
        
        Proxy.prototype.update = function(model, success) {
            var that = this;
            $http({
                method: 'PUT',
                url: that.url,
                data: model
            }).success(success).error(that.error);
        };
        
        return function(url) {
            return new Proxy(url);
        };
    }]);
})();
