const express = require("express");
const consigneeController = require("../controllers/consignee");
const Consignee = require('../../../schemas/Consignee')
const upload = require('../../../middleware/multerCloudinary');
const advancedResults = require('../../../middleware/advancedResults');
const { protect, authorize } = require('../../../middleware/auth');
//--////////////////////////////////
let routes = function(){
    let routes = express.Router({mergeParams: true});
    //--////////////////////////////////
    routes.route("/fetch").get([protect], advancedResults(Consignee), consigneeController.fetch);
    //--////////////////////////////////
    routes.route("/create").post([protect], consigneeController.create);
    // routes.route("/create").post([protect], [upload.array('photos')], consigneeController.create);
    //--////////////////////////////////
    routes.route("/update/:id").put([protect], consigneeController.update);
    // routes.route("/update/:id").put([protect], [upload.array('photos')], consigneeController.update);
    //--////////////////////////////////
    routes.route("/delete/:id").delete([protect], consigneeController.delete);
    //--////////////////////////////////
    return routes;
};
//--////////////////////////////////
module.exports = routes;