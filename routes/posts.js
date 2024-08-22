
const User = require("../models/User");

const router = require("express").Router();
const { create, update, deletePost, likePost, getPost, timelineAll } = require("../controller/post")
// create a post
router.post("/", create)
// update a post
router.put("/:id",update)
// delete a post
router.delete("/:id", deletePost)
// like a post
router.put("/:id/like", likePost)
// get a post
router.get("/:id", getPost)
// get timeline posts
router.get("/timeline/all", timelineAll)

module.exports = router