const createError = require("http-errors");
const {validationResult} = require("express-validator");

const notFoundHandler = (req, res, next) => {
    next(createError(404, "Your requested content was not found!"));
};

const errorHandler = (err, req, res, next) => {
    const errors =
        process.env.NODE_ENV === "development" ? err : {message: err.message};
    res.status(err.status || 500);
    res.json(errors);
};

const setCommonError = (res, error) => {
    return res.status(error.status).json({
        errors: {
            common: {
                msg: error.message,
            },
        },
    });
};

const doInputValidation = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        res.status(403).json({
            errors: mappedErrors
        })
    }
}

module.exports = {
    notFoundHandler,
    errorHandler,
    setCommonError,
    doInputValidation
};
