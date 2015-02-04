
var DHTY = require('./index');
var magnet = require('magnet-uri');
var opts = {
  bootstrap: 'diy'
  // ,debug: '*' // display debug messages
  // ,K: 20 // the K nodes to initiate the DHT, useful for test
};
DHTY(opts, function(dht) {
  console.error('dht table ready');
  console.error('dht size : ' + dht.toArray().length);
  var uri = 'magnet:?xt=urn:btih:A38D67908B2C31614228DE4C688FDA16EAE859C4';
  var parsed = magnet(uri);
  dht.lookup(parsed.infoHash);
  setInterval(function(){
    console.error('dht size : ' + dht.toArray().length);
  }, 2000);
});
