const transporter = require('../nodeMailer/mailer');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
//==========Register User======================

const registerUser = async (req, res) => {
  const data = req.body;
  const { name, username, email, password } = data;

   try {
    if (!name) {
      return res.status(400).send({ status: false, message: "Missing name fields" });
    }
    if (!username) {
      return res.status(400).send({ status: false, message: "Missing username fields" });
    }
    if (!email) {
      return res.status(400).send({ status: false, message: "Missing email fields" });
    }
    if (!password) {
      return res.status(400).send({ status: false, message: "Missing password fields" });
    }
    
     const value= await User.findOne({email});
     if(value){
      return res.status(312).send({status:false,message:"User already exist"});
     }
    
    const user = new User(data);

    // Generate a random token
    const generateToken = () => {
      return Math.random().toString(36).substr(2); // remove `0.`
    };

    const token = generateToken();

    // Update the verificationToken 
    user.verificationToken = token;

    await user.save();

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Welcome to Our Website!',
      html: `<a href='http://localhost:8800/verify-email?token=${token}'>click here</a>`
    });

    return res.status(201).send({ status: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send({ status: false, error: "Server Error" });
  }
};

//============Login User========================

const loginUser = async (req, res) => {
  const { username, password } = req.body;
   if (!username) {
    res.status(400).send({ status: false, message: "Missing username" });
    return;
  }

  if (!password) {
    res.status(400).send({ status: false, message: "Missing password" });
    return;
  }

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (user) {
      const token = jwt.sign({ username: user.username }, 'DileepKumar', { expiresIn: '8h' });
      res.setHeader("token", token);

      res.status(200).send({ status: true, message: 'Successfully Generated Token', data: user });
    } else {
      res.status(400).send({ status: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).send({ status: false, error: 'Error in login user', error });
  }
};

//==============Get User=======================

const getUser = async (req, res) => {
  const username = req.username;;
  console.log("Username check:", username);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    return res.status(200).send({ status: true, message: "Get user successfully", User: user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).send({ status: false, error: "Server Error" });
  }
};



//=============Logout User===================
const logoutUser = (req, res) => {
  res.status(200).send({ status: true, message: "Logout successful" });
};

module.exports = { registerUser, loginUser, getUser, logoutUser };
