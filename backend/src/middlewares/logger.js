const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    if (req.method == 'POST' || req.method == 'PUT') {
        console.log(req.body);
        console.log('--------------------------------');
    }
    next();
}

export default logger;