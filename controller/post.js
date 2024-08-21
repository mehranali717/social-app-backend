const Post = require("../models/Post");

const post = {
    create: async (req, res) => {
        const newPost = new Post(req.body)
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    update: async (req, res) => {
        try {
            const post = Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body })
                res.status(200).json("The post has been updated")
            } else {
                res.status(403).json("you can Update only your post")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = post