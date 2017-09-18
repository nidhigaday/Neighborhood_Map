/*======Append Google API=====*/

var loadScript = function() {

  var JSElement = document.createElement('script');
  JSElement.type = "text/javascript";
  JSElement.src = apiUrl;
  JSElement.async;
  JSElement.defer;
  JSElement.onerror = function() {
    $('.container').text("Oops! Google maps could not be loaded, please check the API Url.");
  };
  $('body')[0].appendChild(JSElement);
};

loadScript();


/*==========All Variables===========*/

var map, windowInfo, contentStr, vm;


/*-----initialize infowindow-----*/
function initInfowindow() {
  //Create infowindow for the marker
  windowInfo = new google.maps.InfoWindow();
  windowInfo.addListener('closeclick', function() {
    //close wiki error message
    if (vm.wikiError()) {
      vm.wikiError(false);
    }
    //close wiki data div
    vm.wikidata([]);
    this.close();
    initInfowindow();
  });
}


/*=======Creating map===========*/

var getMap = function() {
  //Create new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 49.232717,
      lng: -123.900028
    },
    zoom: 11,
    fullscreenControl: true,
    backgroundColor: 'rgba(229, 246, 221, 0.15)',
    mapTypeControlOptions: {
      mapTypeIds: ['hybrid', 'satellite', 'custom_map'],
      position: google.maps.ControlPosition.TOP_CENTER
    }
  });

  //create a map with custom style
  var styledMapType = new google.maps.StyledMapType(customStyles, {
    name: 'Custom Map'
  });

  //set custom map
  map.mapTypes.set('custom_map', styledMapType);
  map.setMapTypeId('custom_map');
};


/*=======Wikipedia data function=======*/


//function to get Wikipedia data
var getWiki = function(location) {

  //remove existing wiki data
  vm.wikidata([]);

  var term = 'Supernatual ' + location.season;
  var Wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + term;

  $.ajax({
    url: Wikiurl,
    dataType: 'jsonp',
  }).done(function(data) {
    vm.wikidata.push({
      title: ko.observable(data[0]),
      src: ko.observable(data[3][0]),
      snippet: ko.observable(data[2][0])
    });
  }).fail(function(report) {
    if (report.status == 404) {
      vm.wikiError(true);
    }
  });
}; //end of getWiki()


/*======================Model=========================*/

var LocModel = function(data, index) {

  var self = this;
  //information required for list fiter computation
  //and infoWindow
  this.title = data.title;
  this.zip = data.pin;
  this.season = data.season;
  this.episode = data.episode;
  this.loc = data.loc;

  //default marker pin with custom size
  this.defaultIcon = {
    url: 'src/icons/Map-Marker-pushpin-red.png',
    size: new google.maps.Size(50, 44),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 44),
    scaledSize: new google.maps.Size(50, 44)
  };

  //custom marker pin when hovered on marker pin
  this.highlightIcon = {
    url: 'src/icons/Map-Marker-pushpin-green.png',
    size: new google.maps.Size(50, 44),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 44),
    scaledSize: new google.maps.Size(50, 44)
  };

  this.contentStr = '<div class="infoStyle">' +
    '<div class="infoTitle">' + this.loc +
    '</div><div><span class="bold">' + this.episode + ' - ' +
    '</span><span>' + this.title +
    '</span></div><div>' + this.zip;


  //create marker for each location
  this.marker = new google.maps.Marker({
    position: data.location,
    icon: this.defaultIcon,
    animation: google.maps.Animation.DROP,
    season: data.season,
    visible: false
  });

  //function defination to setup content in infowindow
  this.getStreetView = function(val, status) {
    //OK means, image found in given location
    if (status === google.maps.StreetViewStatus.OK) {
      //data passed here is used to get lat lng, radius
      var nearLoc = val.location.latLng;
      //calculate heading for the panorama image option
      var heading = google.maps.geometry.spherical.computeHeading(
        nearLoc, self.marker.position);
      var lat = nearLoc.lat();
      var lng = nearLoc.lng();
      //StreetViewPanoramaOptions
      var panoOptions = {
        position: nearLoc,
        pov: {
          heading: heading,
          pitch: 10
        }
      };
      //getting static street image for mobile views
      var staticImage = 'https://maps.googleapis.com/maps/api/streetview?size=300x300&location=' + lat + ',' + lng + '&heading' + heading + '&pitch=20&key=' + myMapsKey;
      self.imgStr = '</div><div id="infoPanoImage">' +
        '</div><img id="locImg" src="' + staticImage + '">' +
        '</div>';
      //set content in InfoWindow
      windowInfo.setContent(self.contentStr + self.imgStr);
      //create Panorama image for width higher than 768px
      var panorama = new google.maps.StreetViewPanorama(document.getElementById(
        'infoPanoImage'), panoOptions);
    } else {
      self.imgStr = '</div><div class="noImage" style="min-height: auto">No Street View Found' +
        '</div></div>';
      windowInfo.setContent(self.contentStr + self.imgStr);
    }
  }; //end of getStreetView()


  //function to assign values to the InfoWindow properties
  this.populateInfo = function(thisMarker, infoWindow) {
    if (infoWindow.marker != thisMarker) {
      //using StreetViewService instead of Panorama
      //in-case image of given latLng is not available
      var streetView = new google.maps.StreetViewService();
      //setting the radius to find image in meters
      var radius = 50;
      //default method in prototype of google.maps.StreetViewService
      //getPanoramaByLocation(latlng, radius, callback fn)
      streetView.getPanoramaByLocation(thisMarker.position, radius,
        self.getStreetView);
      //open content in infoWindow at anchor - thisMarker on 'map'
      infoWindow.open(map, thisMarker);
      getWiki(thisMarker);
    }
  }; //end of populateInfo()

  //function defination to bounce pin when clicked
  this.toggleBounce = function(pin) {
    if (pin.getAnimation() !== null) {
      pin.setAnimation(null);
    } else {
      pin.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        pin.setAnimation(null);
      }, 1450);
    }
  };


  /*------Set of functions for Mouse events for marker pin------*/

  //adding a function to hover-in event to change marker icon
  this.marker.addListener('mouseover', function() {
    this.setIcon(self.highlightIcon);
  });
  //adding a function to hover-out event to change marker icon
  this.marker.addListener('mouseout', function() {
    this.setIcon(self.defaultIcon);
  });
  //adding a function to click event to display InfoWindow for each marker
  this.marker.addListener('click', function() {
    self.clickMarker(this, windowInfo);
  });
  /*------Set of functions END------*/


  //function defination click callback
  //keeping this separate so that it can be called when list item is clicked
  this.clickMarker = function(val, infoWindow) {
    // val is the clicked marker
    map.panTo(val.position);
    self.toggleBounce(val);
    self.populateInfo(val, infoWindow);
  }; // end of function clickMarker()

}; // end of locModel function DEFINATION



/*============View Model===========*/

var ViewModel = function() {
  var self = this;

  //function call to initialize map
  getMap();

  //initializing loactions array, Wiki data array and error message
  this.locations = ko.observableArray([]);
  this.wikidata = ko.observableArray([]);
  this.wikiError = ko.observable(false);

  //input value for searched location
  this.typedAddress = ko.observable('');

  //function def to add data to KO observable array from raw data object
  this.addData = function(arr) {
    for (var n = 0; n < data.length; n++) {
      arr.push(new LocModel(data[n], n));
    }
  };

  //add data to locations observable Array - locations
  this.addData(self.locations());

  //function to add delay in dropping markers on map
  this.addMarkers = function(position, timeout) {
    window.setTimeout(function() {
      position.setMap(map);
    }, timeout);
  };

  this.showLocations = function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < self.locations().length; i++) {
      //function call to drop the marker at set time out and adjust boundaries
      self.addMarkers(self.locations()[i].marker, i * 200);
      bounds.extend(self.locations()[i].marker.position);
    }
    map.fitBounds(bounds);
  }; // end of showLocation()

  //function to open location infowindow on map
  self.openLocInfo = function(locInfo) {
    locInfo.clickMarker(locInfo.marker, windowInfo);
  };

  //defining windowInfo before adding event listener function
  initInfowindow();

  //function call to show all markers on map
  this.showLocations();

  //computed list of locations
  this.currentLocs = ko.computed(function() {
    var filterItem = self.typedAddress().toLowerCase();
    // checks if search bar is empty, if yes, will display all location by default
    if (!filterItem) {
      self.locations().forEach(function(loc) {
        loc.marker.setVisible(true);
      });
      return self.locations();
    } else {
      //return true if conditions in function are fulfilled
      //marker is also updated accordingly
      return ko.utils.arrayFilter(self.locations(), function(item) {
        if (item.loc.toLowerCase().indexOf(filterItem) !== -1) {
          item.marker.setVisible(true);
        } else {
          windowInfo.close();
          item.marker.setVisible(false);
          self.wikidata([]);
        }
        return item.loc.toLowerCase().indexOf(filterItem) !== -1;
      });
    }
  }, this); // end of currentLocs computed function


  //function to center map for mobile view to clicked location
  this.centerLoc = function(loc) {
    self.openList();
    self.openLocInfo(loc);
  };

  // click function for mobile search nav
  this.openList = function() {
    //confirmed with Udacity mentor, this jQuery usage is allowed
    $('#sec_menu').toggleClass("change");
    $('#sec_list--mob').slideToggle();
  };
}; //end of ViewModel()




/*============Init Function=============*/


function initMap() {
  vm = new ViewModel();
  /*=============applyig ko bindings=================*/
  ko.applyBindings(vm);
}
