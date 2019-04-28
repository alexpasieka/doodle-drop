// masthead React component
const Masthead = (props) => {
	// if user is logged in
	if (props.loggedIn === "true") {
		// if on the home page
		if (window.location.pathname === '/') {
			return (
				<React.Fragment>
					<h1 id="title">Doodle Drop</h1>

					<nav>
						<button data-toggle="dropdown" type="button" id="user-menu">{props.username} <i className="fas fa-caret-down"></i></button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="/draw">Draw New Doodle</a>
							<a className="dropdown-item" href="/user">My Doodles</a>
							<a className="dropdown-item" href="/change-password">Change Password</a>
							<a className="dropdown-item" href="/logout">Logout</a>
						</div>
					</nav>
				</React.Fragment>
			);
		}
		// if not on the home page
		else {
			return (
				<React.Fragment>
					<h1 id="title">Doodle Drop</h1>

					<nav>
						<a href="/">Home</a>

						<button data-toggle="dropdown" type="button" id="user-menu">{props.username} <i className="fas fa-caret-down"></i></button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="/draw">Draw New Doodle</a>
							<a className="dropdown-item" href="/user">My Doodles</a>
							<a className="dropdown-item" href="/change-password">Change Password</a>
							<a className="dropdown-item" href="/logout">Logout</a>
						</div>
					</nav>
				</React.Fragment>
			);
		}
	}
	// if user is not logged in
	else {
		// if on the home page
		if (window.location.pathname === '/') {
			return (
				<React.Fragment>
					<h1 id="title">Doodle Drop</h1>

					<nav>
						<a href="/login">Log In/Sign Up</a>
					</nav>
				</React.Fragment>
			);
		}
		// if on the login page
		else if (window.location.pathname == '/login') {
			return (
				<React.Fragment>
				<h1 id="title">Doodle Drop</h1>

				<nav>
					<a href="/">Home</a>
				</nav>
			</React.Fragment>
			);
		}
	}
};

// page setup
const setup = () => {
	const loggedIn = document.querySelector("#masthead").dataset.loggedin;
	const username = document.querySelector("#masthead").dataset.username;

	ReactDOM.render(
		<Masthead loggedIn={loggedIn} username={username}/>,
		document.querySelector("#masthead")
	);
};
$(document).ready(setup());
