var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var lengthValidator = function(val) {
    if (val && val.length <= 30){
        return true;
    }
    return false;
};

var validateNombre = [
    {validator: lengthValidator, msg: 'mongoose requiere menos letras en categoría'}
];

var schema = mongoose.Schema({
    nombre: { type: String, required: true, validate: validateNombre },
    _userId:  { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' }
});

module.exports = mongoose.model('Rubro', schema);
