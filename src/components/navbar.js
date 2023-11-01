import React from "react";
import "../styles/components/navbar.css";

class Navbar extends React.Component {
	render() {
		return (
			<div className="navbar__original" id="navbar">
				<div className="nav-title">{this.props.title}</div>
			</div>
		);
	}
}

export default Navbar;
