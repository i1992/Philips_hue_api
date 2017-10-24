const express = require("express");
const axios = require("axios");
const url =
  "http://192.168.0.15/api/newdeveloper";
const app = express()
var b_data = [];


// use npm axios packge to fetch api through hue-simulator

function get(ref) {
  app.get(
    axios
    .get(url)
    .then(response => {
      const data = response.data.lights;
      for (var key in data) {
        var single = data[key];
        single["id"] = key;

        ref.push({
          id: single.id,
          name: single.name,
          on: single.state.on,
          bri: single.state.bri,
        });
      }

    })
    .catch(error => {
      console.log(error);
    })
  );
}
// call get function and put refrance b_data
get(b_data);

// hold for the 1 second when get method call it update b_data
setTimeout(function() {
  console.log(b_data);
}, 1000);

//compare two array to check any new update and print in console

setInterval(function() {
  var n_data = [];
  get(n_data)

  // check update every five second, is any update occur it print the update and store in b_data

  setTimeout(function() {
    var upd_data = [];

    for (var i in b_data) {
      if (b_data[i].on !== n_data[i].on) {
        upd_data.push({
          id: n_data[i].id,
          on: n_data[i].on
        })
      }
      if (b_data[i].bri !== n_data[i].bri) {
        upd_data.push({
          id: n_data[i].id,
          bri: n_data[i].bri
        })
      }
    }
    if (upd_data.length > 0) {
      console.log("---------update-----------")
      console.log(upd_data)
    }
    b_data = n_data;

  }, 1000);
}, 5000);


// server run on https://localhost:4000

app.listen(process.env.port || 4000, () => {
  console.log('https://localhost:4000');
})
