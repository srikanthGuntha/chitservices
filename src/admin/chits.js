var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");

var chits = {
	getchits: function(req, res) {
		try {
			var userid = req.sessionuid;
			db.chits.find({userid: userid}).toArray(function (err, result) {
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch(err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	savechits: function(req, res){
		try {
	      var chitdata = req.body;
	      if(!chitdata){
	        res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
	      } else {
            chitdata.userid = req.sessionuid;
            chitdata.timestamp = new Date();
	        db.chits.insert(chitdata, function (err, result) {
	          if(err) res.json(utils.response("failure", {"errmsg": err}));

	          res.json(utils.response("success", result));
	        });
	      }
	    } catch(err) {
	      res.json(utils.response("failure", {"errmsg": err}));
	    }
	},
	updatechits: function(req, res){
		try {
            var chitdata = req.body;
			var chitid = chitdata.chitid;
			var chit_id = new mongo.ObjectID(chitid);
			var userid = req.sessionuid;
			var gquery = {"_id": chit_id, "userid": userid};

			delete chitdata.chitid;
			db.chits.update(gquery, {$set: chitdata}, function(err, result){
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	deletechits: function(req, res) {
		try{
			var chitid = req.body.chitid;
			var chit_id = new mongo.ObjectID(chitid);
			var userid = req.sessionuid;
			var gquery = { "_id": chit_id, "userid": userid};

			db.chits.remove(gquery, function(err, obj) {
				if (err) throw err;
				res.json(utils.response("success"));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err && err.message}));
		}
	}
}

module.exports = chits;