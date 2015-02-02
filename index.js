

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function genIp(){
  return getRandomInt(0, 255) + '.' +
    getRandomInt(0, 255) + '.' +
    getRandomInt(0, 255) + '.' +
    getRandomInt(1, 254);
}

module.exports = function(opts, then){

  if (opts.debug) {
    process.env['DEBUG'] = opts.debug;
  }
  var DHT = require('bittorrent-dht');

  if (opts.bootstrap === 'diy') {

    opts.bootstrap = false;

    var lookupLength = opts.lookupLength
      || 150;

    var lookupPorts = opts.lookupPorts
      || ['6881', '49001', '51413'];

    var dht = new DHT(opts);

    var knownIps = [];
    var randomIpGenerator = function(l) {
      l = (l || 21) * lookupPorts.length;
      var ipsToTest = [];
      while (ipsToTest.length < l) {
        var ip = genIp();
        if (knownIps.indexOf(ip) === -1){
          knownIps.push(ip);
          lookupPorts.forEach(function(v){
            ipsToTest.push(ip + ':' + v);
          });
        }
      }
      return ipsToTest;
    };

    var keepLooking = true;
    var lookup = function () {
      if (keepLooking) {
        dht.lookup(dht.nodeId, {
          findNode: true,
          addrs: randomIpGenerator(lookupLength + 1)
        }, lookup);
      }
    };
    lookup();
    dht.once('node', function () {
      keepLooking = false;
      then(dht);
    });
    return dht;
  } else {
    var dht = new DHT(opts);
    then(dht);
    return dht;
  }
};
