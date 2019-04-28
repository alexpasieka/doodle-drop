"use strict";

// redirect after successful AJAX
var redirect = function redirect(response) {
	window.location = response.redirect;
};

// alert user of error
var error = function error(response) {
	alert(JSON.parse(response.responseText).error);
};

// handle provided login information
var handleLogin = function handleLogin(e) {
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
var LoginWindow = function LoginWindow() {
	return React.createElement(
		"form",
		{ id: "loginForm",
			action: "/login",
			method: "POST",
			onSubmit: handleLogin },
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
			React.createElement("input", { type: "submit", value: "Sign In" })
		),
		React.createElement(
			"label",
			{ htmlFor: "signupButton" },
			"Don't have an account yet?"
		),
		React.createElement(
			"button",
			{ name: "signupButton", id: "signupButton", onClick: createSignupWindow },
			"Sign Up"
		)
	);
};

// handle provided signup information
var handleSignup = function handleSignup(e) {
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
var SignupWindow = function SignupWindow() {
	return React.createElement(
		"form",
		{ id: "signupForm",
			action: "/signup",
			method: "POST",
			onSubmit: handleSignup },
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
			{ htmlFor: "loginButton" },
			"Already have an account?"
		),
		React.createElement(
			"button",
			{ name: "loginButton", id: "loginButton", onClick: createLoginWindow },
			"Log In"
		)
	);
};

// render React login component to document
var createLoginWindow = function createLoginWindow() {
	ReactDOM.render(React.createElement(LoginWindow, null), document.querySelector(".form-container"));
};

// render React signup component to document
var createSignupWindow = function createSignupWindow() {
	ReactDOM.render(React.createElement(SignupWindow, null), document.querySelector(".form-container"));
};

// display login window as default view when page loads
$(document).ready(createLoginWindow());