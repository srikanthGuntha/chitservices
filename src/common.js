var mongo = require('mongodb');
var async = require("async");
var db = require("../config/dbconfig").db;
var utils = require("../utils/response");

var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Chit = require('../models/chit');
var Register = require("../models/register");
var Contact = require("../models/contact");

var common = {
	getpopulatechits: function(req, res){
		Chit.find().populate('branch chitid').exec(function(err, result) {
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	isemailexists: function(req, res){
		try{
			var emaildata = req.body.email;

			Register.findOne({
                email: req.body.email
            }, function(err, user) {
                if(err){
                    return res.json(utils.makerespobj(false, 101810, "Incorrect input data.", err));
                } else {
                    if(!user) {
                        return res.json(utils.makerespobj(true, 200200, "Data not exists"));
                    } else {
                        return res.json(utils.makerespobj(true, 200201, "Data exists"));
                    }
                }
            });
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal server error.", err));
		}
	},
	ismobileexists: function(req, res){
		try{
			var emaildata = req.body.email;

			Register.findOne({
                mobile: req.body.mobile
            }, function(err, user) {
                if(err){
                    return res.json(utils.makerespobj(false, 101810, "Incorrect input data.", err));
                } else {
                    if(!user) {
                        return res.json(utils.makerespobj(true, 200200, "Data not exists"));
                    } else {
                        return res.json(utils.makerespobj(true, 200201, "Data exists"));
                    }
                }
            });
		} catch(err) {
			return res.json(utils.makerespobj(false, 500500, "Internal server error.", err));
		}
	},
    savecontactinfo: function(req, res) {
        try{
            var contactbody = req.body;
            var contact = new Contact({
                fullname: contactbody.fullname,
                mobile: contactbody.mobile,
                email: contactbody.email,
                city: contactbody.city,
                comments: contactbody.comments
            });
            contact.save(function(err, result){
                if(err){
                    return res.json(utils.makerespobj(false, 400101, "Something wrong with input data.", err)); 
                } else {
                    return res.json(utils.makerespobj(true, null, "Operation is successfull.", result));
                }
            });
        } catch(err) {
            return res.json(utils.makerespobj(false, 500500, "Internal server error.", err));
        }
    }
};

module.exports = common;