var pageService = require('../services/PageService');

module.exports = function(app) {
  
  app.get('/', function(req, res) {
    console.log("asdada");
    res.render('index.ejs');
  });

  
   app.get('/pages/add', pageService.addNewPage);
  
  app.get('/page/:page_id', pageService.getPage);
  
 // app.get('/pages/add', pageService.addNewPage);
  app.post('/pages/add', pageService.addNewPage);
 
};