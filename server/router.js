// import functions
const controllers = require('./controllers');
const middleware = require('./middleware');

// define router
const router = (app) => {
	// home page
  app.get('/', controllers.Doodle.homePage);

	// log in page
  app.get('/log-in', middleware.requiresLogout, controllers.Account.logInPage);
  app.post('/log-in', middleware.requiresLogout, controllers.Account.logIn);

	// sign up page
  app.post('/sign-up', middleware.requiresLogout, controllers.Account.signUp);

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

	// log out
  app.get('/log-out', middleware.requiresLogin, controllers.Account.logOut);

	// 404 page not found redirection
  app.get('/*', controllers.Doodle.pageNotFound);
};

// export router
module.exports = router;
