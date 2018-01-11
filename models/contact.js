var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    fullname: {
    	type: String,
    	required: true
    },
    mobile: {
    	type: Number,
    	required: true
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    comments: {
        type: String,
        required: true
    },
    created_at : {
    	type: Date,
    	required: true,
    	default: Date.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

var Contact = mongoose.model('Contact', schema);
module.exports = Contact;