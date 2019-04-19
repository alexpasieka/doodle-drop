const handleDoodle = (e) => {
	e.preventDefault();

	if ($("#doodleTitle").val() == '' || $("#doodleImage").val() == '' || $("#doodleDescription").val() == '') {
		alert("All fields are required.");
		return;
	}

	// send AJAX
	$.ajax({
		type: $('#doodleForm').attr('method'),
		url: $('#doodleForm').attr('action'),
		data: $('#doodleForm').serialize(),
		dataType: 'json',
		success: window.location = '/user',
	});
};

const DoodleForm = () => {
	return (
		<form id="doodleForm"
					action="/upload"
					method="POST"
					onSubmit={handleDoodle}>

			<div className="input-container">
				<label htmlFor="doodleTitle">Title: </label>
				<input name="title" type="text" id="doodleTitle"/>
			</div>

			<div className="input-container">
				<label htmlFor="Image">Image: </label>
				<input name="image" type="text" id="doodleImage"/>
			</div>

			<div className="input-container">
				<label htmlFor="description">Description: </label>
				<input name="description" type="text" id="doodleDescription"/>
			</div>

			<div className="submit-container">
				<input type="submit" value="Upload Doodle"/>
			</div>
		</form>
	);
};

const setup = () => {
	ReactDOM.render(
		<DoodleForm/>,
		document.querySelector("#content")
	);
};

$(document).ready(setup());
