var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    chitid: {
        type: String,
        required: true
    },
    chitstatus: {
    	type: Number,
    	required: true,
    	default: 0
    },
    userid: {
    	type: Schema.Types.ObjectId,
    	required: true
    },
    created_at : {
    	type: Date,
    	required: true,
    	default: Date.now()
    }
});

module.exports = mongoose.model('ChitMgmtModel', schema);