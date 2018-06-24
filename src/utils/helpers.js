const crypto = require('crypto');
const Promise = require('bluebird');

/**
 *
 * @param bytes
 * @param encoding
 * @returns {bluebird}
 */
exports.generateToken = (bytes = 32, encoding = 'base64') => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(bytes, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString(encoding));
            }
        });
    });
};

exports.validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};