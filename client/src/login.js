// handle provided log in information
const handleLogIn = (e) => {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#log-in-form").attr("action"),
		data: $("#log-in-form").serialize(),
		dataType: "json",
		success: redirect,
		error: error
	});
};

// log in window React component
const LogInWindow = () => {
	return (
		<form id="log-in-form"
					action="/log-in"
					method="POST"
					onSubmit={handleLogIn}>

			<div className="input-container">
				<label htmlFor="username">Username: </label>
				<input name="username" type="text" id="username"/>
			</div>

			<div className="input-container">
				<label htmlFor="password">Password: </label>
				<input name="password" type="password" id="password"/>
			</div>

			<div className="submit-container">
				<input type="submit" value="Log In"/>
			</div>

			<label htmlFor="signUpButton">Don't have an account yet?</label>
			<button name="signUpButton" id="signUpButton" onClick={createSignUpWindow}>Sign Up</button>
		</form>
	);
};

// handle provided sign up information
const handleSignUp = (e) => {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#sign-up-form").attr("action"),
		data: $("#sign-up-form").serialize(),
		dataType: "json",
		success: redirect,
		error: error
	});
};

// sign up window React component
const SignUpWindow = () => {
	return (
		<form id="sign-up-form"
					action="/sign-up"
					method="POST"
					onSubmit={handleSignUp}>

			<div className="input-container">
				<label htmlFor="username">Username: </label>
				<input name="username" type="text" id="username"/>
			</div>

			<div className="input-container">
				<label htmlFor="password">Password: </label>
				<input name="password" type="password" id="password"/>
			</div>

			<div className="input-container">
				<label htmlFor="password2">Retype Password: </label>
				<input name="password2" type="password" id="password2"/>
			</div>

			<div className="submit-container">
				<input type="submit" value="Sign up"/>
			</div>

			<label htmlFor="logInButton">Already have an account?</label>
			<button name="logInButton" id="logInButton" onClick={createLogInWindow}>Log In</button>
		</form>
	);
};

// render React log in component
const createLogInWindow = () => {
	ReactDOM.render(
		<LogInWindow/>,
		document.querySelector(".form-container")
	);
};

// render React sign up component
const createSignUpWindow = () => {
	ReactDOM.render(
		<SignUpWindow/>,
		document.querySelector(".form-container")
	);
};

// display log in window as default view when page loads
$(document).ready(createLogInWindow());
