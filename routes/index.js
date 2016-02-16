var express = require('express');
var router = express.Router();
var io = require("socket.io-emitter")({host: 'localhost', port: 6379});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
    Simple heartbeat check in for services that hit the catflap
    translation layer from REST to WebSockets
*/
router.put('/heartbeat/:id', function (req, res, next) {
    console.log("heartbeat from %s", req.params.id);
    io.in("monitor").emit("monitor", req.params.id);
    res.send("ok");    
});

router.put('/update/:id', function (req, res, next) {
    console.log("update from %s", req.params.id);
    io.in("fqdn/foo.com").emit("update", {channel: "fqdn/foo.com", msg: "update from UI"});
    res.send("ok");
})


module.exports = router;
