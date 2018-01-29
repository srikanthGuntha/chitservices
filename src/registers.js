var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
    useMongoClient: true
});

var Register = require("../models/register");

var registers = {
    getregisters: function(req, res) {
        try{
            Register.find({creator_id: req.sessionuid}, function(err, result){
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
    saveregisters: function(req, res){
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
                creator_role: registerdata.creator_role,
                creator_id: registerdata.creator_id
            });
            register.save(function(err, result){
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
    updateregisters: function(req, res){
        try{
            let registerdata = req.body;
            let registerid = req.actionid;
            registerdata.updated_at = Date.now();
            delete registerdata._id;
            Register.update({ _id: registerid }, { $set: registerdata}, function(err, result){
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
    deleteregisters: function(req, res){
        try{
            let registerid = req.actionid;
            Register.findOneAndRemove({ _id: registerid }, function(err, result){
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

module.exports = registers;