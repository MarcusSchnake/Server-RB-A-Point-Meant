const router = require("express").Router();
const { UserModel } = require("../models");//is this not supposed to be models?
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  let { email, password } = req.body?.user;
  try {
    const User = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(201).json({
      message: "Thank you for joining APointMeant! You are now registered.",
      user: User,
      sessionToken: token,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof UniqueConstraintError) {
      //requires unique email
      res.status(409).json({
        message: "Email already registered.",
      });
    } else {
      res.status(500).json({
        message: "Something went wrong with the registration.",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body.user;
  try {
    const loginUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );
      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          user: loginUser,
          message: "Logged into APointMeant.",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Invalid credentials.",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid credentials.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong with the login.",
    });
  }
});
module.exports = router;
