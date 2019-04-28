// handle new doodle
const handleDoodle = (e) => {
	// prevent page reload
	e.preventDefault();

	// send AJAX
	$.ajax({
		cache: false,
		type: 'POST',
		url: $('#doodle-form').attr('action'),
		data: $('#doodle-form').serialize(),
		dataType: 'json',
		success: redirect,
		error: error
	});
};

// new doodle form React component
const DoodleForm = () => {
	return (
		<form id="doodle-form"
					action="/draw"
					method="POST"
					onSubmit={handleDoodle}>

			<input name="image" type="hidden"/>
			<input type="submit" value="Post"/>
		</form>
	);
};

// page setup
const setup = () => {
	ReactDOM.render(
		<DoodleForm/>,
		document.querySelector("#post-doodle")
	);

	// ** DRAWING CODE **
	// canvas contexts
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	const c2s = new C2S(400, 400);

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
	let dragging = false;

	// get mouse position within canvas
	const getMousePosition = (e) => {
		const mousePosition = {};
		mousePosition.x = e.pageX - e.target.offsetLeft;
		mousePosition.y = e.pageY - e.target.offsetTop;
		return mousePosition;
	};

	// mouse start drawing
	const mouseDown = (e) => {
		dragging = true;

		// start line
		const mousePosition = getMousePosition(e);
		ctx.beginPath();
		ctx.moveTo(mousePosition.x, mousePosition.y);
		c2s.beginPath();
		c2s.moveTo(mousePosition.x, mousePosition.y);
	};

	// mouse drawing
	const mouseMove = (e) => {
		if (!dragging) return;

		// draw line
		const mousePosition = getMousePosition(e);
		ctx.lineTo(mousePosition.x, mousePosition.y);
		ctx.stroke();
		c2s.lineTo(mousePosition.x, mousePosition.y);
		c2s.stroke();
	};

	// mouse stops drawing
	const mouseUp = () => {
		// end line
		ctx.closePath();
		c2s.closePath();
		dragging = false;

		// convert canvas to SVG string
		const mySerializedSVG = c2s.getSerializedSvg().toString();
		document.querySelector("form").querySelector("input[name='image']").value = mySerializedSVG;
	};

	// mouse draws off of canvas
	const mouseOut = () => {
		// end line
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

