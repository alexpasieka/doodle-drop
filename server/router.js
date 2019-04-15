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

  // upload page
	app.get('/upload', middleware.requiresLogin, controllers.Doodle.uploadPage);
	app.post('/upload', middleware.requiresLogin, controllers.Doodle.upload);

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
