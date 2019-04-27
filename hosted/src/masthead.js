"use strict";

var Masthead = function Masthead(props) {
	if (props.loggedIn === "true") {
		return React.createElement(
			React.Fragment,
			null,
			React.createElement(
				"h1",
				{ id: "title" },
				"Doodle Drop"
			),
			React.createElement(
				"nav",
				null,
				React.createElement(
					"a",
					{ href: "/" },
					"Home"
				),
				React.createElement(
					"button",
					{ "data-toggle": "dropdown", type: "button", id: "user-menu" },
					props.username,
					" ",
					React.createElement("i", { className: "fas fa-caret-down" })
				),
				React.createElement(
					"div",
					{ className: "dropdown-menu" },
					React.createElement(
						"a",
						{ className: "dropdown-item", href: "/draw" },
						"Draw New Doodle"
					),
					React.createElement(
						"a",
						{ className: "dropdown-item", href: "/user" },
						"My Doodles"
					),
					React.createElement(
						"a",
						{ className: "dropdown-item", href: "/change-password" },
						"Change Password"
					),
					React.createElement(
						"a",
						{ className: "dropdown-item", href: "/logout" },
						"Logout"
					)
				)
			)
		);
	} else {
		return React.createElement(
			React.Fragment,
			null,
			React.createElement(
				"h1",
				{ id: "title" },
				"Doodle Drop"
			),
			React.createElement(
				"nav",
				null,
				React.createElement(
					"a",
					{ href: "/login" },
					"Log In/Sign Up"
				)
			)
		);
	}
};

var setup = function setup() {
	var loggedIn = document.querySelector("#masthead").dataset.loggedin;
	var username = document.querySelector("#masthead").dataset.username;

	ReactDOM.render(React.createElement(Masthead, { loggedIn: loggedIn, username: username }), document.querySelector("#masthead"));
};

$(document).ready(setup());