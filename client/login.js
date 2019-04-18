const redirect = (response) => {
	window.location = response.redirect;
};

// define login React element
const LoginWindow = () => {
	return (
		<div>
			<form id="loginForm"
						action="/login"
						method="POST"
						onSubmit={handleLogin}
			>
				<label htmlFor="username">Username: </label>
				<input name="username" type="text" id="username"/>

				<label htmlFor="password">Password: </label>
				<input name="password" type="password" id="password"/>

				<input type="submit" value="Sign In"/>
			</form>

			<label htmlFor="signupButton">Don't have an account yet?</label>
			<button name="signupButton" id="signupButton" onClick={createSignupWindow}>Sign Up</button>
		</div>
	);
};

// handle provided login information
const handleLogin = (e) => {
	// don't automatically refresh the page
	e.preventDefault();

	if ($("#username").val() == '' || $("#password").val() == '') {
		console.log("All fields are required.");
		return false;
	}

	// send AJAX over jQuery function
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#loginForm").attr("action"),
		data: $("#loginForm").serialize(),
		dataType: "json",
		success: redirect,
	});

	return false;
};

// define signup React element
const SignupWindow = () => {
	return (
		<div>
			<form id="signupForm"
						action="/signup"
						method="POST"
						onSubmit={handleSignup}
			>
				<label htmlFor="username">Username: </label>
				<input name="username" type="text" id="username"/>

				<label htmlFor="password">Password: </label>
				<input name="password" type="password" id="password"/>

				<label htmlFor="password2">Retype Password: </label>
				<input name="password2" type="password" id="password2"/>

				<input type="submit" value="Sign up"/>
			</form>

			<label htmlFor="loginButton">Already have an account?</label>
			<button name="loginButton" id="loginButton" onClick={createLoginWindow}>Log In</button>
		</div>
	);
};

const handleSignup = (e) => {
	e.preventDefault();

	if ($("#username").val() == '' || $("#password").val() == '' || $("#password2").val() == '') {
		console.log("All fields are required.");
		return false;
	}

	if ($("#password").val() !== $("#password2").val()) {
		console.log("Passwords do not match.");
		return false;
	}

	// send AJAX over jQuery function
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#signupForm").attr("action"),
		data: $("#signupForm").serialize(),
		dataType: "json",
		success: redirect,
	});

	return false;
};

// render React login element to document
const createLoginWindow = () => {
	ReactDOM.render(
		<LoginWindow/>,
		document.querySelector("#content")
	);
};

// render React signup element to document
const createSignupWindow = () => {
	ReactDOM.render(
		<SignupWindow/>,
		document.querySelector("#content")
	);
};

// display login window as default view when page loads
$(document).ready(createLoginWindow());
