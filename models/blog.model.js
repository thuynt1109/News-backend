module.exports = mongoose => {
    const Blog = mongoose.model(
        "blog",
        mongoose.Schema({
            id_category: String,
            id_user: String,
            blog_name: String,
            blog_title: String,
            blog_description: String,
            blog_seen: Number,
        }, { timestamps: true })
    );
    return Blog;
}