module.exports = mongoose => {
    const Category = mongoose.model(
        "category",
        mongoose.Schema({
            category_name: String,
            published: Boolean
        }, { timestamps: true })
    );

    return Category;
};