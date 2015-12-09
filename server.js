var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/chez-zirelle');

var addressSchema = mongoose.Schema({
  label: String,
  address: String
});

var Address = mongoose.model('Address', addressSchema);

app.get('/addresses', function(req, res) {
  Address.find()
  .exec(function(err, addresses){
    if(err){
      throw err;
    }else{
      res.status(200).send(addresses);
    }
  })
});

app.post('/addresses', function(req, res){
  var label = req.body.label;
  var address = req.body.address;
  var newLocation = new Address();
  newLocation.label = label;
  newLocation.address = address;

  newLocation.save(function(newLocation){
    res.status(200).send(newLocation);
  });
});

app.listen(3000);
