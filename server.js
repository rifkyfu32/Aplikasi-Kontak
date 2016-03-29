/**
 * Created by rifky on 28/03/16.
 */
var express   = require('express'),
  app     = express(),
  mongojs   = require('mongojs'),
  db      = mongojs('kontaklist',['kontaklist']),
  bodyParser  = require('body-parser'),
  favicon = require('serve-favicon');

app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());

app.get('/listkontak', function (req, res) {
  db.kontaklist.find(function (err,data) {
    err ? console.log(err) : res.json(data);
  }); 
});

app.post('/listkontak', function (req,res) {
  db.kontaklist.insert(req.body, function (err,data) {
    err ? console.log(err) : res.json(data);
  });
});

app.delete('/listkontak/:id', function (req, res) {
  var id = req.params.id;
  db.kontaklist.remove({_id: mongojs.ObjectId(id)}, function (err, data) {
    err ? console.log(err) : res.json(data);
  });
});

app.get('/listkontak/:id', function (req, res) {
  var id = req.params.id;
  db.kontaklist.findOne({_id: mongojs.ObjectId(id)}, function (err, data) {
    err ? console.log(err) : res.json(data);
  });
});

app.put('/listkontak/:id', function (req, res) {
  var id = req.params.id;
  db.kontaklist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {nama: req.body.nama, email: req.body.email, telp: req.body.telp}},
    new: true}, function (err, data) {
      err ? console.log(err) : res.json(data);
    }
  );
});

app.use(function(req, res, next) {
  res.status(404).send('Maaf halaman yang anda cari tidak ditemukan');
});

app.listen(6969);
console.log('Server berjalan di http://localhost:6969/');

module.exports = app;