const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

//? index, show, store, update, destroy
//? web
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
//? mobile
routes.get("/search", SearchController.index);

module.exports = routes;
