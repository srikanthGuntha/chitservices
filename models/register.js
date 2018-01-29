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
		type: String,
		required: true,
	},
	password: {
		type: String,
    	required: true,
	},
	dob: {
		type: Date,
		required: true
	},
	address1: {
		type: String,
		required: true
	},
	address2: {
		type: String,
		default: ""
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	pincode: {
		type: Number,
		required: true
	},
	idtype: {
		type: String,
		required: true
	},
	idnumber: {
		type: String,
		required: true
	},
    role: {
    	type: String,
    	required: true,
    	default: "user"
    },
    creator_role: {
    	//by default admin, send this property value as 'agent' when the loggedin user role is 'agent'
    	type: String,
    	default: "admin"
    },
    creator_id: {
    	type: Schema.Types.ObjectId,
        ref: "Register"
    },
    isactive: {
    	type: Boolean,
    	default: true
    },
    created_at: {
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

var Register = mongoose.model('Register', registerSchema);
module.exports = Register;