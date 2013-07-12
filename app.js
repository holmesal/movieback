var express = require('express');
var request = require('request');
var app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/search/:query', function(req, res){
  console.log(req.params.query);
  var url = 'http://api.trakt.tv/search/movies.json/d5cadc7325bf0642b11b8439f8fe09f5/'+req.params.query;
  request.get({url:url,json:true}, function (error, response, results) {
	  if (!error && response.statusCode == 200) {
	    res.send(results);
	  }
	})
});

app.get('/recommend/:id', function(req, res){
  console.log(req.params.id);
  var url = 'http://api.trakt.tv/movie/related.json/d5cadc7325bf0642b11b8439f8fe09f5/'+req.params.id;
  request.get({url:url,json:true}, function (error, response, results) {
	  if (!error && response.statusCode == 200) {
	    res.send(results);
	  }
	})
});

app.listen(5000);