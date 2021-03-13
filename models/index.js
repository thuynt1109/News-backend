const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.category = require("./category.model")(mongoose);
db.users = require("./users.model")(mongoose);
db.contact = require("./contact.model.")(mongoose);

module.exports = db;