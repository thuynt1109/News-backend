const db = require("../models");
const Users = db.users;

exports.create = (req, res) => {
    if (!req.body.user_name) {
        res.status(400).send({ message: "user_name can not be empty !" });
        return;
    }
    const users = new Users({
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        permission: req.body.permission
    });
    users
        .save(users)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occurred while creating the user"
            });
        });
};
exports.getAll = (req, res) => {
    const user_name = req.query.user_name;
    var condition = user_name ? { user_name: { $regex: new RegExp(user_name), $option: "i" } } : {};

    Users.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retriewing user."
            });
        });
};
exports.getById = (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "not found user with id :" + id });
            } else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Category with id=" + id });
        });
};
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not empty!"
        });
    }
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Category with id=${id}. Maybe user was not found !`
                });

            } else res.send({ message: "user was updated sucessfuly." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `can not delete with id=${id}. Maybe user was not found!`

                });
            } else {
                res.send({
                    message: "user was deletes successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id: " + id
            });
        });
};