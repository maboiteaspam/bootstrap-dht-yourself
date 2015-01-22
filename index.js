
module.exports = function(opts, then){

  if (opts.bootstrap === "diy") {

    opts.bootstrap = false;

    var lookupLength = opts.lookupLength
      || 150;

    var lookupPorts = opts.lookupPorts
      || ['6881','49001','51413'];

    if (opts.debug) {
      process.env['DEBUG'] = opts.debug;
    }

    var DHT = require('bittorrent-dht');
    var dht = new DHT(opts);

    var knownIps = [];
    var ranomIpGenerator = function(l){
      l = (l || 21)*lookupPorts.length;
      var ipsToTest = [];
      while( ipsToTest.length < l ){
        var ip = genIp();
        if (knownIps.indexOf(ip)===-1){
          knownIps.push(ip);
          lookupPorts.forEach(function(v){
            ipsToTest.push(ip+':'+v);
          });
        }
      }
      return ipsToTest;
    };

    var keep_looking = true;
    function lookup () {
      if (keep_looking) {
        dht.lookup(dht.nodeId, {
          findNode: true,
          addrs: ranomIpGenerator(lookupLength+1)
        }, lookup);
      }
    }
    lookup ();
    dht.once('node', function (addr, hash, from) {
      keep_looking = false;
      then(dht);
    });
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genIp(){
  return getRandomInt(0, 255)+"."+
    getRandomInt(0, 255)+"."+
    getRandomInt(0, 255)+"."+
    getRandomInt(1, 254);
}
