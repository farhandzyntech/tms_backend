const express = require("express");
//--//
let routes = function(){
    const router = express();
    //--//
    // router.use("/home", require("./routes/home")());
    router.use("/carrier", require("./routes/carrier")());
    //--//
    return router;
};
module.exports = routes;