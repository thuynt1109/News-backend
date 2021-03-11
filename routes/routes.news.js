"use strict";

module.exports = function(app) {
    var category = require("../controllers/category.controller");


    var router = require("express").Router();


    router.post("/category/create", category.create);

    router.get("/category/getAll", category.findAll);

    router.get("/category/published", category.findAllPublished);
    router.get("/:id", category.findOne);

    router.put("/category/getById/:id", category.update);

    router["delete"]("/category/:id", category["delete"]);

    router["delete"]("/category/", category.deleteAll);

    app.use('/api', router);
};