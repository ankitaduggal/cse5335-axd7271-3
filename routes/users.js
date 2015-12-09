var express = require('express');
var router = express.Router();
var mongoose = require ("mongoose");
var fs = require('fs');

var connstring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://ankitaduggal:ankitaduggal@ds027295.mongolab.com:27295/heroku_jx9qhlfl';

mongoose.connect(connstring, function (err, res) {
  if (err) {
    console.log ('Connection Error' + connstring + '. ' + err);
  } else {
    console.log ('Connected to: ' + connstring);
  }
});

var userData = new mongoose.Schema({
  id: Number,
  isActive:String,
  age:Number,
  name:String,
  company:String,
  email:String
});

var RData = mongoose.model('employee', userData);

fs.readFile('jsonfile.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);

  for(var i = 0; i <=99; i++) {

    var Data = new RData ({
      id: obj[i].id,
      isActive:obj[i].isActive,
      age:obj[i].age,
      name:obj[i].name,
      company:obj[i].company,
      email:obj[i].email
    });

    Data.save(function (err) {
      if (err) {
        console.log ('Error on save 1 !')
        console.log(err);
      }

    });
  }
  console.log('data is inserted');

});
var data;
RData.find({}, function (err, object) {
  if (err) {
    console.log(err);
  } else if (object) {
    data = object;
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.contentType('application/json');
  var employeeJSON = JSON.stringify(employee);
  res.send(employeeJSON);
});

module.exports = router;