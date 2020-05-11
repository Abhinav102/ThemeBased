const express = require("express");
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    like,
    unlike,
    comment,
    uncomment
} = require('../controllers/post.js');
const { requireSignin } = require('../controllers/auth.js');
const { userById } = require('../controllers/user.js');
const { createPostValidator }= require('../validator');

const router = express.Router();

// like unlike
router.put("/post/like",requireSignin, like);
router.put("/post/unlike",requireSignin, unlike);


//comments
router.put("/post/comment",requireSignin, comment);
router.put("/post/uncomment",requireSignin, uncomment);


router.get('/posts',getPosts);
router.post(
    '/post/new/:userId', // for this choose x-www-form-urlencoded option in postman, not raw.
    requireSignin,  
    createPost,
    createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser); 
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);


// any routes containing :userId, our app will first execute userById()
router.param("userId",userById);

// any routes containing :postId, our app will first execute postById()
router.param("postId",postById);


module.exports = router;


