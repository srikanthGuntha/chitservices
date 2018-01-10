var JWT = require("jsonwebtoken");
var utils = require("../utils/response");

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];
    var role = req.headers['x-access-role'];
    var actionid = req.query.id;
    if (token) {
        try {
            JWT.verify(token, 'keepitupauth', function(err, decodedToken){
                if(err){
                    return res.json(utils.makerespobj(false, 101801, "Invalid token or expired, please login again.", err));
                } else {
                    req.sessionuid = decodedToken.sub;
                    req.actionid = actionid;
                    req.role = role;
                    next();
                }
            });
        } catch (err) {
            return res.json(utils.makerespobj(false, 500500, "Internal server error."));
        }
    } else {
        return res.json(utils.makerespobj(false, 101803, "Request headers must contains token information."));
    }
};