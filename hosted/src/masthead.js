"use strict";

// masthead React component
var Masthead = function Masthead(props) {
	// if user is logged in
	if (props.loggedIn === "true") {
		// if on the home page
		if (window.location.pathname === '/') {
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
							{ className: "dropdown-item", href: "/log-out" },
							"Log Out"
						)
					)
				)
			);
		}
		// if not on the home page
		else {
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
								{ className: "dropdown-item", href: "/log-out" },
								"Log Out"
							)
						)
					)
				);
			}
	}
	// if user is not logged in
	else {
			// if on the home page
			if (window.location.pathname === '/') {
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
							{ href: "/log-in" },
							"Log In/Sign Up"
						)
					)
				);
			}
			// if on the log in page
			else if (window.location.pathname == '/log-in') {
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
							)
						)
					);
				}
		}
};

// page setup
var setup = function setup() {
	var loggedIn = document.querySelector("#masthead").dataset.loggedin;
	var username = document.querySelector("#masthead").dataset.username;

	ReactDOM.render(React.createElement(Masthead, { loggedIn: loggedIn, username: username }), document.querySelector("#masthead"));
};
$(document).ready(setup());