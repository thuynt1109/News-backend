"use strict";

module.exports = function(app) {
    var category = require("../controllers/category.controller");
    var users = require("../controllers/users.controller");
    var contact = require("../controllers/contact.controller");
    var blog = require("../controllers/blog.controller");
    var router = require("express").Router();


    router.post("/category/create", category.create);

    router.get("/category/getAll", category.getAll);

    router.get("/category/:id", category.getById);

    router.put("/category/:id", category.update);

    router["delete"]("/category/:id", category["delete"]);

    router["delete"]("/category/", category.deleteAll);
    // ----------------------------------//
    router.post("/users/create", users.create);
    router.get("/users/getAll", users.getAll);
    router.get("/users/:id", users.getById);
    router.put("/users/:id", users.update);
    router.delete("/users/:id", users.delete);
    // --------------------------------------//
    router.post("/contact/create", contact.create);
    router.get("/contact/getAll", contact.getAll);
    router.get("/contact/:id", contact.getById);
    router.put("/contact/:id", contact.update);
    router.delete("/contact/:id", contact.delete);
    // ---------------------------------------------
    router.post("/blog/create", blog.create);
    router.get("/blog/getAll", blog.getAll);
    router.get("/blog/:id", blog.getById);
    router.put("/blog/:id", blog.update);
    router.delete("/blog/:id", blog.delete);
    app.use('/api', router);



};