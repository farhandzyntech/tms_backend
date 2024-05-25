const express = require("express");
const dropdownController = require("../controllers/dropdown");
const { protect, authorize } = require('../../../middleware/auth');
//--////////////////////////////////
let routes = function(){
    let routes = express.Router({mergeParams: true});
    //--////////////////////////////////
    routes.route("/customers").get([protect],  dropdownController.customer);
    //--////////////////////////////////
    routes.route("/consignees").get([protect],  dropdownController.consignees);
    //--////////////////////////////////
    routes.route("/carriers").get([protect],  dropdownController.carriers);
    //--////////////////////////////////
    routes.route("/shippers").get([protect],  dropdownController.shippers);
    //--////////////////////////////////
    return routes;
};
//--////////////////////////////////
module.exports = routes;