"use strict";

// handle provided log in information
var handleLogIn = function handleLogIn(e) {
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
var LogInWindow = function LogInWindow() {
	return React.createElement(
		"form",
		{ id: "log-in-form",
			action: "/log-in",
			method: "POST",
			onSubmit: handleLogIn },
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "username" },
				"Username: "
			),
			React.createElement("input", { name: "username", type: "text", id: "username" })
		),
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "password" },
				"Password: "
			),
			React.createElement("input", { name: "password", type: "password", id: "password" })
		),
		React.createElement(
			"div",
			{ className: "submit-container" },
			React.createElement("input", { type: "submit", value: "Log In" })
		),
		React.createElement(
			"label",
			{ htmlFor: "signUpButton" },
			"Don't have an account yet?"
		),
		React.createElement(
			"button",
			{ name: "signUpButton", id: "signUpButton", onClick: createSignUpWindow },
			"Sign Up"
		)
	);
};

// handle provided sign up information
var handleSignUp = function handleSignUp(e) {
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
var SignUpWindow = function SignUpWindow() {
	return React.createElement(
		"form",
		{ id: "sign-up-form",
			action: "/sign-up",
			method: "POST",
			onSubmit: handleSignUp },
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "username" },
				"Username: "
			),
			React.createElement("input", { name: "username", type: "text", id: "username" })
		),
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "password" },
				"Password: "
			),
			React.createElement("input", { name: "password", type: "password", id: "password" })
		),
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "password2" },
				"Retype Password: "
			),
			React.createElement("input", { name: "password2", type: "password", id: "password2" })
		),
		React.createElement(
			"div",
			{ className: "submit-container" },
			React.createElement("input", { type: "submit", value: "Sign up" })
		),
		React.createElement(
			"label",
			{ htmlFor: "logInButton" },
			"Already have an account?"
		),
		React.createElement(
			"button",
			{ name: "logInButton", id: "logInButton", onClick: createLogInWindow },
			"Log In"
		)
	);
};

// render React log in component
var createLogInWindow = function createLogInWindow() {
	ReactDOM.render(React.createElement(LogInWindow, null), document.querySelector(".form-container"));
};

// render React sign up component
var createSignUpWindow = function createSignUpWindow() {
	ReactDOM.render(React.createElement(SignUpWindow, null), document.querySelector(".form-container"));
};

// display log in window as default view when page loads
$(document).ready(createLogInWindow());