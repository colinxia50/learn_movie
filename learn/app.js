var express = require('express');
var path = require('path')
//var mongoose = require('mongoose')
var _ = require('underscore')
var mysql = require('./models/db');
//var Movie = require('./models/movie')
var port = process.env.PORT || 8888
var app = express()
app.set('views','./views/pages')
app.set('view engine','jade')
app.use(require('body-parser').urlencoded({extended: true}))
//app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname,'bootstrap')))
app.locals.moment = require('moment')
//var employeeProvider= new EmployeeProvider('localhost');
app.listen(port)
console.log('started on port' + port)
// 我是在测试 我是在测试
//index page
app.get('/',function(req,res) {
	mysql.query("SELECT * FROM movie Limit 10", function(err, movie) {
		res.render('index', {
		title:'首页',
		movie: movie
	})
  })
})

//detail page
app.get('/movie/:id',function(req,res){
		var id =req.params.id 
		console.log(id)
		mysql.query("SELECT * FROM movie WHERE _id=" + id, function(err,movie) {
		 if(err){
        console.log('查询出错:'+err.message);
        client.end();
        return;
    }
    console.log("查询表:movie");
    //console.log(fields);
    console.log('查到结果:' + movie.length + "条");
    if(movie.length > 0){ //查看第一条记录
        var firstResult=movie[0];
        console.log('id:' + firstResult['id']);
        console.log('user_name:' + firstResult['title']);
        console.log('nick_name:' + firstResult['country']);

    }
		
		res.render('detail', {
		title:'详情页',
		movie: firstResult
	})
	})
})

/*
//detail page
app.get('/movie/:id',function(req,res){
		res.render('detail', {
		title:'详情页',
		//console.log(movie),
		movie: {
			doctor:'夏木',
			title:'大谋杀',
			country:'中国',
			summary:'翻拍自78年的同名小说 大谋杀',
			flash:'http://player.youku.com/player.php/sid/XODIzODkwMDI4/v.swf',
		}
	})
})
*/
//list page
app.get('/admin/list',function(req,res){
	mysql.query("SELECT * FROM movie Limit 10", function(err, movie) {
			if(err){
			console.log(err)
			console.log('[查询失败] - ',err.message)
					return;
			}
		res.render('list', {
		title:'后台管理',
		movie: movie
	})
  })
})
// list delete movie
app.delete('/admin/list', function(req,res){
	var id = req.query.id
	console.log(id)
	if(id){
		mysql.query("DELETE FROM movie WHERE _id =" + id, function(err, movie) {
			if(err){
			console.log(err)
			console.log('[删除失败] - ',err.message)
					return;
			}else{
				res.json({success: 1})
				}

		})
	}
})
//admin page 
app.get('/admin/movie',function(req,res){
	res.render('admin', {
	title:'后台录入页',
	movie: {
		_id:'',
		title:'',
		doctor:'',
		country:'',
		year:'',
		summary:'',
		flash:'',
		year:'',
		poster:''
	}
		})
})

//admin update movie
app.get('/movie/update/:id',function(req,res){
	var id =req.params.id 
	if(id){	
		mysql.query("SELECT * FROM movie WHERE _id=" + id, function(err,movie) {
		res.render('admin',{
		title:'后台更新页',
		movie:movie[0]
			})
		})
	 }
})

//admin post movie 
app.post('/admin/movie/new',function(req,res){
		//undefined
	var id = req.body.movie._id
	var movieobj = req.body.movie
	if (id !=''){
	var sql = "UPDATE movie SET doctor=?,title=?,country=?,summary=?,flash=?,year=?,poster=? WHERE _id =" +id+"",
		value = [''+movieobj.doctor+'',
				''+movieobj.title+'',
				''+movieobj.country+'',
				''+movieobj.summary+'',
				''+movieobj.flash+'',
				''+movieobj.year+'',
				''+movieobj.poster+'']
	mysql.query(sql,value,function(err,movie){
		if(err){
			console.log(err)
			console.log('[UPDATE ERROR] - ',err.message)
					return;
			}
				console.log('Inserted: ' + movie.affectedRows + ' row.')
				res.redirect('/admin/list')
			})
	}else{
	var sql = "INSERT INTO movie SET _id=?,doctor=?,title=?,country=?,summary=?,flash=?,year=?,poster=?",
		value = ['', ''+movieobj.doctor+'',
				''+movieobj.title+'',
				''+movieobj.country+'',
				''+movieobj.summary+'',
				''+movieobj.flash+'',
				''+movieobj.year+'',
				''+movieobj.poster+'']
	mysql.query(sql,value,function(err,movie){
			if(err){
				console.log(err)
				}
				console.log('Inserted: ' + movie.affectedRows + ' row.')
				console.log('Id inserted: ' + movie.insertId)
				res.redirect('/movie/' + movie.insertId)
	})
}
})