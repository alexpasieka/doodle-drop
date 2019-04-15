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
					onSubmit={handleDoodle}
			>
			<label htmlFor="doodleTitle">Title: </label>
			<input name="title" type="text" id="doodleTitle"/>

			<label htmlFor="Image">Image: </label>
			<input name="image" type="text" id="doodleImage"/>

			<label htmlFor="description">Description: </label>
			<input name="description" type="text" id="doodleDescription"/>

			<input type="submit" value="Upload Doodle"/>
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
