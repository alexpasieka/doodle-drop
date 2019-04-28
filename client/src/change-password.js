// handle password change
const handleChangePassword = (e) => {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $("#change-password-form").attr("action"),
		data: $("#change-password-form").serialize(),
		dataType: "json",
		success: window.location = '/user',
	});
};

// change password form React component
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

// page setup
const setup = () => {
	ReactDOM.render(
		<ChangePasswordForm/>,
		document.querySelector(".form-container")
	);
};
$(document).ready(setup());
