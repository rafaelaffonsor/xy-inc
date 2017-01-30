//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mysql = require('mysql');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    this.connection = mysql.createConnection(this.connectionSettings);
  }

  getPois() {
    return new Promise((resolve, reject) => {

      this.connection.query('SELECT name, coord_x, coord_y FROM poi', (err, results) => {
        if(err) {
          this.connection = mysql.createConnection(this.connectionSettings);
          return reject(new Error('An error occured getting pois: ' + err));
        }

        resolve((results || []).map((poi) => {
          return {
            name: poi.name,
            coord_x: poi.coord_x,
            coord_y: poi.coord_y
          };
        }));
      });

    });
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
