import React from "react";
import "./styles/styles.css";
import moment from "moment";
import NavbarNew from "./components-revised/NavbarNew";
import SearchNew from "./components-revised/SearchNew";
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux";
import store from "./store/store";
import DetailsNew from "./components-revised/DetailsNew";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleGeocoderZip = this.handleGeocoderZip.bind(this);
		this.handleGeocoderCity = this.handleGeocoderCity.bind(this);
		this.handleFiveDayZip = this.handleFiveDayZip.bind(this);
		this.handleFiveDayCity = this.handleFiveDayCity.bind(this);
		this.handleState = this.handleState.bind(this);
		this.handleForecast = this.handleForecast.bind(this);
		this.state = {
			apiKey: process.env.REACT_APP_API_KEY,
			error: null,
			location: "",
			zip: "",
			humidity: "",
			temp: "",
			temp_max: "",
			temp_min: "",
			country: "",
			city: "",
			state: "",
			feels_like: "",
			forecast: "",
			sunrise: "",
			sunset: "",
			main: "",
			list: [],
		};
	}
	// Open Weather Map API call if user provides a city name
	handleGeocoderCity = async (location, country) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=${this.state.apiKey}`
		);
		const details = await response.json();

		console.log(details);

		let forecast = {};

		if (details.id) {
			forecast = await this.handleForecast(details);
		} else {
			forecast = details;
		}

		await this.handleState(forecast);

		//console.log(details);
	};
	// Open Weather Map API call if user provides a Zip Code
	handleGeocoderZip = async (zip, country) => {
		console.log(this.state.apiKey)
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${this.state.apiKey}`
		);
		const details = await response.json();

		console.log(details);

		let forecast = {};

		if (details.id) {
			forecast = await this.handleForecast(details);
		} else {
			forecast = details;
		}

		await this.handleState(forecast);

		//console.log(forecast);
	};
	handleFiveDayCity = async (location, country) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${location},${country}&cnt=20&appid=${this.state.apiKey}`
		);
		const details = await response.json();

		//console.log(details);

		let forecast = [...details.list];

		//console.log(forecast);

		this.setState(() => ({
			list: forecast,
		}));
	};
	handleFiveDayZip = async (zip, country) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},${country}&cnt=20&appid=${this.state.apiKey}`
		);
		const details = await response.json();

		//console.log(details);

		let forecast = [...details.list];

		//console.log(forecast);

		this.setState(() => ({
			list: forecast,
		}));
	};
	// Open Weather API call for locations with a City ID
	handleForecast = async (data) => {
		console.log(data)
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?id=${data.id}&appid=${this.state.apiKey}`
		);
		const details = await response.json();
		return details;
	};
	handleState = (details) => {
		var shift = details.timezone + 18000;
		console.log(shift);
		this.setState(() => ({
			humidity: details.main.humidity,
			temp: Math.round(details.main.temp * 1.8 - 459.67),
			temp_max: Math.round(details.main.temp_max * 1.8 - 459.67),
			temp_min: Math.round(details.main.temp_min * 1.8 - 459.67),
			country: details.sys.country,
			city: details.name,
			feels_like: Math.round(details.main.feels_like * 1.8 - 459.67),
			forecast: details.weather[0].description,
			main: details.weather[0].main,
			sunrise: moment
				.unix(details.sys.sunrise)
				.add(shift, "seconds")
				.format("h:mm A"),
			sunset: moment
				.unix(details.sys.sunset)
				.add(shift, "seconds")
				.format("h:mm A"),
			// state: details[0].state,
		}));
	};
	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<NavbarNew />
					<SearchNew />
					<DetailsNew />
				</Provider>
			</div>
		);
	}
}

export default App;
