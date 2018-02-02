var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Branch = require('../models/branch');

var branches = {
	getbranches: function(req, res) {
		try{
			Branch.find({userid: req.sessionuid}, function(err, result){
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
				}
			});
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));	
		}
	},
	savebranches: function(req, res){
		try {
			var branch = new Branch({
		        branchname: req.body.branchname,
		        userid: req.sessionuid
		    });

		    Branch.findOne({branchname: req.body.branchname}, function(err, result){
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					if(result && result.length > 0){
						return res.json(utils.makerespobj(true, 4000102, "Branch already exists", result));
					}
					else{
						branch.save(function(err, result){
							if(err){
								return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
							} else {
								return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
							}
						});
					}
				}
			});


			// branch.save(function(err, result){
			// 	if(err){
			// 		return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
			// 	} else {
			// 		return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
			// 	}
			// });

		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));	
		}
	},
	updatebranches: function(req, res){
		try {
			let branch = req.body;
			let branchid = req.actionid;

			delete branch._id;
			Branch.update({ _id: branchid }, { $set: branch}, function(err, result){
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
				}
			});
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));	
		}
	},
	deletebranches: function(req, res){
		try{
			let branchid = req.actionid;
			
			Branch.findOneAndRemove({ _id: branchid }, function(err, result){
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
				}
			});
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));	
		}
	},
	getonebranch: function(req, res) {
		try {
			let uniquebranchid = req.body.id;
			Branch.find({_id: uniquebranchid, userid: req.sessionuid}, function(err, result){
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
				}
			});
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));	
		}
	},
	getpopulatebranches: function(req, res){
		try{
			Branch.find({userid: req.sessionuid}).populate('userid', "firstname").exec(function(err, result) {
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
				}
			});
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));	
		}
	}
}

module.exports = branches;