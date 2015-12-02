var app = angular.module('myApp', []);

app.controller('AppController', function ($scope) {
  $scope.addLocation = function(locationName, newLocation){
    addresses.push([locationName, newLocation])
    geocode(addresses.length-1);
    document.getElementById('newLocation').value='';
    document.getElementById('locationName').value='';
  }
});

var addresses = [
  ['Oak Street', '1171 Oak Street, San Francisco, CA 94117'],
  ['Pennsylvania', '208 Pennsylvania Avenue, San Francisco, CA 94107'],
  ['Sheridan', '34 Sheridan Street, San Francisco, CA 94103']
];

var map, geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7576792, lng: -122.5078117 },
    zoom: 12
  });

  for(var i = 0; i < addresses.length; i++){
    geocode(i);
  }
};

function geocode(index){
  geocoder.geocode( { address: addresses[index][1]}, function(results, status) {
    var marker = new google.maps.Marker({
      position: results[0].geometry.location,
      title: addresses[index][0],
      map: map
    });
  });
}

