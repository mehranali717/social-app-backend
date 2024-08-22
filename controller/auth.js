const bcrypt = require("bcrypt");
const User = require("../models/User");

const auth ={
     register:async(req, res)=>{
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
     },
     login: async(req, res)=>{
        try {
            const user = await User.findOne({ email: req.body.email })
            !user && res.status(404).json("User not found");
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("wrong password")
            res.status(200).json(user)
          } catch (error) {
            console.log({ error });
          }
     }
}
module.exports = auth