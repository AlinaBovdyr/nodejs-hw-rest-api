module.exports.v2 = {
    config: () => { },
    uploader: {
        upload: (path, options, cb) => {
            cb(null, { public_id: 12345, secure_url: 'secure_url_cloudinary'})
        }
    }
}