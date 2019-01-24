var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var db = require("./db.js");
// token
var jwt = require('jsonwebtoken');
// Token 数据
const payload = {
  name: 'qxtodo',
  admin: true
}

// 登录
router.post('/', function(req, res, next) {
	var datas = req.body;
	db.query('select * from user_info', function (err, rows) {
		var DBname = rows[0].name;
		var DBpassword = rows[0].password;
		// md5加密
		var word = '$admin693015'
		var md5 = crypto.createHash("md5");
		md5.update(DBpassword);
		var hashPassword = md5.digest('hex');
		// 验证
		if(datas.id == DBname && datas.password == hashPassword){
			var token = jwt.sign(payload, 'QINXU', { expiresIn: '1day'})
			res.send({success: true, token: token });
		} else {
			res.send({success: false});
		}
    });
});
// token
router.post('/verify', function(req, res, next) {
	var token = req.body.token;
	jwt.verify(token, 'QINXU', (error, decoded) => {
		if (error) {
			res.send({verify: false})  // error.message
			return
		} else {
			res.send({verify: true})  // decoded
		}
	})
});

module.exports = router;
