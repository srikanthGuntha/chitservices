var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    chitid: {
    	type: String,
    	required: true
    },
    userid: {
    	type: Schema.Types.ObjectId,
        ref: "Register"
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    created_at : {
    	type: Date,
    	required: true,
    	default: Date.now()
    }
});

var Chitid = mongoose.model('Chitid', schema);
module.exports = Chitid;