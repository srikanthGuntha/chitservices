var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Chitids = require('../models/chitid');

var branches = {
	getchitids: function(req, res) {
		try{
			Chitids.find({userid: req.sessionuid}, function(err, result){
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
	getpopulatechitids: function(req, res){
		try{
			Chitids.find({userid: req.sessionuid}).populate('userid branch').exec(function(err, result) {
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
	savechitids: function(req, res){
		try{
			var chitidsdata = new Chitids({
		        chitid: req.body.chitid,
		        branch: req.body.branch,
		        userid: req.sessionuid
		    });
			chitidsdata.save(function(err, result){
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
	updatechitids: function(req, res){
		try{
			let chitiddata = req.body;
			let chitid = req.actionid;
			delete chitiddata._id;
			Chitids.update({ _id: chitid }, { $set: chitiddata}, function(err, result){
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
	deletechitids: function(req, res){
		try{
			let chitid = req.actionid;
			Chitids.findOneAndRemove({ _id: chitid }, function(err, result){
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