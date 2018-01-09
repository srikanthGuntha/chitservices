var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Chit = require('../models/chit');

var chits = {
	getpopulatechits: function(req, res){
		Chit.find({userid: req.sessionuid}).populate('branch chitid').exec(function(err, result) {
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	getchits: function(req, res){
		Chit.find({userid: req.sessionuid}, function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	savechits: function(req, res){
		try {
			var chitdata = req.body;
			var chit = new Chit({
		        chitvalue: chitdata.chitvalue,
		        tenure: chitdata.tenure,
		        subfee: chitdata.subfee,
		        branch: chitdata.branch,
		        chitid: chitdata.chitid,
		        userid: req.sessionuid
		    });
			chit.save(function(err, result){
				if(err) {
					if (err) res.json(utils.response("failure", { "errmsg": err }));	
				} else {
					res.json(utils.response("success", result));	
				}
			});
		} catch(err) {
			res.json(utils.response("failure", { "errmsg": err }));
		}
	},
	updatechits: function(req, res){
		let chitdata = req.body;
		let chitid = req.actionid;

		delete chitdata._id;

		Chit.update({ _id: chitid }, { $set: chitdata}, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	},
	deletechits: function(req, res){
		let chitid = req.actionid;
		
		Chit.findOneAndRemove({ _id: chitid }, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	}
}

module.exports = chits;