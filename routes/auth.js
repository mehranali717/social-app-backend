const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")
router.get("/", (req, res) => {
  res.send("hey this is auth route");
});
// register
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log({ error });
  }
});
router.post("/login", async (req, res) => {
  console.log({req}, {res});
  
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(404).json("User not found");
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    res.status(200).json(user)
  } catch (error) {
    console.log({ error });
  }
})
module.exports = router;
