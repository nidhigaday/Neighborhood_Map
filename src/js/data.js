/*=========================Locations Data===========================*/


var data = [{
    location: {
      lat: 49.192632,
      lng: -122.969338
    },
    title: 'Bugs',
    season: 'Season 1',
    episode: 'Season 01: Episode 08',
    loc: 'Canadian Motion Picture Park',
    pin: '8085 Glenwood Dr, Burnaby, BC V3N 5C8',
    city: 'Burnaby, BC'
  },
  {
    location: {
      lat: 49.2596037,
      lng: -122.7990194
    },
    title: 'In My Time Of Dying',
    season: 'Season 2',
    episode: 'Season 02: Episode 01',
    loc: 'Riverview Mental Hospital',
    pin: '2601 Lougheed Hwy, Coquitlam, BC V4C 4J2, Canada',
    city: 'Coquitlam, BC'
  },
  {
    location: {
      lat: 49.125014,
      lng: -123.182593
    },
    title: 'Mystery Spot',
    season: 'Season 3',
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
    season: 'Season 4',
    episode: 'Season 04: Episode 05',
    loc: 'Former Fantasy Gardens',
    pin: '11760 Steveston Hwy, Richmond, BC V7A, Canada',
    city: 'Richmond, BC'
  },
  {
    location: {
      lat: 49.239625,
      lng: -122.9656191
    },
    title: 'Changing Channels',
    season: 'Season 5',
    episode: 'Season 05: Episode 08',
    loc: 'Burnaby Village Museum',
    pin: '6501 Deer Lake Ave, Burnaby, BC V5G 3T6, Canada',
    city: 'Burnaby, BC'
  },
  {
    location: {
      lat: 49.211423,
      lng: -123.150903
    },
    title: 'The Third Man',
    season: 'Season 6',
    episode: 'Season 06: Episode 03',
    loc: 'Casa Mia',
    pin: '1920 SW Marine Dr, Vancouver, BC V6P 6B2',
    city: 'Vancouver, BC'
  },
  {
    location: {
      lat: 49.103639,
      lng: -122.652862
    },
    title: 'Slash Fiction',
    season: 'Season 7',
    episode: 'Season 07: Episode 06',
    loc: 'Credit Unions of BC​',
    pin: '20550 Fraser Hwy, Langley Twp, BC V3A 4G2, Canada',
    city: 'Langley, BC'
  },
  {
    location: {
      lat: 49.181514,
      lng: -122.845442
    },
    title: 'Sacrifice',
    season: 'Season 8',
    episode: 'Season 08: Episode 23',
    loc: 'Compass Point Inn',
    pin: '9850 King George Hwy, Surrey, BC V3T',
    city: 'Surrey, BC'
  },
  {
    location: {
      lat: 49.149775,
      lng: -122.845167
    },
    title: 'Rock And A Hard Place',
    season: 'Season 9',
    episode: 'Season 09: Episode 08',
    loc: 'Kalmar Restaurant ',
    pin: '8076 King George Blvd, Surrey, BC V3W 5B5, Canada',
    city: 'Surrey, BC'
  },
  {
    location: {
      lat: 49.089348,
      lng: -123.041458
    },
    title: 'Black',
    season: 'Season 10',
    episode: 'Season 10: Episode 01',
    loc: 'Sundance Pub',
    pin: '6574 Ladner Trunk Rd, Delta, BC V4K 3N3, Canada',
    city: 'Delta, BC'
  },
  {
    location: {
      lat: 49.2762265,
      lng: -123.1236937
    },
    title: 'Just My Imagination',
    season: 'Season 11',
    episode: 'Season 11: Episode 08',
    loc: 'Emery Barnes Park',
    pin: '1170 Richards St, Vancouver, BC V6B 5B6, Canada',
    city: 'Vancouver, BC'
  },
  {
    location: {
      lat: 49.0641553,
      lng: -122.8164795
    },
    title: 'Lotus',
    season: 'Season 12',
    episode: 'Season 12: Episode 08',
    loc: 'Timberland Hotel & Campground',
    pin: '3418 King George Blvd, Surrey, BC V4P 1A8, Canada',
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
