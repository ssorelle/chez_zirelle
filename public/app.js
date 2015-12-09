var app = angular.module('myApp', []);

app.factory('AddressesFactory', function ($http){
  var GetAddresses = function(){
    return $http({
      method: 'GET',
      url: '/addresses'
    })
    .then(function(res){
      return res.data;
    });
  };

  var AddAddress = function(addedAddress){
    return $http({
      method: 'POST',
      url: '/addresses',
      data: addedAddress
    });
  };

  return {
    GetAddresses: GetAddresses,
    AddAddress: AddAddress
  }
});

app.controller('AppController', function ($scope, AddressesFactory) {
  $scope.addLocation = function(Addresses){
    var newAddress = {label: $scope.locationName, address: $scope.newLocation};
    $scope.newLocation = '';
    $scope.locationName = '';
    AddressesFactory.AddAddress(newAddress)
      .then(function(){
        geocode(newAddress);
      });
  };

  AddressesFactory.GetAddresses()
    .then(function (addresses) {
      for(var i = 0; i < addresses.length; i++){
        geocode(addresses[i]);
      }
    });

});

var map, geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7576792, lng: -122.5078117 },
    zoom: 12
  });

};

function geocode(newAddress){
  geocoder.geocode( { address: newAddress.address}, function(results, status) {
    var marker = new google.maps.Marker({
      position: results[0].geometry.location,
      title: newAddress.label,
      map: map
    });
  });
}

