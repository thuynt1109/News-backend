const db = require("../models");
const Category = db.category;

// Create and Save a new category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.category_name) {
        res.status(400).send({ message: "category_name can not be empty!" });
        return;
    }

    // Create a category
    const category = new Category({
        category_name: req.body.category_name,
        published: req.body.published ? req.body.published : false
    });

    // Save Category in the database
    category
        .save(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
};

// Retrieve all Category from the database.
exports.getAll = (req, res) => {
    const category_name = req.query.category_name;
    var condition = category_name ? { category_name: { $regex: new RegExp(category_name), $options: "i" } } : {};

    Category.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving category."
            });
        });
};
// Find a single Category with an id
exports.getById = (req, res) => {
    const id = req.params.id;

    Category.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Category with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Category with id=" + id });
        });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found!`
                });
            } else res.send({ message: "Category was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            } else {
                res.send({
                    message: "Category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};

// Delete all Category from the database.
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Category were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all category."
            });
        });
};