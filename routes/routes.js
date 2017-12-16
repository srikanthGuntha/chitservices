var bodyParser = require("body-parser");
var auth = require("./auth");
var branches = require("../src/admin/branches");
var chitids = require("../src/admin/chitids");
var chits = require("../src/admin/chits");
var common = require("../src/common");

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
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.all('/api/v1/*', [require('../middleware/validateRequest')]);

        // user login registration
        app.post("/login", auth.login);
        app.post("/register", auth.register);

        // non auth but hit db services
        app.get("/getchitgroups", common.getchitgroups);

        /*******************************************************************
         * Admin servcies
        *******************************************************************/
        // branches
        app.post("/api/v1/savebranches", branches.savebranches);
        app.get("/api/v1/getbranches", branches.getbranches);
        app.put("/api/v1/updatebranches", branches.updatebranches);
        app.delete("/api/v1/deletebranches", branches.deletebranches);
        // chitids
        app.post("/api/v1/savechitids", chitids.savechitids);
        app.get("/api/v1/getchitids", chitids.getchitids);
        app.put("/api/v1/updatechitids", chitids.updatechitids);
        app.delete("/api/v1/deletechitids", chitids.deletechitids);
        // chits
        app.post("/api/v1/savechits", chits.savechits);
        app.get("/api/v1/getchits", chits.getchits);
        app.put("/api/v1/updatechits", chits.updatechits);
        app.delete("/api/v1/deletechits", chits.deletechits);

        // dummy services
        app.get("/", function(req, res) {
            res.send("Welcomes you to chit services my dear!!");
        });
    }
}
