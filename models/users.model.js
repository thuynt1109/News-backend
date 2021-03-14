module.exports = mongoose => {
    const Users = mongoose.model(
        "users",
        mongoose.Schema({
            username: String,
            password: String,
            user_name: String,
            user_phone: String,
            user_email: String,
            permission: Number,
        }, { timestamps: true })
    );

    return Users;
};