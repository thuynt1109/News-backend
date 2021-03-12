module.exports = mongoose => {
    const Users = mongoose.model(
        "users",
        mongoose.Schema({
            user_name: String,
            user_phone: String,
            user_email: String,
            permission: Number,
        }, { timestamps: true })
    );

    return Users;
};