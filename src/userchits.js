var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Userchit = require('../models/userchit');

var userchits = {
	getuserchits: function(req, res) {
		try {
			Userchit.find({userid: req.sessionuid}, function(err, result){
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
	getpopulateuserchits: function(req, res){
		try {
			var role = req.role;
			if(role === "admin"){
				Userchit.find()
				.lean()
				.populate({ path: 'chit userid' })
				.exec(function(err, docs) {
					if (err) return res.json(utils.makerespobj(false, 700102, "Something wrong with chitid data", err));

					var options = {
						path: 'chit.chitid',
						model: 'Chitid',
						select: 'chitid'
					};
					Userchit.populate(docs, options, function (err, result) {
						if(err){
							return res.json(utils.makerespobj(false, 700103, "Error while hitting user chit data", err));	
						} else {
							return res.json(utils.makerespobj(true, null, "User chit data retrieved successfully.", result));	
						}
					});
				});
			} else if(role==="agent") {
				Userchit.find({creator_id: req.sessionuid})
				.lean()
				.populate({ path: 'chit userid' })
				.exec(function(err, docs) {
					if (err) return res.json(utils.makerespobj(false, 700102, "Something wrong with chitid data", err));

					var options = {
						path: 'chit.chitid',
						model: 'Chitid',
						select: 'chitid'
					};
					Userchit.populate(docs, options, function (err, result) {
						if(err){
							return res.json(utils.makerespobj(false, 700103, "Error while hitting user chit data", err));	
						} else {
							return res.json(utils.makerespobj(true, null, "User chit data retrieved successfully.", result));	
						}
					});
				});
			} else {
				// we may or may not lean() below
				/* To populate only required fields
				*	.populate({ path: 'chit userid', chitvalue: 1, subfee: 1, tenure: 1, branch: 0, userid: 0, created_at: 0, activemembers: 0, chitstartdate: 0, __v: 0 })
				*/ 
				Userchit.find({userid: req.sessionuid})
				.lean()
				.populate({ path: 'chit userid' })
				.exec(function(err, docs) {
					if (err) return res.json(utils.makerespobj(false, 700102, "Something wrong with chitid data", err));

					var options = {
						path: 'chit.chitid',
						model: 'Chitid',
						select: 'chitid'
					};
					Userchit.populate(docs, options, function (err, result) {
						if(err){
							return res.json(utils.makerespobj(false, 700103, "Error while hitting user chit data", err));	
						} else {
							return res.json(utils.makerespobj(true, null, "User chit data retrieved successfully.", result));	
						}
					});
				});
			}
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));
		}
	},
	saveuserchits: function(req, res){
		try {
			var role = req.role;
			if( role === "agent" ) {
				var userchit = new Userchit({
			        chit: req.body.chit_id,
			        userid: req.body.userid,
			        creator_id: req.sessionuid,
			        creator_role: "agent"
			    });
			} else {
				var userchit = new Userchit({
			        chit: req.body.chit_id,
			        userid: req.sessionuid,
					creator_id: req.sessionuid,
					creator_role: "user"
			    });
			}
			
		    Userchit.find({chit: req.body.chit_id, userid: req.sessionuid}, function(err, result){
				if(err){
					return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
				} else {
					if(result && result.length > 0) {
						return res.json(utils.makerespobj(true, 400102, "User already joined request chit."));
					} else {
						userchit.save(function(err, result){
							if(err){
								return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err));	
							} else {
								return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
							}
						});
					}
				}
			});
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal data or connection problem.", err));
		}
	},
	updateuserchits: function(req, res){
		try {
			let userchitdata = req.body;
			let userchitid = req.actionid;

			userchitdata.updated_at = Date.now();
			delete userchitdata._id;

			Userchit.update({ _id: userchitid }, { $set: userchitdata}, function(err, result){
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
	deleteuserchits: function(req, res){
		try {
			let userchitid = req.actionid;
			Userchit.findOneAndRemove({ _id: userchitid }, function(err, result){
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

module.exports = userchits;