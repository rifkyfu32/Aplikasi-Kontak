/**
 * Created by rifky on 28/03/16.
 */
var express   = require('express'),
  app     = express(),
  mongojs   = require('mongojs'),
  db      = mongojs('kontaklist',['kontaklist']),
  bodyParser  = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/listkontak', function (req, res) {
  console.log('Menerima get request');

  db.kontaklist.find(function (err,data) {
    err ? console.log(err) : res.json(data);
  }); 
});

app.post('/listkontak', function (req,res) {
  console.log(req.body);
  db.kontaklist.insert(req.body, function (err,data) {
    err ? console.log(err) : res.json(data);
  });
});
app.delete('/listkontak/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.kontaklist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/listkontak/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.kontaklist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/listkontak/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.kontaklist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
app.listen(6969);
console.log('Server berjalan di http://localhost:6969/');

module.exports = app;