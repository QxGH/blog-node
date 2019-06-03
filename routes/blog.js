var express = require('express');
var router = express.Router();

var db = require("./db.js");

// query blogList
router.post('/blogList', function(req, res, next) {
	var pageNo= req.body.current,
	pageSize= 10,
	sql_data = "select * from blog_list order by id desc limit " + (pageNo-1)*pageSize + " , " + pageSize,
	sql_count = "select count(*) as count from blog_list",
	dataArr = [];
	db.query(sql_data +" ; " + sql_count, function (err, rows) {
		res.send(rows);
    });
});

// creat blog
router.post('/creatBlog', function (req, res) {
    var title = req.body.title;
    var type = req.body.type;
	var tag = req.body.tag;
    var date = req.body.date;
    var content = req.body.content;
	var sql = "insert into blog_list(title, date, type, tag, content) values('" + title + "','" + date + "','" + type + "','" + tag + "','" + content + "')";
	db.query(sql, function (err, rows) {
        if (err) {
            res.send({success: false, data: err});
        } else {
            res.send({success: true, data: rows});
        }
    })
});

// get blog
router.post('/getBlog', function (req, res) {
    var id = req.body.id;
	var sql = 'select * from blog_list where id=' + id;
    db.query(sql, function (err, rows) {
        if (err) {
            res.send({success: false, data: err});
        } else {
            res.send({success: true, data: rows});
        }
    })
});

module.exports = router;
