var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    chitvalue: {
        type: Number,
        required: true
    },
    chitstartdate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tenure: {
        type: Number,
        required: true
    },
    subfee: {
        type: Number,
        required: true
    },
    activemembers: {
        type: Number,
        required: true,
        default: 0
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    chitid: {
        type: Schema.Types.ObjectId,
        ref: "Chitid",
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

var Chit = mongoose.model('Chit', schema);
module.exports = Chit;