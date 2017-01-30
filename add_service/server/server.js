var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Make sure we have a repository and port provided.
    if(!options.repository) throw new Error("A server must be started with a connected repository.");
    if(!options.port) throw new Error("A server must be started with a port.");

    //  Create the app, add some logging.
    var app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    //  Add the API to the app.
    require('../api/add')(app, options);

    //  Start the app, creating a running server which we return.
    var server = app.listen(options.port, () => {
      resolve(server);
    });

  });
};
