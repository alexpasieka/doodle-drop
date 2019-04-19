const ChangePasswordForm = () => {
	return (
		<form id="change-password-form"
					action="/change-password"
					method="POST"
					onsubmit={handleChangePassword}>

			<div className="input-container">
				<label htmlFor="newPassword">New Password: </label>
				<input name="newPassword" type="password" id="new-password"/>
			</div>

			<div className="input-container">
				<label htmlFor="newPassword2">Confirm New Password: </label>
				<input name="newPassword2" type="password" id="new-password2"/>
			</div>

			<div className="submit-container">
				<input type="submit" value="Change Password"/>
			</div>
		</form>
	);
};

const handleChangePassword = (e) => {
	e.preventDefault();

	if ($("#new-password").val() == '' || $("#new-password2").val() == '') {
		alert("All fields are required.");
		return false;
	}

	if ($("#new-password").val() !== $("#new-password2").val()) {
		alert("Passwords do not match.");
		return false;
	}

	// send AJAX over jQuery function
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#change-password-form").attr("action"),
		data: $("#change-password-form").serialize(),
		dataType: "json",
		success: window.location = '/user',
	});
};

const setup = () => {
	ReactDOM.render(
		<ChangePasswordForm/>,
		document.querySelector(".form-container")
	);
};

$(document).ready(setup());
