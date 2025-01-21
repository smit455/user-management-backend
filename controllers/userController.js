const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, email, password, phoneNumber });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is deactivated' });
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        res.status(200).json({ message: 'User details updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user details', error });
    }
};

const deactivateAccount = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { isActive: false });
        res.status(200).json({ message: 'Account deactivated' });
    } catch (error) {
        res.status(500).json({ message: 'Error deactivating account', error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

const initializeAdmin = async () => {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const admin = new User({
            name: 'Super Admin',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            phoneNumber: process.env.ADMIN_NUMBER,
            isAdmin: true,
        });
        await admin.save();
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    updateUserDetails,
    deactivateAccount,
    getAllUsers,
    initializeAdmin
};