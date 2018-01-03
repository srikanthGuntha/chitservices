var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
	firstname: {
		type: String,
    	required: true,
	},
	lastname: {
		type: String,
    	required: true,
	},
	email: {
		type: String,
    	required: true,
	},
	mobile: {
		type: String
	},
	password: {
		type: String,
    	required: true,
	},
    role: {
    	type: String,
    	required: true,
    	default: "user"
    },
    created_at: {
    	type: Date,
    	required: true,
    	default: Date.now()
    }
});

var Register = mongoose.model('Register', registerSchema);
module.exports = Register;