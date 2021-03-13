const { contact } = require("../models");
const db = require("../models");
const Contact = db.contact;


exports.create = (req, res) => {
    if (!req.body.contact_nam && !req.body.contact_phone) {
        res.status(400).send({ message: "name and phone can not empty !" })
        return;
    }
    const contact = new Contact({
        contact_name: req.body.contact_name,
        contact_phone: req.body.contact_phone,
        contact_email: req.body.contact_email,
        contact_message: req.body.contact_message,
        st: req.body.status ? req.body.status : false
    });
    contact
        .save(contact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.mesage || "Some error occurred while creating the contact"
            });
        });
};
exports.getAll = (req, res) => {
    const contact_name = req.query.contact_name;
    let condition = contact_name ? { contact_name: { $regex: new RegExp(contacr_name), $options: "i" } } : {};

    contact.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurrend while retrieving category."
            });
        });
};
exports.getById = (req, res) => {
    const id = req.params.id;
    Contact.findById(id)
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
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Contact.findByIdAndUpdate(id, req.body, { useFindAndModifi: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update contact with id=${id}. Maybe contact was not found!`
                });
            } else res.send({ message: "Contact was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
                });
            } else {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contact with id=" + id
            });
        });
};