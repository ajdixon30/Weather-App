import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

const setWeather = createAction('SET_WEATHER', (weatherData) => {
    var shift = weatherData.timezone + 18000;
    return {
        payload: {
			temp: Math.round(weatherData.main.temp * 1.8 - 459.67),
			temp_max: Math.round(weatherData.main.temp_max * 1.8 - 459.67),
			temp_min: Math.round(weatherData.main.temp_min * 1.8 - 459.67),
			country: weatherData.sys.country,
			city: weatherData.name,
			feels_like: Math.round(weatherData.main.feels_like * 1.8 - 459.67),
			forecast: weatherData.weather[0].description,
			sunrise: moment
				.unix(weatherData.sys.sunrise)
				.add(shift, "seconds")
				.format("h:mm A"),
			sunset: moment
				.unix(weatherData.sys.sunset)
				.add(shift, "seconds")
				.format("h:mm A"),
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
			list: weatherData.list,
        }
    }
})

export const findForecast = (cityZip, country) => {
    return (dispatch) => {
        let details;
        if (isNaN(cityZip)) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityZip},${country}&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
                details = response.data;
            })
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityZip},${country}&cnt=20&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
                console.log(response.data.list)
                details = { ...details, list: [...response.data.list] }
                console.log(details)
                dispatch(setWeather(details));
            })
        } else {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${parseInt(cityZip)},${country}&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
                details = response.data;
            })
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${parseInt(cityZip)},${country}&cnt=20&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
                console.log(response.data.list)
                details = { ...details, list: [...response.data.list] }
                console.log(details)
                dispatch(setWeather(details));
            })
        }
    }
}

export { setWeather }