let User = require('../models/userModel');

const verifyEmail = async (req, res) => {
  const token = req.query.token;

  try {
    const user = await User.findOne({
      verificationToken: token,
    });

    if (user) {
      user.verificationToken = null;
      user.isVerified = true;
      await user.save();

      res.status(200).send({ status: true, message: "Verify Email successfully" });
    } else {
      res.status(400).send({ status: false, error: "Invalid Email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: "Server Error", error });
  }
};

module.exports = verifyEmail;



