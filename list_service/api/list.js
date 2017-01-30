//  Defines the list api. Add to a server by calling:
//  require('./list')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/pois', (req, res, next) => {
    options.repository.getPois().then((pois) => {
      res.status(200).send(pois.map((poi) => { return {
          name: poi.name,
          coord_x: poi.coord_x,
          coord_y: poi.coord_y
        };
      }));
    })
    .catch(next);
  });

};
