const User = require("../models/User")
const { updateUser, deleteUser, getUser, follow, unfollow } = require("../controller/user")
const router = require("express").Router()
// update user
router.put("/:id", updateUser)
// delete user
router.delete("/:id", deleteUser)
// get user
router.get("/:id", getUser)
// Follow a user
router.put("/:id/follow", follow)

// unfollow user
router.put("/:id/unfollow", unfollow)
module.exports = router