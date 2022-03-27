const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const saltRounds = 10;//代表hash杂凑次数
function hashStr(myPlaintextPassword) {
    return new Promise((resolve, reject)=>{
        //Technique 2 (auto-gen a salt and hash):
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            if(err) {
                reject(err)
            }
            resolve(hash)
        });
    })
}

function compare(myPlaintextPassword, hash) {
    return new Promise((resolve, reject)=>{
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            // result == true
            if(err) {
                reject(err)
            }
            resolve(result)
        });
    })
}
function sign(username) {
    //非对称加密
    const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private_key.pem'))
    let tk = jwt.sign({ username }, privateKey, { algorithm: 'RS256'});
    return tk
}

function verify(token) {
    //非对称加密解密
    const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/ras_public_key.pem'))
    let decoded = jwt.verify(token, publicKey);
    return decoded
}
exports.hashStr = hashStr
exports.compare = compare
exports.sign = sign
exports.verify = verify