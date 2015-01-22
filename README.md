# bootstrap DHT yourself - DHTY

Let you bootstrap DHT connection without root nodes.

```
var BOOTSTRAP_NODES = [
  'router.bittorrent.com:6881',
  'router.utorrent.com:6881',
  'dht.transmissionbt.com:6881'
]
```

Dirtily, it scans network randomly until it s able to find peers connected to the bittorrent DHT.

It scans for most commonly used port numbers according to https://dsn.tm.kit.edu/english/2936.php.

It may be longer than usual bootstrap nodes. But nothing unbearable according to my tests, few minutes at worst to find peers.


# API

It surrounds DHT constructor to instantiate and consume a DHT table to fill it. It then returns the table when it s ready.

See cli.js for runnable example.


For DHT please refer to https://github.com/feross/bittorrent-dht

# Why ?

To demonstrate this is possible because nowadays bittorent is so popular.