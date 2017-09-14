/*=========================APIs=============================*/

//Google Map API
var myMapsKey = 'AIzaSyAqviK9aa_gQHWt9XK8aa_EZlIQ28ScwOQ';

//Wikipedia API
// var Wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
// cityStr + "&format=json&callback=wikiCallback";
// console.log(Wikiurl);

var wikiRequestTimeout = setTimeout(function() {
  $wikiElem.text('Failed to get Wikipedia Resources');
}, 6000);

$.ajax({
  url: Wikiurl,
  dataType: 'jsonp'
}).done(function(data) {
  for (i = 0; i < data.length; i++) {
    var wikiTitle = data[1][i];
    var wikiUrl = data[3][i];
    $wikiElem.append('<li>' +
      '<a target="_blank" href="' + wikiUrl + '">' +
      '<h3>' + wikiTitle + '</h3>' +
      '</a>' +
      '</li>');
  }
  clearTimeout(wikiRequestTimeout);
});

//Yelp API
var config = {
  apiKey: "AIzaSyD5Et3G-0OOF0B4ER5zHiM19kZo2xXfdO4",
  NYTapiKey: "e15d65400bed43469eb44fd08e475b3a",
  Consumer_Key: "ozZGFps-eIx-vXl1ROf4hA",
  Consumer_Secret: "0pUUUKeY3j1P88bz55nr7LN1J5w",
  Token: "oZ7hinuN_4xr5hmrNw8k-SFBGYNdFdHj",
  Token_Secret: "Z5OdBXDGliNWv9KrtLfr7XPYujQ"
};
//var NYTapiKey = "3d20415456d2153f63e3b1c268f9d940:5:73617106";
var apiKey = config.apiKey,
  NYTapiKey = config.NYTapiKey;
var parameters = {
  oauth_consumer_key: config.Consumer_Key,
  oauth_token: config.Token,
};

var consumer_Secret = config.Consumer_Secret, // unique key to each api account - must include
  token_Secret = config.Token_Secret;
