var JWT = require("jsonwebtoken");
var utils = require("../utils/response");

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];
    var actionid = req.query.id;
    if (token) {
        try {
            JWT.verify(token, 'keepitupauth', function(err, decodedToken){
                if(err){
                    res.json(utils.response("failure", { "errmsg": err }));
                } else {
                    req.sessionuid = decodedToken.sub;
                    req.actionid = actionid;
                    next();
                }
            });
        } catch (err) {
            res.json(utils.response("failure", { "errmsg": err }));
        }
    } else {
        res.json(utils.response("failure", { "cmsg": "Request header must contains active token information." }));
    }
};