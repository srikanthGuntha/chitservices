var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Userchit = require('../models/userchit');

var userchits = {
	getuserchits: function(req, res) {
		Userchit.find({userid: req.sessionuid}, function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	getpopulateuserchits: function(req, res){
		Userchit.find({userid: req.sessionuid}).populate('chit userid').exec(function(err, result) {
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	saveuserchits: function(req, res){
		console.log("userchitdata ", req.body);
		var userchit = new Userchit({
	        chit: req.body.chit_id,
	        userid: req.sessionuid
	    });

		userchit.save(function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	updateuserchits: function(req, res){
		let userchitdata = req.body;
		let userchitid = req.actionid;

		userchitdata.updated_at = Date.now();

		delete userchitdata._id;

		Userchit.update({ _id: userchitid }, { $set: userchitdata}, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	},
	deleteuserchits: function(req, res){
		let userchitid = req.actionid;
		
		Userchit.findOneAndRemove({ _id: userchitid }, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	}
}

module.exports = userchits;