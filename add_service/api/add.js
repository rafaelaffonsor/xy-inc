//  Defines the add api. Add to a server by calling:
//  require('./add')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.post('/pois', (req, res, next) => {
    var post_data = req.body;
    post_data.coord_x = parseInt(post_data.coord_x);
    post_data.coord_y = parseInt(post_data.coord_y);
    options.repository.addPoi(post_data).then(res.sendStatus(200));
  });

};
