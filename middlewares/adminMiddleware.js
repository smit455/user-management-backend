    const isAdmin = (req, res, next) => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    };

    module.exports = isAdmin;