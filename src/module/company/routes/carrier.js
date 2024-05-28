const express = require("express");
const carrierController = require("../controllers/carrier");
const Carrier = require('../../../schemas/Carrier')
const upload = require('../../../middleware/multerCloudinary');
const advancedResults = require('../../../middleware/advancedResults');
const { protect, authorize } = require('../../../middleware/auth');
//--////////////////////////////////
let routes = function(){
    let routes = express.Router({mergeParams: true});
    //--////////////////////////////////
    routes.route("/fetch").get([protect], advancedResults(Carrier), carrierController.fetch);
    //--////////////////////////////////
    routes.route("/create").post([protect], upload.array('assets'), carrierController.create);
    // routes.route("/create").post([protect], [upload.array('photos')], carrierController.create);
    //--////////////////////////////////
    routes.route("/update/:id").put([protect], upload.array('assets'), carrierController.update);
    // routes.route("/update/:id").put([protect], [upload.array('photos')], carrierController.update);
    //--////////////////////////////////
    routes.route("/delete/:id").delete([protect], carrierController.delete);
    //--////////////////////////////////
    return routes;
};
//--////////////////////////////////
module.exports = routes;