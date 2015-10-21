var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var lengthValidator = function(val) {
    if (val && val.length >= 3){
        return true;
    }
    return false;
};
var dosOpciones = function(val) {
    if ( val === "ingreso" || val === "egreso"  ){
        return true;
    }
    return false;
};

var validateNombre = [
    {validator: lengthValidator, msg: 'mongoose requiere nombre completo.'}
];
var validateTipo = [
    {validator: dosOpciones, msg: 'mongoose requiere la palabra ingreso o egreso.'}
];
var validateDecimal = [
    {validator: /^[0-9]{1,7}(\.[0-9]+)?$/, msg: 'mongoose requiere un número o numero con decimal.'}
];

var schema = Schema({
    fecha: { type: Date, default: Date.now },
    nombre: { type: String, required: true, validate: validateNombre },
    _rubro:  { type: Schema.Types.ObjectId, required: true, ref: 'Rubro' },
    _balanceId:  { type: Schema.Types.ObjectId, required: true, ref: 'Balance' },
    tipo: { type: String, required: true, validate: validateTipo },
    cantidad: { type: String, required: true, validate: validateDecimal },
    comentarios: { type: String },
    balance: { type: Number, required: 'mongoose requiere balance' },
});

module.exports = mongoose.model('Producto', schema);
