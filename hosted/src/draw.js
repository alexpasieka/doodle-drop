'use strict';

// handle new doodle
var handleDoodle = function handleDoodle(e) {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		type: $('#doodleForm').attr('method'),
		url: $('#doodleForm').attr('action'),
		data: $('#doodleForm').serialize(),
		dataType: 'json',
		success: window.location = '/user'
	});
};

// new doodle form React component
var DoodleForm = function DoodleForm() {
	return React.createElement(
		'form',
		{ id: 'doodleForm',
			action: '/draw',
			method: 'POST',
			onSubmit: handleDoodle },
		React.createElement('input', { name: 'image', type: 'hidden' }),
		React.createElement('input', { type: 'submit', value: 'Post' })
	);
};

// page setup
var setup = function setup() {
	ReactDOM.render(React.createElement(DoodleForm, null), document.querySelector("#post-doodle"));

	// ** DRAWING CODE **
	// canvas contexts
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	var c2s = new C2S(400, 400);

	// canvas background color
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	c2s.fillStyle = 'white';
	c2s.fillRect(0, 0, canvas.width, canvas.height);

	// drawing defaults
	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	c2s.lineWidth = 3;
	c2s.lineCap = 'round';

	// drawing toggle boolean
	var dragging = false;

	// get mouse position within canvas
	var getMousePosition = function getMousePosition(e) {
		var mousePosition = {};
		mousePosition.x = e.pageX - e.target.offsetLeft;
		mousePosition.y = e.pageY - e.target.offsetTop;
		return mousePosition;
	};

	// mouse start drawing
	var mouseDown = function mouseDown(e) {
		dragging = true;

		var mousePosition = getMousePosition(e);
		ctx.beginPath();
		ctx.moveTo(mousePosition.x, mousePosition.y);
		c2s.beginPath();
		c2s.moveTo(mousePosition.x, mousePosition.y);
	};

	// mouse drawing
	var mouseMove = function mouseMove(e) {
		if (!dragging) return;

		var mousePosition = getMousePosition(e);
		ctx.lineTo(mousePosition.x, mousePosition.y);
		ctx.stroke();
		c2s.lineTo(mousePosition.x, mousePosition.y);
		c2s.stroke();
	};

	// mouse stops drawing
	var mouseUp = function mouseUp() {
		ctx.closePath();
		c2s.closePath();
		dragging = false;

		var mySerializedSVG = c2s.getSerializedSvg().toString();
		document.querySelector("form").querySelector("input[name='image']").value = mySerializedSVG;
	};

	// mouse draws off of canvas
	var mouseOut = function mouseOut() {
		ctx.closePath();
		c2s.closePath();
		dragging = false;
	};

	// hook up event listeners
	canvas.onmousedown = mouseDown;
	canvas.onmousemove = mouseMove;
	canvas.onmouseup = mouseUp;
	canvas.onmouseout = mouseOut;
};
$(document).ready(setup());