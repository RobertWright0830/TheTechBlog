const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

//use the routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

//export the router
module.exports = router;