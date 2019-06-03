var express = require('express');
var router = express.Router();

var db = require("./db.js");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

// 查询
router.post('/first', function(req, res, next) {
	var datas = {};
	var pageStart = (req.body.pageNo-1)*10;
	var pageEnd = req.body.pageSize;
	var sql = "select * from person limit " +pageStart+","+pageEnd+"; select count(*) as count from person";
	db.query(sql, function (err, rows) {
		console.log(rows);
		datas.list = rows[0];
		datas.pageSize = rows[1][0].count;
		res.send(datas);
    });
});

// 新增
router.post('/add', function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var professional = req.body.professional;
    db.query("insert into person(name,age,professional) values('" + name + "'," + age + ",'" + professional + "')", function (err, rows) {
        if (err) {
            res.send({success: false, data: err});
        } else {
            res.send({success: true, data: rows});
        }
    })
});


// 删除
router.post('/del', function (req, res) {
    var id = req.body.id;
    db.query("delete from person where id="+id, function (err, rows) {
        if (err) {
            res.send({success: false, data: err});
        } else {
            res.send({success: true, data: rows});
        }
    });
});

// 更新
router.post('/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var professional = req.body.professional;
    db.query("update person set name='" + name + "',age='" + age + "',professional= '" + professional + "' where id=" + id, function (err, rows) {
        if (err) {
            res.send({success: false, data: err});
        } else {
            res.send({success: true, data: rows});
        }
    });
});

// 查询
router.post('/search', function (req, res) {
    var name = req.body.name;
    var age = req.body.age;
    var professional = req.body.professional;

    var sql = "select * from person";

    if (name) {
        sql += " and name like '%" + name + "%' ";
    }
    if (age) {
        sql += " and age=" + age + " ";
    }
    if (professional) {
        sql += " and name like '%" + professional + "%' ";
    }
    sql = sql.replace("and","where");
    db.query(sql, function (err, rows) {
        // res.render("persons", {title: '人员管理', datas: rows, s_name: name, s_age: age});
		if (err) {
            res.send({success: false, data: err});
        } else {
            res.send({success: true, data: rows});
        }
    });
});



module.exports = router;
