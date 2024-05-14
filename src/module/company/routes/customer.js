const express = require("express");
const customerController = require("../controllers/customer");
const Customer = require('../../../schemas/Customer')
const upload = require('../../../middleware/multerCloudinary');
const advancedResults = require('../../../middleware/advancedResults');
const { protect, authorize } = require('../../../middleware/auth');
//--////////////////////////////////
let routes = function(){
    let routes = express.Router({mergeParams: true});
    //--////////////////////////////////
    routes.route("/fetch").get([protect], advancedResults(Customer), customerController.fetch);
    //--////////////////////////////////
    routes.route("/create").post([protect], customerController.create);
    // routes.route("/create").post([protect], [upload.array('photos')], customerController.create);
    //--////////////////////////////////
    routes.route("/update/:id").put([protect], customerController.update);
    // routes.route("/update/:id").put([protect], [upload.array('photos')], customerController.update);
    //--////////////////////////////////
    routes.route("/delete/:id").delete([protect], customerController.delete);
    //--////////////////////////////////
    return routes;
};
//--////////////////////////////////
module.exports = routes;