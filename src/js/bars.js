"use strict";

import React from "react";

import queueueue from "./lib/queueueue";
import App from "./components/app";

require("6to5/polyfill");

window.BARS = {
  mount: function(el) {
    var queue = queueueue(50),
        socket,
        app,
        config;

    socket = new WebSocket("ws://localhost:9999");
    socket.onmessage = function (msg) {
      var data = JSON.parse(msg.data);

      // The first time we receive data from the socket,
      // set the config to it and create the Graph.
      if (!config) {
        config = data;

        // madness
        app = React.render(
          <App
            data={queue()}
            size={50}
            min={config.min || 0}
            max={config.max || 100}
          />,
          document.getElementById("bars-app")
        );

        return;
      }

      app && app.setState({ data: queue(parseInt(data, 10))});
    };
  }
}
