/*=========================Locations Data===========================*/


var data = [{
    location: {
      lat: 49.270862,
      lng: -123.256520
    },
    title: 'Phantom Traveler',
    season: 'Season 01',
    episode: 'Season 01: Episode 04',
    loc: 'Green College',
    pin: '6201 Cecil Green Park Rd, Vancouver, BC V6T 1X8',
    city: 'Vancouver, BC'

  },
  {
    location: {
      lat: 49.243876,
      lng: -122.806809
    },
    title: 'Bloody Mary',
    season: 'Season 01',
    episode: 'Season 01: Episode 05',
    loc: 'Crease Clinic',
    pin: '65 Pine Terrace, Coquitlam, BC V3C 5X9',
    city: 'Coquitlam, BC'
  },
  {
    location: {
      lat: 49.2532724,
      lng: -123.1500003
    },
    title: 'Hook Man',
    season: 'Season 01',
    episode: 'Season 01: Episode 07',
    loc: 'Theta Sorority',
    pin: '1974 Cedar Crescent, Vancouver, BC V6J 2R5, Canada',
    city: 'Vancouver, BC'
  },
  {
    location: {
      lat: 49.192632,
      lng: -122.969338
    },
    title: 'Bugs',
    season: 'Season 01',
    episode: 'Season 01: Episode 08',
    loc: 'Canadian Motion Picture Park',
    pin: '8085 Glenwood Dr, Burnaby, BC V3N 5C8',
    city: 'Burnaby, BC'
  },
  {
    location: {
      lat: 49.265702,
      lng: -123.101230
    },
    title: 'Bad Day At Black Rock',
    season: 'Season 03',
    episode: 'Season 03: Episode 03',
    loc: '2111 Main St',
    pin: '2111 Main St, Vancouver, BC V5T 3C6',
    city: 'Vancouver, BC'
  },
  {
    location: {
      lat: 49.125014,
      lng: -123.182593
    },
    title: 'Mystery Spot',
    season: 'Season 03',
    episode: 'Season 03: Episode 11',
    loc: 'George\'s Taverna',
    pin: '12160-12242 First Ave, Richmond, BC V7E, Canada',
    city: 'Richmond, BC'
  },
  {
    location: {
      lat: 49.133340,
      lng: -123.092142
    },
    title: 'Monster Movie',
    season: 'Season 04',
    episode: 'Season 04: Episode 05',
    loc: 'Former Fantasy Gardens',
    pin: '11760 Steveston Hwy, Richmond, BC V7A, Canada',
    city: 'Richmond, BC'
  },
  {
    location: {
      lat: 49.228081,
      lng: -122.995914
    },
    title: 'The Curious Case Of Dean Winchester',
    season: 'Season 05',
    episode: 'Season 05: Episode 07',
    loc: '4808 Hazel St.',
    pin: '4808 Hazel St. Burnaby, BC V5H 4T3',
    city: 'Burnaby, BC'
  },
  {
    location: {
      lat: 49.203568,
      lng: -122.912689
    },
    title: 'Hammer of the Gods',
    season: 'Season 05',
    episode: 'Season 05: Episode 19',
    loc: 'The Metro Hall',
    pin: '700 Royal Ave, New Westminster, BC V3M 5Z5, Canada',
    city: 'New Westminster, BC'
  },
  {
    location: {
      lat: 49.211423,
      lng: -123.150903
    },
    title: 'The Third Man',
    season: 'Season 06',
    episode: 'Season 06: Episode 03',
    loc: 'Casa Mia',
    pin: '1920 SW Marine Dr, Vancouver, BC V6P 6B2',
    city: 'Vancouver, BC'
  },
  {
    location: {
      lat: 49.104432,
      lng: -122.7342177
    },
    title: 'We Need to Talk About Kevin',
    season: 'Season 08',
    episode: 'Season 08: Episode 01',
    loc: 'Cloverdale Service',
    pin: '17625 56 Ave, Surrey, BC V3S 1C6, Canada',
    city: 'Surrey, BC'
  },
  {
    location: {
      lat: 49.181514,
      lng: -122.845442
    },
    title: 'Sacrifice',
    season: 'Season 08',
    episode: 'Season 08: Episode 23',
    loc: 'Compass Point Inn',
    pin: '9850 King George Hwy, Surrey, BC V3T',
    city: 'Surrey, BC'
  }
];


/*=========================Custom Map Style=========================*/

var customStyles = [{
  featureType: 'water',
  stylers: [{
    color: '#7ebddd'
  }]
}, {
  featureType: 'transit.station',
  elementType: 'labels.icon',
  stylers: [{
    hue: '#C3D22A'
  }, {
    weight: 9
  }]
}, {
  featureType: 'administrative',
  elementType: 'labels.text.stroke',
  stylers: [{
      color: '#ffffff'
    },
    {
      weight: 6
    }
  ]
}, {
  featureType: 'administrative',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#a07144'
  }]
}, {
  featureType: 'administrative.neighborhood',
  stylers: [{
    visibility: 'on'
  }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{
    color: '#9EA1A4'
  }, {
    lightness: -9
  }]
}, {
  featureType: 'road.local',
  elementType: 'geometry.fill',
  stylers: [{
    color: '#E2E3DF'
  }]
}, {
  featureType: 'road.arterial',
  elementType: 'geometry.fill',
  stylers: [{
    color: '#BEC0BD'
  }]
}, {
  featureType: 'landscape',
  elementType: 'geometry',
  stylers: [{
    hue: '#f9d0b0'
  }]
}, {
  featureType: 'landscape.natural',
  elementType: 'geometry',
  stylers: [{
    hue: '#7BA55E'
  }]
}, {
  featureType: 'poi',
  elementType: 'geometry',
  stylers: [{
    color: '#BCF2AF'
  }]
}, {
  featureType: 'poi.medical',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#F32818'
  }]
}, {
  featureType: 'poi.government',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#061072'
  }]
}, {
  featureType: 'poi.park',
  elementType: 'geometry.fill',
  stylers: [{
    color: '#89DA64'
  }]
}, {
  featureType: 'poi.attraction',
  elementType: 'labels.text.fill',
  stylers: [{
    color: '#156822'
  }]
}];
