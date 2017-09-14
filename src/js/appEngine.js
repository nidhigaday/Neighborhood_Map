/*======Append Google API=====*/

var loadScript = function() {

  var JSElement = document.createElement('script');
  JSElement.type = "text/javascript";
  JSElement.src = apiUrl;
  JSElement.async;
  JSElement.defer;
  var te = document.getElementsByTagName('body');
  console.log(te);
  document.getElementsByTagName('body')[0].appendChild(JSElement);
}

loadScript();



/*==========All Variables===========*/

var map, windowInfo;


/*-----checks if windowInfo is null-----*/
function checkinfowindow() {
  //Create infowindow for the marker
  windowInfo = new google.maps.InfoWindow();
}


/*======================Model=========================*/

var locModel = function(data, index) {

  var self = this;
  this.location = ko.observable(data.location);
  this.title = ko.observable(data.title);
  this.zip = ko.observable(data.pin);
  this.season = ko.observable(data.season);
  this.episode = ko.observable(data.episode);
  this.loc = ko.observable(data.loc);
  this.city = ko.observable(data.city);
  this.id = ko.observable(index);
  this.fav = ko.observable();

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

  //create marker for each location
  this.marker = new google.maps.Marker({
    position: data.location,
    title: data.title,
    loc: data.loc,
    zip: data.pin,
    icon: this.defaultIcon,
    episode: data.episode,
    animation: google.maps.Animation.DROP,
    id: self.id,
    city: data.city,
    visible: false
  });

  this.WikiInfo = function(clickedmarker) {

    var Wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + clickedmarker.city;

    var wikiRequestTimeout = setTimeout(function() {
      $('#infoWiki').text('Failed to load Wikipedia Resources');
    }, 1000);


    $.ajax({
      url: Wikiurl,
      dataType: 'jsonp'
    }).done(function(data) {
      for (i = 0; i < data.length; i++) {
        var wikiTitle = data[1][i];
        var wikiUrl = data[3][i];
        $('#infoWiki ul').append('<li>' +
          '<a target="_blank" href="' + wikiUrl + '">' +
          '<span>' + wikiTitle + '</span>' +
          '</a>' +
          '</li>');
      }
      clearTimeout(wikiRequestTimeout);
    });
  }; //end of WikiInfo()

  //function to assign values to the InfoWindow properties
  this.populateInfo = function(thisMarker, infoWindow) {
    if (infoWindow.marker != thisMarker) {

      var content = '<div class="infoStyle">' +
        '<div class="infoTitle">' + thisMarker.loc +
        '</div><div><span class="bold">' + thisMarker.episode + ' - ' +
        '</span><span>' + thisMarker.title +
        '</span></div><div>' + thisMarker.zip +
        '</div><div id="infoPanoImage">No Street View Found' +
        '</div><img id="locImg" src="">' +
        '<div id="infoWiki"><h3 class="infoTitle">' + thisMarker.city + ' - Wikipedia Resources</h3><ul>' +
        '</ul></div></div>';


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
            nearLoc, self.marker.position);
          var lat = nearLoc.lat();
          var lng = nearLoc.lng();

          //set content in InfoWindow
          infoWindow.setContent(content);

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

          var staticImage =
            'https://maps.googleapis.com/maps/api/streetview?size=300x300&location=' +
            lat + ',' + lng + '&heading' + heading + '&pitch=20&key=' + myMapsKey;
          $('#locImg').attr('src', staticImage);

          self.WikiInfo(thisMarker);

        } else {
          infoWindow.setContent(content);
          self.WikiInfo(thisMarker);
          $('#locImg').css('display', 'none');
          $('#infoPanoImage').css('min-height', 'auto');
        }
      }; //end of getStreetView()

      //open content in infoWindow at anchor - thisMarker on 'map'
      infoWindow.open(map, thisMarker);
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
  }


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
    self.toggleBounce(val);
    self.populateInfo(val, infoWindow);
  } // end of function clickMarker()

}; // end of locModel function DEFINATION




/*============View Model===========*/

var ViewModel = function() {
  var self = this;

  //initializing loactions array
  this.locations = ko.observableArray([]);

  //input value for searched location
  this.typedAddress = ko.observable('');

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

  //function def to add data to KO observable array from raw data object
  this.addData = function(arr) {
    for (var n = 0; n < data.length; n++) {
      arr.push(new locModel(data[n], n));
    }
  };

  //add data to locations observable Array - locations
  this.addData(self.locations());


  //function to add delay in dropping markers on map
  this.addMarkers = function(position, timeout) {
    window.setTimeout(function() {
      position.setMap(map);
    }, timeout);
  }

  this.showLocations = function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < self.locations().length; i++) {
      //function call to drop the marker at set time out and adjust boundaries
      self.addMarkers(self.locations()[i].marker, i * 200);
      bounds.extend(self.locations()[i].marker.position);
    }
    map.fitBounds(bounds);
  } // end of showLocation()

  //function to open location infowindow on map
  self.openLocInfo = function(locInfo) {
    //locInfo - complete LocModel with all functions
    // clickMarker is a function that append and open content to infowindow
    locInfo.clickMarker(locInfo.marker, windowInfo);
  }

  //defining windowInfo before adding event listener function
  checkinfowindow();
  windowInfo.addListener('closeclick', function() {
    this.close();
    checkinfowindow();
  });

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
        if (item.loc().toLowerCase().indexOf(filterItem) !== -1) {
          item.marker.setVisible(true);
        } else {
          windowInfo.close();
          item.marker.setVisible(false);
        }
        return item.loc().toLowerCase().indexOf(filterItem) !== -1;
      });
    }
  }, this); // end of currentLocs computed function


  //function to center map for mobile view to clicked location
  this.centerLoc = function(loc) {
    var lat = loc.location().lat;
    var lng = loc.location().lng;
    self.openList();
    map.setCenter({
      lat: lat,
      lng: lng
    });
    self.openLocInfo(loc);
  }


  // click function for mobile search nav
  this.openList = function() {
    $('#sec_menu').toggleClass("change");
    $('#sec_list--mob').slideToggle();
  }

};


/*============Init Function=============*/


function initMap() {
  /*=============applyig ko bindings=================*/
  ko.applyBindings(new ViewModel());
  // ko.applyBindings(vmStandard);
}
