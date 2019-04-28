// import functions
const controllers = require('./controllers');
const middleware = require('./middleware');

// define router
const router = (app) => {
	// home page
  app.get('/', controllers.Doodle.homePage);

	// login page
  app.get('/login', middleware.requiresLogout, controllers.Account.loginPage);
  app.post('/login', middleware.requiresLogout, controllers.Account.login);

	// signup page
  app.post('/signup', middleware.requiresLogout, controllers.Account.signup);

	// user page
  app.get('/user', middleware.requiresLogin, controllers.Doodle.userPage);

  // draw page
  app.get('/draw', middleware.requiresLogin, controllers.Doodle.drawPage);
  app.post('/draw', middleware.requiresLogin, controllers.Doodle.postDoodle);

  // delete doodle
  app.post('/delete', middleware.requiresLogin, controllers.Doodle.deleteDoodle);

	// change password page
  app.get('/change-password', middleware.requiresLogin, controllers.Account.changePasswordPage);
  app.post('/change-password', middleware.requiresLogin, controllers.Account.changePassword);

	// logout
  app.get('/logout', middleware.requiresLogin, controllers.Account.logout);

	// 404 page not found redirection
  app.get('/*', controllers.Doodle.pageNotFound);
};

// export router
module.exports = router;
