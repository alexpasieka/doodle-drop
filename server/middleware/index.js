// cannot access page if not logged in
const requiresLogin = (req, res, next) => {
	// if there is not an active session, redirect to home page
  if (!req.session.account) {
    return res.redirect('/');
  }

  // move to next middleware function
  return next();
};

// cannot access page if logged in
const requiresLogout = (req, res, next) => {
	// if there is an active session, redirect to user page
  if (req.session.account) {
    return res.redirect('/user');
  }

  // move to next middleware function
  return next();
};

// middleware exports
module.exports = {
  requiresLogin,
  requiresLogout,
};
