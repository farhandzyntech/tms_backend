const express = require("express");
const shipperController = require("../controllers/shipper");
const Shipper = require('../../../schemas/Shipper')
const upload = require('../../../middleware/multerCloudinary');
const advancedResults = require('../../../middleware/advancedResults');
const { protect, authorize } = require('../../../middleware/auth');
//--////////////////////////////////
let routes = function(){
    let routes = express.Router({mergeParams: true});
    //--////////////////////////////////
    routes.route("/fetch").get([protect], advancedResults(Shipper), shipperController.fetch);
    //--////////////////////////////////
    routes.route("/create").post([protect], [upload.array('assets')], shipperController.create);
    //--////////////////////////////////
    routes.route("/update/:id").put([protect], [upload.array('assets')], shipperController.update);
    //--////////////////////////////////
    routes.route("/delete/:id").delete([protect], shipperController.delete);
    //--////////////////////////////////
    return routes;
};
//--////////////////////////////////
module.exports = routes;