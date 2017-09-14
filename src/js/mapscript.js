/*==========All Variables===========*/

var map, mapViewModel;



/*======================Model=========================*/

var model = {
  method: function (data, index) {
    this.location = ko.observable(data.location);
    this.title = ko.observable(data.title);
    this.zip = ko.observable(data.pin);
    this.season = ko.observable(data.season);
    this.episode = ko.observable(data.episode);
    this.id = ko.observable(index);


  },
  addData: function (arr) {
    for (var n = 0; n < data.length; n++) {
      arr.push(new model.method(data[n], n));
    }
  }
};



/*============View Model===========*/

//view model is loading only data on left list
var ViewModel = function () {
  var self = this;

  //initializing loactions array
  self.locations = ko.observableArray([]);

  //add data to locations observable Array
  model.addData(self.locations());

  //to show filtered list and default list
  self.currentLocs = ko.observableArray([]);
  self.currentLocs(self.locations());

  //initializing markers array
  self.allMarkers = ko.observableArray([]);

  //function to hide all locations
  self.hideLocations = function () {
    console.log('function call to hide locations');
  }

  //function to open location infowindow on map
  self.openLocInfo = function (info) {
    console.log(info);
  }

  console.log(self.locations()[1].title());

  //function to filter locations by season
  self.filterLoc = function (val) {
    // var mappedLoc = self.locations.map(function(obj) {
    //   if(val === obj.season()) {
    //     console.log(val, obj.season)
    //   }
    // });
    // self.currentLocs(mappedLoc);
    console.log(self.locations());
  }

  //options for drop-down menu
  self.availableFilters = ko.observableArray(['Season 01', 'Season 02',
    'Season 04', 'Season 05', 'Season 07']);

};



/*=======Instance of ViewModel=========*/

//Creating a new instance of ViewModel
//to be used in init function for locations data and for applyBindings
mapViewModel = new ViewModel();



/*============Init Function=============*/


function initMap() {



  //function call for locations() in ViewModel for data array
  //locData array is used to create markers
  var locData = mapViewModel.locations();

  var markers = mapViewModel.allMarkers();

  var openLoc = mapViewModel.openLocInfo();
  console.log(openLoc);

  //create a map with custom style
  var styledMapType = new google.maps.StyledMapType(customStyles, {
    name: 'Custom Map'
  });

  //Create infowindow for the marker
  var largeInfowindow = new google.maps.InfoWindow();

  //default marker pin with custom size
  var defaultIcon = {
    url: 'src/icons/Map-Marker-pushpin-red.png',
    size: new google.maps.Size(50, 44),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 44),
    scaledSize: new google.maps.Size(50, 44)
  };

  //custom marker pin when hovered on marker pin
  var highlightIcon = {
    url: 'src/icons/Map-Marker-pushpin-green.png',
    size: new google.maps.Size(50, 44),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 44),
    scaledSize: new google.maps.Size(50, 44)
  };

  //Create new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 49.232717,
      lng: -123.120738
    },
    zoom: 13,
    fullscreenControl: true,
    backgroundColor: 'rgba(229, 246, 221, 0.15)',
    // streetViewControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['hybrid', 'satellite', 'custom_map']
    }
  });

  //set custom map
  map.mapTypes.set('custom_map', styledMapType);
  map.setMapTypeId('custom_map');

  //this loop through data array to create an array of all markers
  for (var x = 0; x < locData.length; x++) {
    var position = locData[x].location();
    var title = locData[x].title();
    var zipCode = locData[x].zip();
    var episode = locData[x].episode();

    //create marker for each location
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      zip: zipCode,
      icon: defaultIcon,
      episode: episode,
      animation: google.maps.Animation.DROP,
      id: x
    });

    //add marker to an array of all markers
    markers.push(marker);

    //function CALL to show all markers at page load
    showLocations();

    //function DEFINATION to show all markers
    function showLocations() {
      // remove all markers to re-render (temp)
      hideLocations();
      //set the boundries of the map
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
        //function call to drop the marker at set time out and adjust boundaries
        addMarkers(markers[i], i * 200);
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
    }

    /*------Set of functions for Mouse events on Map------*/

    //adding a function to click event to display InfoWindow for each marker
    marker.addListener('click', function () {
      populateInfo(this, largeInfowindow);
      toggleBounce(this);
    });

    //adding a function to hover-in event to change marker icon
    marker.addListener('mouseover', function () {
      this.setIcon(highlightIcon);
    });

    //adding a function to hover-out event to change marker icon
    marker.addListener('mouseout', function () {
      this.setIcon(defaultIcon);
    });

    /*------Set of functions END------*/

  } // end of for loop


  //function to assign values to the InfoWindow properties
  function populateInfo(thisMarker, infowindow) {
    if (infowindow.marker != thisMarker) {

      infowindow.marker = thisMarker;

      var content = '<div class="infoStyle">' +
        '<div class="infoTitle">' + thisMarker.title +
        '</div><div>' + thisMarker.episode +
        '</div><div>' + thisMarker.zip +
        '</div><div id="infoPanoImage">No Street View Found' +
        '</div><img id="locImg" src="">' +
        '</div>';

      //using StreetViewService instead of Panorama
      //in-case image of given latLng is not available
      var streetView = new google.maps.StreetViewService();

      //setting the radius to find image in meters
      var radius = 50;

      //default method in prototype of google.maps.StreetViewService
      //getPanoramaByLocation(latlng, radius, callback fn)
      streetView.getPanoramaByLocation(thisMarker.position, radius,
        getStreetView);

      //function DEF. of call back function - getStreetView
      function getStreetView(data, status) {
        //OK means, image found in given location
        if (status === google.maps.StreetViewStatus.OK) {
          //data passed here is used to get lat lng, radius
          var nearLoc = data.location.latLng;
          //calculate heading for the panorama image option
          var heading = google.maps.geometry.spherical.computeHeading(
            nearLoc, marker.position);

          var lat = nearLoc.lat();
          var lng = nearLoc.lng();

          //set content in InfoWindow
          infowindow.setContent(content);

          //StreetViewPanoramaOptions
          var panoOptions = {
            position: nearLoc,
            pov: {
              heading: heading,
              pitch: 10
            }
          };

          //create Panorama image for width higher than 768px
          var panorama = new google.maps.StreetViewPanorama(document.getElementById(
            'infoPanoImage'), panoOptions);

          //get static image for width smaller than 768px
          var staticImage =
            'https://maps.googleapis.com/maps/api/streetview?size=300x300&location=' +
            lat + ',' + lng + '&heading=' + heading + '&pitch=20&key=' + myKey;

          document.getElementById('locImg').src = staticImage;
        } else {
          infowindow.setContent(content);
          // document.getElementById('infoPanoImage').innerHTML =
          //   "No Street View Found";
        }
      }; //end of getStreetView()

      //open content in infoWindow at anchor - thisMarker on 'map'
      infowindow.open(map, thisMarker);

      //close and remove content from infoWindow on close
      infowindow.addListener('closeclick', function () {
        infowindow.setMarker('null');
      });
    }
  }; //end of populateInfo()

  // function to bounce marker when clicked
  function toggleBounce(pin) {
    if (pin.getAnimation() !== null) {
      pin.setAnimation(null);
    } else {
      pin.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        pin.setAnimation(null);
      }, 1450);
    }
  }

  //function to hide all markers on map
  function hideLocations() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  //function to add delay in dropping markers on map
  function addMarkers(position, timeout) {
    window.setTimeout(function () {
      position.setMap(map);
    }, timeout);
  }

} // end of initMap function

/*=============applyig ko bindings=================*/

ko.applyBindings(mapViewModel);
