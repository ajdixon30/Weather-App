import React from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/components/search.css";
import codes from "../country-codes.json";

const codesArray = Object.entries(codes[0]).sort();

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.sendLocation = this.sendLocation.bind(this);
	}
	sendLocation = (e) => {
		e.preventDefault();
		const input = e.target.elements.cityZip.value;
		const country = e.target.elements.countrySelect.value;
		const numRegex = /[0-9]/;
		if (numRegex.test(input)) {
			this.props.getForecastZip(input, country);
			this.props.getFiveDayZip(input, country);
		} else {
			this.props.getForecastCity(input, country);
			this.props.getFiveDayCity(input, country);
		}
		e.target.elements.cityZip.value = "";
	};
	render() {
		return (
			<div className="container-form">
				<form onSubmit={this.sendLocation}>
					<input
						id="search-input"
						className="search-input__original"
						type="text"
						placeholder="Enter City/Zip"
						name="cityZip"
					/>
					<button id="search-btn" className="search-btn__original">
						<FaSearch className="search-icon" />
					</button>
					<select
						id="country-dropdown"
						className="country-dropdown__original"
						name="countrySelect"
					>
						{codesArray.map((code, index) => {
							return (
								<option className="country-option" key={index} value={code[0]}>
									{code[0]} - {code[1]}
								</option>
							);
						})}
					</select>
				</form>
			</div>
		);
	}
}

export default Search;
