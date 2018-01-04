var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    chit: {
        type: Schema.Types.ObjectId,
        ref: "Chit",
        required: true
    },
    chit_master: {
        type: Schema.Types.ObjectId,
        ref: "Register"
    },
    userid: {
    	type: Schema.Types.ObjectId,
        ref: "Register",
    	required: true
    },
    chitstatus: {
        type: Boolean,
        default: false
    },
    paymonth: {
        type: Date,
        default: Date.now()
    },
    paystatus: {
        type: Boolean,
        default: false
    },
    created_at: {
    	type: Date,
    	default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

var Userchit = mongoose.model('Userchit', schema);
module.exports = Userchit;