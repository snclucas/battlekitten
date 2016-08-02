
module.exports = function(app, passport) {

  app.get('/privacy', function(req, res) {
    res.render('static/privacy.ejs');
  });

  app.get('/terms', function(req, res) {
    res.render('static/terms.ejs');
  });

  app.get('/about', function(req, res) {
    res.render('static/about.ejs');
  });

  app.get('/landing', function(req, res) {
    res.render('static/landing.ejs', {
      message: ""
    });
  });


}