const jwt = require('jsonwebtoken');

module.exports.protect = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optionally, you can also fetch the user from the DB based on the decoded token's id
        // For example:
        // const currentUser = await StudentData.findById(decoded.id);

        // Attach the decoded token (which contains user info) to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token or you are not authorized'
        });
    }
};
