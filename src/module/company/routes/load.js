const express = require("express");
const loadController = require("../controllers/load");
const Load = require('../../../schemas/Load')
const upload = require('../../../middleware/multerCloudinary');
const advancedResults = require('../../../middleware/advancedResults');
const { protect, authorize } = require('../../../middleware/auth');
//--////////////////////////////////
let routes = function(){
    let routes = express.Router({mergeParams: true});
    //--////////////////////////////////
    routes.route("/fetch").get([protect], loadController.fetch);
    // routes.route("/fetch").get([protect], advancedResults(Load), loadController.fetch);
    //--////////////////////////////////
    routes.route("/create").post([protect], [upload.array('assets')], loadController.create);
    //--////////////////////////////////
    routes.route("/update/:id").put([protect], [upload.array('assets')], loadController.update);
    //--////////////////////////////////
    routes.route("/delete/:id").delete([protect], loadController.delete);
    //--////////////////////////////////
    return routes;
};
//--////////////////////////////////
module.exports = routes;