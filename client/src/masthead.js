const Masthead = () => {
	return (
		<React.Fragment>
			<h1 id="title">Doodle Drop</h1>

			<nav>
				<a href="/user">Account</a>
				<a href="/logout">Log Out</a>
			</nav>
		</React.Fragment>
	);
};

const setup = () => {
	ReactDOM.render(
		<Masthead/>,
		document.querySelector("#masthead")
	);
};

$(document).ready(setup());
