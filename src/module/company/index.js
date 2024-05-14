const express = require("express");
//--//
let routes = function(){
    const router = express();
    //--//
    // router.use("/home", require("./routes/home")());
    router.use("/carrier", require("./routes/carrier")());
    router.use("/shipper", require("./routes/shipper")());
    router.use("/consignee", require("./routes/consignee")());
    router.use("/customer", require("./routes/customer")());
    //--//
    return router;
};
module.exports = routes;