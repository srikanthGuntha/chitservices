var JWT = require("jsonwebtoken");
var ObjectId = require('mongodb').ObjectID;
var db = require("../config/dbconfig").db;
var utils = require("../utils/response");
var mongo = require('mongodb');

var Register = require("../models/register");

var auth = {
    login: function(req, res) {
        try {
            Register.findOne({
                email: req.body.email
            }, function(err, user) {
                if(err){
                    return res.json(utils.makerespobj(false, 101804, "Authentication failed. User not found.", err));
                } else {
                    if(!user) {
                        return res.json(utils.makerespobj(false, 2018404, "User doen't exists in db."));
                    } else {
                        if(user.password !== req.body.password) {
                            return res.json(utils.makerespobj(false, 101805, "Authentication failed. Wrong password."));
                        } else {
                            user = user.toObject();
                            user.token = generateToken(user["_id"]);

                            delete user["password"];
                            return res.json(utils.makerespobj(true, null, "Login successfull.", user));
                        }
                    }
                }
            });
        } catch(err) {
            return res.json(utils.makerespobj(false, 500500, "Internal server error."));
        }
        // var queryuser = req.body;
        // Register.find(queryuser, function(err, result){
        //     if (err) res.json(utils.response("failure", { "errmsg": err }));

        //     if(result.length > 0){
        //         var data = result[0].toObject();
        //         var token = generateToken(data["_id"]);
        //         data.token = token;

        //         res.json(utils.response("success", data));
        //     } else {
        //         if (err) res.json(utils.response("failure", { "errmsg": "Invalid login details" }));
        //     }
        // });
    },
    register: function(req, res) {
        try {
            var registerdata = req.body;
            var register = new Register({
                firstname: registerdata.firstName,
                lastname: registerdata.lastName,
                email: registerdata.email,
                mobile: registerdata.mobileNumber,
                password: registerdata.password,
                dob: registerdata.dob,
                address1: registerdata.address,
                address2: registerdata.address2,
                city: registerdata.city,
                state: registerdata.state,
                pincode: registerdata.pincode,
                idtype: registerdata.IdType,
                idnumber: registerdata.IdNumber,
            });

            register.save(function(err, result){
                if (err) return res.json(utils.makerespobj(false, 800012, "Something wrong with the input data.", err));

                return res.json(utils.makerespobj(true, null, "Registration was successfull."));
            });
        } catch(err) {
            return res.json(utils.makerespobj(false, 500500, "Internal server error."));
        }
        // var registerdata = req.body;
        // var register = new Register({
        //     firstname: registerdata.firstname,
        //     lastname: registerdata.lastname,
        //     email: registerdata.email,
        //     password: registerdata.password
        // });
        // register.save(function(err, result){
        //     if (err) res.json(utils.response("failure", { "errmsg": err }));
            
        //     res.json(utils.response("success", result));
        // });
    },
    login1: function(req, res) {
        try {
            var logindata = req.body;
            db.registers.find(logindata, function(err, result) {
                if (err) res.json(utils.response("failure", { "errmsg": err }));
                var data = result[0];
                if(data && data["_id"]) {
                    token = generateToken(data["_id"]);
                    data.token = token;
                    res.json(utils.response("success", data));
                } else {
                    res.json(utils.response("failure", { "cmsg": "No user found with the credentials." }));
                }
            });
        } catch (err) {
            res.json(utils.response("failure", { "errmsg": err }));
        }
    },
    register1: function(req, res) {
        try {
            var userdata = req.body;
            if (!userdata) {
                res.json(utils.response("failure", { "errmsg": "Something wrong with input data!" }));
            } else {
                userdata.role = "user";
                userdata.timestamp = new Date();
                db.users.insert(userdata, function(err, result) {
                    if (err) res.json(utils.response("failure", { "errmsg": err }));
                    delete result["_id"];
                    delete result["password"];
                    res.json(utils.response("success", result));
                });
            }
        } catch (err) {
            res.json(utils.response("failure", { "errmsg": err }));
        }
    }
};

function generateToken(userid){
	return JWT.sign({
		iss: 'keepitup',
		sub: userid
	}, 'keepitupauth', { expiresIn: '0.333333h' });
}

module.exports = auth;