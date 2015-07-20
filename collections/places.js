Places = new Mongo.Collection('places');

Meteor.methods({
  'fetchNearbyLocations': function(coords) {
    if(Meteor.isServer) {
      results = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=restaurant|bar&key=AIzaSyCtfoCAldCEf8hXUlkVUd4UljqKR6W_aF4");
      _(results.data.results).each(function(loc) {
        _.extend(loc, {loc: {type: "Point", coordinates: [loc.geometry.location.lng, loc.geometry.location.lat]}});
        console.log(loc);
        Places.upsert({id: loc.id}, {$set: loc});
      });
    }
  }
});
