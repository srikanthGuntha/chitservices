var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Branch = require('../models/branch');
var ChtiId = require('../models/chitid');

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
			branch.save(function(err, result){
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

            ChtiId.findOne({branch:req.actionid},function(err, result){
                if(result === null){
                    Branch.findOneAndRemove({ _id: branchid }, function(err, result){
			            if(err){
				            return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
			            } else {
				            return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
			            }
		            });
                }

                if(result){
                    return res.json(utils.makerespobj(false, 400101, "Associated chitid exists with this branch", err));
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