// redirect after successful AJAX
const redirect = (response) => {
	window.location = response.redirect;
};

// alert user of error
const error = (response) => {
	alert(JSON.parse(response.responseText).error);
};

// handle provided login information
const handleLogin = (e) => {
	// prevent page reload
	e.preventDefault();

	console.log("hello");

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#loginForm").attr("action"),
		data: $("#loginForm").serialize(),
		dataType: "json",
		success: redirect,
		error: error
	});
};

// login window React component
const LoginWindow = () => {
	return (
		<form id="loginForm"
					action="/login"
					method="POST"
					onSubmit={handleLogin}>

			<div className="input-container">
				<label htmlFor="username">Username: </label>
				<input name="username" type="text" id="username"/>
			</div>

			<div className="input-container">
				<label htmlFor="password">Password: </label>
				<input name="password" type="password" id="password"/>
			</div>

			<div className="submit-container">
				<input type="submit" value="Sign In"/>
			</div>

			<label htmlFor="signupButton">Don't have an account yet?</label>
			<button name="signupButton" id="signupButton" onClick={createSignupWindow}>Sign Up</button>
		</form>
	);
};

// handle provided signup information
const handleSignup = (e) => {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#signupForm").attr("action"),
		data: $("#signupForm").serialize(),
		dataType: "json",
		success: redirect,
		error: error
	});
};

// signup window React component
const SignupWindow = () => {
	return (
		<form id="signupForm"
					action="/signup"
					method="POST"
					onSubmit={handleSignup}>

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

			<label htmlFor="loginButton">Already have an account?</label>
			<button name="loginButton" id="loginButton" onClick={createLoginWindow}>Log In</button>
		</form>
	);
};

// render React login component to document
const createLoginWindow = () => {
	ReactDOM.render(
		<LoginWindow/>,
		document.querySelector(".form-container")
	);
};

// render React signup component to document
const createSignupWindow = () => {
	ReactDOM.render(
		<SignupWindow/>,
		document.querySelector(".form-container")
	);
};

// display login window as default view when page loads
$(document).ready(createLoginWindow());
