const express = require('express');
const {
    registerUser,
    loginUser,
    getUserDetails,
    updateUserDetails,
    deactivateAccount,
    getAllUsers,
} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getUserDetails);
router.put('/me', authenticate, updateUserDetails);
router.delete('/me', authenticate, deactivateAccount);
router.get('/admin/users', authenticate, isAdmin, getAllUsers);

module.exports = router;