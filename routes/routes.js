var bodyParser = require("body-parser");
var auth = require("./auth");
var branches = require("../src/branches");
var chitids = require("../src/chitids");
var chits = require("../src/chits");
var common = require("../src/common");
// var chitsmgmt = require("../src/chitmgmt");
// var idbranches = require("../src/idbranches");

module.exports = {

    init: function(app) {
        // setting json on express to ge the json data
        app.use(bodyParser.json());
        // setting urlencoded on express to use encoded url
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        // to allow the CORS
        app.use(function(req, res, next) {
            var allowedOrigins = ['http://127.0.0.1:4200', 'https://chitservices.herokuapp.com'];
            var origin = req.headers.origin;
            if(allowedOrigins.indexOf(origin) > -1){
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            // res.setHeader("Access-Control-Allow-Origin", "https://cschits.herokuapp.com");
            res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, PATCH, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-delete-item-id");
            res.setHeader('Access-Control-Allow-Credentials', true);
            next();
        });

        app.all('/api/v1/*', [require('../middleware/validateRequest')]);

        // user login registration
        app.post("/login", auth.login);
        app.post("/register", auth.register);

        app.post("/loginnew", auth.login);
        app.post("/registernew", auth.register);

        // non auth but hit db services
        app.get("/getpopulatechits", common.getpopulatechits);
        // app.get("/getchitgroups", common.getchitgroups);
        // app.get("/api/v1/getidbranches", idbranches.getidbranches);

        // 
        // app.post("/api/v1/savemanagementchits", chitsmgmt.savemanagementchits);
        // app.get("/api/v1/getmanagementchits", chitsmgmt.getmanagementchits);
        // app.put("/api/v1/updatemanagementchits", chitsmgmt.updatemanagementchits);
        // app.delete("/api/v1/deletemanagementchits", chitsmgmt.deletemanagementchits);

        /*******************************************************************
         * Admin servcies
        *******************************************************************/
        // branches
        app.post("/api/v1/savebranches", branches.savebranches);
        app.get("/api/v1/getbranches", branches.getbranches);
        app.put("/api/v1/updatebranches", branches.updatebranches);
        app.delete("/api/v1/deletebranches", branches.deletebranches);
        app.post("/api/v1/getonebranch", branches.getonebranch);

        app.get("/api/v1/getpopulatebranches", branches.getpopulatebranches);

        // chitids
        app.post("/api/v1/savechitids", chitids.savechitids);
        app.get("/api/v1/getchitids", chitids.getchitids);
        app.put("/api/v1/updatechitids", chitids.updatechitids);
        app.delete("/api/v1/deletechitids", chitids.deletechitids);

        app.get("/api/v1/getpopulate", chitids.getpopulate);

        // chits
        app.post("/api/v1/savechits", chits.savechits);
        app.get("/api/v1/getpopulatechits", chits.getpopulatechits);
        app.get("/api/v1/getchits", chits.getchits);
        app.put("/api/v1/updatechits", chits.updatechits);
        app.delete("/api/v1/deletechits", chits.deletechits);

        // dummy services
        app.get("/", function(req, res) {
            res.send("Welcomes you to chit services my dear!!");
        });
    }
}
