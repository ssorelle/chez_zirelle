var app = angular.module('myApp', []);

app.factory('AddressesFactory', function ($http){
  var GetAddresses = function(){
      return $http({
      method: 'GET',
      url: '/addresses'
    })
    .then(function (res) {
      addresses = res.data;
      for(var i = 0; i < addresses.length; i++){
        geocode(i);
      }
    });
  };

  var AddAddresses = function(addedAddress){
    return $http({
      method: 'POST',
      url: '/addresses',
      data: addedAddress
    });
  };

  return {
    GetAddresses: GetAddresses,
    AddAddresses: AddAddresses
  }
});

app.controller('AppController', function ($scope, AddressesFactory) {
  $scope.addLocation = function(Addresses){
    addresses.push({label: $scope.locationName, address: $scope.newLocation});
    geocode(addresses.length-1);
    $scope.newLocation = '';
    $scope.locationName = '';
    AddressesFactory.AddAddresses(addresses[addresses.length-1]);
  };

  AddressesFactory.GetAddresses();
});

var map, geocoder, addresses;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7576792, lng: -122.5078117 },
    zoom: 12
  });

};

function geocode(index){
  geocoder.geocode( { address: addresses[index].address}, function(results, status) {
    var marker = new google.maps.Marker({
      position: results[0].geometry.location,
      title: addresses[index].label ,
      map: map
    });
  });
}

