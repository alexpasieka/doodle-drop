"use strict";

var Masthead = function Masthead() {
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
				{ href: "/user" },
				"Account"
			),
			React.createElement(
				"a",
				{ href: "/logout" },
				"Log Out"
			)
		)
	);
};

var setup = function setup() {
	ReactDOM.render(React.createElement(Masthead, null), document.querySelector("#masthead"));
};

$(document).ready(setup());