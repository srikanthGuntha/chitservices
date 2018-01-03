var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    branchname: {
    	type: String,
    	required: true
    },
    userid: {
    	type: Schema.Types.ObjectId,
        ref: "Register",
    	required: true
    },
    created_at : {
    	type: Date,
    	required: true,
    	default: Date.now()
    }
});

var Branch = mongoose.model('Branch', schema);
module.exports = Branch;