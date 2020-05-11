const express = require("express");
const { userById, 
    allUsers, 
    getUser,
    updateUser, 
    deleteUser
} = require('../controllers/user.js');
const { requireSignin } = require('../controllers/auth.js');


const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId",requireSignin, getUser);
router.put("/user/:userId",requireSignin, updateUser);
router.delete("/user/:userId",requireSignin, deleteUser);

// any routes containing :userId, our app will first execute userById()
router.param("userId",userById);

module.exports = router;


