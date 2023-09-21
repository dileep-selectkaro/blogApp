const jwt=require('jsonwebtoken');
const authentication=require('../middleware/authentication');
const express = require("express");
const router = express.Router();


const { deleteTopic, addTopic } = require('../controllers/topicController');
const verifyEmail = require('../controllers/verify-email');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { addComment, deleteComment } = require('../controllers/commentController');



// User
router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.get("/getUser",authentication, getUser);
router.delete("/logoutUser",loginUser);

// Topic
router.post('/createTopic',authentication,addTopic ); 
router.delete('/deleteTopic',authentication, deleteTopic);

// Comment
router.post('/addComment',authentication,addComment); 
router.delete('/deleteComment',authentication, deleteComment);

//.....Email verification........
router.get('/verify-email',verifyEmail)

module.exports = router;
