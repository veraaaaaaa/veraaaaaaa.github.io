var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.kkbox.com",
  "port": null,
  "path": "/v1.1/mood-stations?territory=TW&offset=0&limit=500",
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer MgFR8ACcu6Yo9rpLv0TZAQ=="
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();