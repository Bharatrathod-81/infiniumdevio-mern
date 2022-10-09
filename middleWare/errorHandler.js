const ErrorHandler = (err,req,res,next) => {
    res.status(500).json({massage:err.massage});
};

module.exports = ErrorHandler;