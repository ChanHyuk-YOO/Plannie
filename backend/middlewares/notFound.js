const createError = require('http-errors');

module.exports = function(req, res, next) {
    next(createError(404));
};
