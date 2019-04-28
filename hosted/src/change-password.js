"use strict";

// handle password change
var handleChangePassword = function handleChangePassword(e) {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#change-password-form").attr("action"),
		data: $("#change-password-form").serialize(),
		dataType: "json",
		success: redirect,
		error: error
	});
};

// change password form React component
var ChangePasswordForm = function ChangePasswordForm() {
	return React.createElement(
		"form",
		{ id: "change-password-form",
			action: "/change-password",
			method: "POST",
			onSubmit: handleChangePassword },
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "newPassword" },
				"New Password: "
			),
			React.createElement("input", { name: "newPassword", type: "password", id: "new-password" })
		),
		React.createElement(
			"div",
			{ className: "input-container" },
			React.createElement(
				"label",
				{ htmlFor: "newPassword2" },
				"Confirm New Password: "
			),
			React.createElement("input", { name: "newPassword2", type: "password", id: "new-password2" })
		),
		React.createElement(
			"div",
			{ className: "submit-container" },
			React.createElement("input", { type: "submit", value: "Change Password" })
		)
	);
};

// page setup
var setup = function setup() {
	ReactDOM.render(React.createElement(ChangePasswordForm, null), document.querySelector(".form-container"));
};
$(document).ready(setup());