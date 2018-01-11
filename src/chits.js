var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Chit = require('../models/chit');

var chits = {
	getpopulatechits: function(req, res){
		try{
			Chit.find({userid: req.sessionuid}).populate('branch chitid').exec(function(err, result) {
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
	getchits: function(req, res){
		try{
			Chit.find({userid: req.sessionuid}, function(err, result){
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
	updatechits: function(req, res){
		try{
			let chitdata = req.body;
			let chitid = req.actionid;
			delete chitdata._id;
			Chit.update({ _id: chitid }, { $set: chitdata}, function(err, result){
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
	deletechits: function(req, res){
		try{
			let chitid = req.actionid;
			Chit.findOneAndRemove({ _id: chitid }, function(err, result){
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

module.exports = chits;