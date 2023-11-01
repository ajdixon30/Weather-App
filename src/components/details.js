import React from "react";
import "../styles/components/details.css";
import {
	WiSnow,
	WiThunderstorm,
	WiRain,
	WiDaySunny,
	WiCloudy,
} from "react-icons/wi";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Details extends React.Component {
	constructor(props) {
		super(props);
		this.handleDrawer = this.handleDrawer.bind(this);
		this.state = {
			drawerVisible: false,
			imperial: true,
			forecast: "current",
		};
	}
	handleDrawer = () => {
		this.setState((prevState) => ({
			drawerVisible: !prevState.drawerVisible,
		}));
	};
	handleUnits = () => {
		this.setState((prevState) => ({
			imperial: !prevState.imperial,
		}));
	};
	handleButtonClick = (e) => {
		console.log(this.state.forecast);
		console.log(e.target.name);
		if (e.target.name !== this.state.forecast) {
			this.setState(() => ({
				forecast: e.target.name,
			}));
		}
	};
	render() {
		let tempCel = Math.round((this.props.temp - 32) / 1.8);
		let max_tempCel = Math.round((this.props.max_temp - 32) / 1.8);
		let min_tempCel = Math.round((this.props.min_temp - 32) / 1.8);
		let feels_likeCel = Math.round((this.props.feels_like - 32) / 1.8);
		let weather = this.props.weather;
		let icon;
		let detailsState = `${this.props.city} (${this.props.country})`;
		let detailsNoState = `${this.props.city} (${this.props.country})`;
		if (weather === "Clouds") {
			icon = <WiCloudy size="200px" />;
		} else if (weather === "Thunderstorm") {
			icon = <WiThunderstorm size="200px" />;
		} else if (weather === "Clear") {
			icon = <WiDaySunny size="200px" />;
		} else if (weather === "Snow") {
			icon = <WiSnow size="200px" />;
		} else if (weather === "Rain") {
			icon = <WiRain size="200px" />;
		}
		const hourlyForecast = this.props.list.map((entry) => (
			<div key={entry.index}>
				<p className="carousel-style">
					<b>
						{Number(entry.dt_txt.substring(5, 7)) === 1 && `Jan `}
						{Number(entry.dt_txt.substring(5, 7)) === 2 && `Feb `}
						{Number(entry.dt_txt.substring(5, 7)) === 3 && `Mar `}
						{Number(entry.dt_txt.substring(5, 7)) === 4 && `Apr `}
						{Number(entry.dt_txt.substring(5, 7)) === 5 && `May `}
						{Number(entry.dt_txt.substring(5, 7)) === 6 && `Jun `}
						{Number(entry.dt_txt.substring(5, 7)) === 7 && `Jul `}
						{Number(entry.dt_txt.substring(5, 7)) === 8 && `Aug `}
						{Number(entry.dt_txt.substring(5, 7)) === 9 && `Sep `}
						{Number(entry.dt_txt.substring(5, 7)) === 10 && `Oct `}
						{Number(entry.dt_txt.substring(5, 7)) === 11 && `Nov `}
						{Number(entry.dt_txt.substring(5, 7)) === 12 && `Dec `}
						{Number(entry.dt_txt.substring(8, 10))},&nbsp;
						{Number(entry.dt_txt.substring(0, 4))}&nbsp;
					</b>
				</p>
				<p className="carousel-style">
					{Number(entry.dt_txt.substring(11, 13)) === 0 && "12 AM"}
					{Number(entry.dt_txt.substring(11, 13)) === 12 && "12 PM"}
					{Number(entry.dt_txt.substring(11, 13)) < 12 &&
						Number(entry.dt_txt.substring(11, 13)) !== 0 &&
						Number(entry.dt_txt.substring(11, 13)) + " AM"}
					{Number(entry.dt_txt.substring(11, 13)) > 12 &&
						Number(entry.dt_txt.substring(11, 13)) - 12 + " PM"}
				</p>
				{entry.weather[0].main === "Clouds" && (
					<WiCloudy className="weather-icon" size="200px" />
				)}
				{entry.weather[0].main === "Thunderstorm" && (
					<WiThunderstorm className="weather-icon" size="200px" />
				)}
				{entry.weather[0].main === "Clear" && (
					<WiDaySunny className="weather-icon" size="200px" />
				)}
				{entry.weather[0].main === "Snow" && (
					<WiSnow className="weather-icon" size="200px" />
				)}
				{entry.weather[0].main === "Rain" && (
					<WiRain className="weather-icon" size="200px" />
				)}
				<p className="carousel-style">{entry.weather[0].description}</p>
				<div className="carousel-style" onClick={this.handleUnits}>
					{this.state.imperial && (
						<p className="carousel-style">
							{Math.round(entry.main.temp * 1.8 - 459.67)}&#176;F
						</p>
					)}
					{!this.state.imperial && (
						<p className="carousel-style">
							{Math.round(entry.main.temp - 273.15)}&#176;C
						</p>
					)}
				</div>
			</div>
		));
		return (
			<div id="details-section" className="details-section__original">
				{this.props.country === "" ? (
					<div className="details-section__empty">No Location Selected</div>
				) : (
					<div>
						{this.state.forecast === "current" ? (
							<button
								id="current-btn-active"
								className="current-btn-active__original"
								name="current"
								onClick={this.handleButtonClick}
							>
								Current
							</button>
						) : (
							<button
								id="current-btn"
								className="current-btn__original"
								name="current"
								onClick={this.handleButtonClick}
							>
								Current
							</button>
						)}
						{this.state.forecast === "five-day" ? (
							<button
								id="five-day-btn-active"
								className="five-day-btn-active__original"
								name="five-day"
								onClick={this.handleButtonClick}
							>
								5 Day
							</button>
						) : (
							<button
								id="five-day-btn"
								className="five-day-btn__original"
								name="five-day"
								onClick={this.handleButtonClick}
							>
								5 Day
							</button>
						)}
						<div
							id="details-section__title"
							className="details-section__title__original"
						>
							{this.props.state === undefined ? (
								<div>{detailsNoState}</div>
							) : (
								<div>{detailsState}</div>
							)}
						</div>
						)
						{this.state.forecast === "current" && (
							<div
								id="details-section__content"
								className="details-section__content__original"
							>
								<div className="details-section__content_1">{icon}</div>
								<div className="details-section__content_2">
									<div className="details-section__content_2_forecast">
										{this.props.forecast}
									</div>
									<br />
									<div
										className="details-section__content_2_temp"
										onClick={this.handleUnits}
									>
										{this.state.imperial ? (
											<div>{this.props.temp}&#176;F</div>
										) : (
											<div>{tempCel}&#176;C</div>
										)}
									</div>
								</div>
							</div>
						)}
						{this.state.forecast === "five-day" && (
							<Carousel showThumbs={false}>{hourlyForecast}</Carousel>
						)}
						{this.state.forecast === "current" && (
							<div className="details-section__drawer">
								<div>
									{this.state.drawerVisible ? (
										<div>
											<BiUpArrow size="30px" onClick={this.handleDrawer} />
											<div
												id="details-section__drawer__content"
												className="details-section__drawer__content__original"
											>
												<div className="details-section__drawer__content__high">
													High:
													<br />
													{this.state.imperial ? (
														<div>{this.props.max_temp}&#176;F</div>
													) : (
														<div>{max_tempCel}&#176;C</div>
													)}
												</div>
												<div className="details-section__drawer__content__low">
													Low:
													<br />
													{this.state.imperial ? (
														<div>{this.props.min_temp}&#176;F</div>
													) : (
														<div>{min_tempCel}&#176;C</div>
													)}
												</div>
												<div className="details-section__drawer__content__feels">
													Feels Like:
													<br />
													{this.state.imperial ? (
														<div>{this.props.feels_like}&#176;F</div>
													) : (
														<div>{feels_likeCel}&#176;C</div>
													)}
												</div>
												<div className="details-section__drawer__content__humid">
													Humidity:
													<br />
													{this.props.humidity}%
												</div>
												<div className="details-section__drawer__content__sunrise">
													Sunrise:
													<br />
													{this.props.sunrise}
												</div>
												<div className="details-section__drawer__content__sunset">
													Sunset:
													<br />
													{this.props.sunset}
												</div>
											</div>
										</div>
									) : (
										<BiDownArrow size="30px" onClick={this.handleDrawer} />
									)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Details;
