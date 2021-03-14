const db = require("../models");
const Blog = db.blog;

exports.create = (req, res) => {
    if (!req.body.id_category && !req.body.id_user && !req.body.blog_name) {
        res.status(400).send({ message: "id_category,id_user,blog_name can not be empty!" })
        return;
    }
    const blog = new Blog({
        id_category: req.body.id_category,
        id_user: req.body.id_user,
        blog_name: req.body.blog_name,
        blog_title: req.body.blog_title,
        blog_description: req.body.blog_description,
        blog_seen: req.body.blog_seen
    });
    blog
        .save(blog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the blog"
            });
        });
};
exports.getAll = (req, res) => {
    const blog_name = req.query.blog_name;
    let condition = blog_name ? { blog_name: { $regex: new RegExp(blog_name), $options: "i" } } : {};
    Blog.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Blog."
            });
        });
};