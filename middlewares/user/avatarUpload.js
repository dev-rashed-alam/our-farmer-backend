const uploader = require("../../utilities/singleUploader");

const avatarUpload = (req, res, next) => {
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        process.env.AVATAR_MAX_FILE_SIZE,
        "Only .jpeg, .jpg or .png format allowed"
    );

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
};

module.exports = avatarUpload;