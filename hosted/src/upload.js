"use strict";

var handleDoodle = function handleDoodle(e) {
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
		success: window.location = '/user'
	});
};

var DoodleForm = function DoodleForm() {
	return React.createElement(
		"form",
		{ id: "doodleForm",
			action: "/upload",
			method: "POST",
			onSubmit: handleDoodle
		},
		React.createElement(
			"label",
			{ htmlFor: "doodleTitle" },
			"Title: "
		),
		React.createElement("input", { name: "title", type: "text", id: "doodleTitle" }),
		React.createElement(
			"label",
			{ htmlFor: "Image" },
			"Image: "
		),
		React.createElement("input", { name: "image", type: "text", id: "doodleImage" }),
		React.createElement(
			"label",
			{ htmlFor: "description" },
			"Description: "
		),
		React.createElement("input", { name: "description", type: "text", id: "doodleDescription" }),
		React.createElement("input", { type: "submit", value: "Upload Doodle" })
	);
};

var setup = function setup() {
	ReactDOM.render(React.createElement(DoodleForm, null), document.querySelector("#content"));
};

$(document).ready(setup());