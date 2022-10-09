const RouteNotFound = (req,res,next) => {
    res.status(404).json({massage:'Page not found'});
};

module.exports = RouteNotFound;