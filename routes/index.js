var express = require('express');
var router = express.Router();

var db = require("./db.js");


// index
router.post('/', function(req, res, next) {
	var pageNo= req.body.current,
	pageSize= 10,
	sql_data = "select * from blog_list order by id desc limit " + (pageNo-1)*pageSize + " , " + pageSize,
	sql_count = "select count(*) as count from blog_list",
	dataArr = [];
	db.query(sql_data +" ; " + sql_count, function (err, rows) {
		res.send(rows);
    });
});

// delete
router.post('/del', function(req, res, next) {
	var id= req.body.id;
	var sql = `delete from blog_list where id=${id}`;
	db.query(sql, function (err, rows) {
		if(err){
			res.send({success: false, data: err});
		} else {
			res.send({success: true, data: rows});
		}
    });
});

module.exports = router;
