var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");

var branches = {
	getbranches: function(req, res) {
		try {
			var userid = req.sessionuid;
			db.branches.find({userid: userid}).toArray(function (err, result) {
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch(err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	savebranches: function(req, res){
		try {
	      var branch = req.body;
	      if(!branch){
	        res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
	      } else {
            branch.userid = req.sessionuid;
            branch.timestamp = new Date();
	        db.branches.insert(branch, function (err, result) {
	          if(err) res.json(utils.response("failure", {"errmsg": err}));

	          res.json(utils.response("success", result));
	        });
	      }
	    } catch(err) {
	      res.json(utils.response("failure", {"errmsg": err}));
	    }
	},
	updatebranches: function(req, res){
		try {
			var branch = req.body;
			var branchid = branch.branchid;
			var branch_id = new mongo.ObjectID(branchid);
			var userid = req.sessionuid;
			var gquery = {"_id": branch_id, "userid": userid};

			delete branch.branch_id;
			db.branches.update(gquery, {$set: branch}, function(err, result){
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	deletebranches: function(req, res) {
		try{
			var branchid = req.body.branchid;
			var branch_id = new mongo.ObjectID(branchid);
			var userid = req.sessionuid;
			var gquery = { "_id": branch_id, "userid": userid};

			db.branches.remove(gquery, function(err, obj) {
				if (err) throw err;
				res.json(utils.response("success"));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err && err.message}));
		}
	}
}

module.exports = branches;