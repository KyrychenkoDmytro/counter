const checkDateMiddleware = (req, res, next) => {
    if (req.query.date) {
        const currentDate = new Date();
        const requestedDate = new Date(req.query.date);

        if (currentDate.getDate() === requestedDate.getDate() && currentDate.getMonth() === requestedDate.getMonth() && currentDate.getFullYear() === requestedDate.getFullYear()) {
            return res.status(403).json({ message: 'Forbidden' });
        }
    }

    next();
};

export default checkDateMiddleware;
