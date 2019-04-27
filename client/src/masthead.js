const Masthead = (props) => {
	if (props.loggedIn === "true") {
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
	else {
		return (
			<React.Fragment>
				<h1 id="title">Doodle Drop</h1>

				<nav>
					<a href="/login">Log In/Sign Up</a>
				</nav>
			</React.Fragment>
		);
	}
};

const setup = () => {
	const loggedIn = document.querySelector("#masthead").dataset.loggedin;
	const username = document.querySelector("#masthead").dataset.username;

	ReactDOM.render(
		<Masthead loggedIn={loggedIn} username={username}/>,
		document.querySelector("#masthead")
	);
};

$(document).ready(setup());
