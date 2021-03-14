module.exports = mongoose => {
    const Contact = mongoose.model(
        "contact",
        mongoose.Schema({
            contact_name: String,
            contact_phone: String,
            contact_email: String,
            contact_message: String,
            st: Boolean,
        }, { timestamps: true })
    );
    return Contact;
}