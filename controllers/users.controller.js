const db = require("../models");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
// const bcrypt = require('bcrypt');
const Users = db.users;

exports.create = (req, res) => {
    var hashedPassword = md5(req.body.password);
    if (!req.body.user_name) {
        res.status(400).send({ message: "user_name can not be empty !" });
        return;
    }
    const users = new Users({
        username: req.body.username,
        password: hashedPassword,
        user_name: req.body.user_name,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        permission: req.body.permission,
    });
    users
        .save(users)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occurred while creating the user",
            });
        });
};
exports.getAll = (req, res) => {
    const user_name = req.query.user_name;
    var condition = user_name ? { user_name: { $regex: new RegExp(user_name), $option: "i" } } : {};

    Users.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retriewing user.",
            });
        });
};
exports.getById = (req, res) => {
    const id = req.params.id;

    Users.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "not found user with id :" + id });
            } else res.send(data);
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: "Error retrieving Category with id=" + id });
        });
};
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not empty!",
        });
    }
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false,
        })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Category with id=${id}. Maybe user was not found !`,
                });
            } else res.send({ message: "user was updated sucessfuly." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating user with id=" + id,
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `can not delete with id=${id}. Maybe user was not found!`,
                });
            } else {
                res.send({
                    message: "user was deletes successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete user with id: " + id,
            });
        });
};

exports.login = (req, res, next) => {
    Users.findOne({
            username: req.body.username,
        },
        function(err, result) {
            if (err) {
                return res.send({
                    exitcode: 0,
                    data: {},
                    message: "Err",
                });
            } else {
                if (result == null) {
                    return res.send({
                        exitcode: 0,
                        data: result,
                        message: "Wrong users",
                    });
                } else {
                    // console.log(result.password);
                    // const passLogin = bcrypt.compare(req.body.password, result.password);
                    // console.log(req.body.password);
                    // console.log("passLogin:" + passLogin);
                    if (result.password != md5(req.body.password))
                        return res.status(400).send({
                            message: "Wrong password!",
                        });
                    else {
                        payload = {
                            username: req.body.username,
                            password: req.body.password,
                        };
                        secret = "tqh";
                        token = jwt.sign(payload, secret, { expiresIn: "1000s" });
                        next();
                        return res.send({
                            exitcode: 1,
                            encode: token,
                            message: "Get token successful",
                        });
                    }
                }
            }
        }
    );
};
exports.decode = (req, res) => {

    x = req.body;

    token = x.token;

    secret = "tqh";
    try {
        decoded = jwt.verify(token, secret);
        var us = decoded.username;
        pas = decoded.password;
        // console.log(pas);
        Users.findOne({ "username": us, "password": md5(pas) })
            .then((data) => {
                res.send({
                    exitcode: 1,
                    decode: data,
                    message: "Decode token successful",
                });
            })
            .catch((err) => {
                return res.send({
                    exitcode: 0,
                    encode: {},
                    message: "User does not exist! ",
                });
            });
    } catch (error) {
        return res.send({
            exitcode: 0,
            encode: {},
            message: "Expired Time or token invalid",
        });

    }



    // try {


    //     return res.send({
    //         exitcode: 1,
    //         decode: decoded,
    //         message: "Decode token successful",
    //     });
    // } catch (error) {
    //     return res.send({
    //         exitcode: 0,
    //         encode: {},
    //         message: "Expired Time or token invalid",
    //     });
    // }

};