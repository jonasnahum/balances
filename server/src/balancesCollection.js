var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    nombre: { type: String, required: true  },
    _userId:  { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' },
});

module.exports = mongoose.model('Balance', schema);