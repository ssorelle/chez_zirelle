var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var http = require('http');


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

// var addresses = [
//   {label: 'Oak Street', address: '1171 Oak Street, San Francisco, CA 94117'},
//   {label: 'Pennsylvania', address:'208 Pennsylvania Avenue, San Francisco, CA 94107'},
//   {label: 'Sheridan', address: '34 Sheridan Street, San Francisco, CA 94103'}
// ];

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

  Address.findOne({label: label, address: address})
  .exec(function(err){
    if(err){
      throw err;
    }else{
      var newLocation = new Address();
        newLocation.label = label;
        newLocation.address = address;

      newLocation.save(function(newLocation){
        res.status(200).send(newLocation);
        console.log("FREAKING SUCCESS!!!!")
      });
    }
  });
});

app.listen(3000);

// http.createServer( app ).listen( 3000 ), function (){
//   console.log( 'Express server listening on port 3000');
// });


module.exports = app;
