import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Accordion, Carousel } from "react-bootstrap";
import { WiCloud, WiCloudy, WiDayCloudy, WiDayRain, WiDaySunny, WiNightCloudy, WiRain, WiSnowWind, WiThunderstorm } from "react-icons/wi";
import { useSelector } from "react-redux";


const DetailsNew = () => {
    const [current, setCurrent] = useState(true);
    const [imperial, setImperial] = useState(true);
    const [icon, setIcon] = useState("");
    let appState = useSelector(state => state.weather);
    useEffect(() => {
        if (appState.forecast) {
            if (appState.forecast.includes("clear")) setIcon(<WiDaySunny color="#198754" size="200px"/>);
            if (appState.forecast === "few clouds") setIcon(<WiCloud color="#198754" size="200px"/>);
            if (appState.forecast === "scattered clouds") setIcon(<WiCloudy color="#198754" size="200px"/>);
            if (appState.forecast === "broken clouds" || appState.forecast === "overcast clouds") setIcon(<WiDayCloudy color="#198754" size="200px"/>);
            if (appState.forecast.includes("rain")) setIcon(<WiDayRain color="#198754" size="200px"/>);
            if (appState.forecast === "thunderstorm") setIcon(<WiSnowWind color="#198754" size="200px"/>);
            if (appState.forecast.includes("snow")) setIcon(<WiThunderstorm color="#198754" size="200px"/>);
        }
    }, [appState.forecast])
    return (
        <div className="container-fluid col-md-8 col-lg-6">
            {!appState.city ?
                <div className="card">
                    <div className="card-body bg-success bg-opacity-25">
                        <p className="h4 text-center text-success py-3">No Location Selected</p>
                    </div>
                </div> :
                <div className="card">
                    {current ? 
                        <div className="card-header">
                            <div className="row justify-content-center">
                                <div className="d-grid col-6">
                                    <button className="btn btn-success-subtle border-3 border-success fw-bold fs-5">Current</button>
                                </div>
                                <div className="d-grid col-6">
                                    <button className="btn btn-success fw-bold fs-5" onClick={() => setCurrent(false)}>5 Day</button>
                                </div>
                            </div>
                        </div> :
                        <div className="card-header">
                            <div className="row justify-content-center">
                                <div className="d-grid col-6">
                                    <button className="btn btn-success fw-bold fs-5" onClick={() => setCurrent(true)}>Current</button>
                                </div>
                                <div className="d-grid col-6">
                                    <button className="btn btn-success-subtle border-3 border-success fw-bold fs-5">5 Day</button>
                                </div>
                            </div>
                        </div>
                    }
                    {current ? 
                        <div>
                            <p className="card-title h4 text-light bg-success text-center py-2 mb-0">{appState.city} ({appState.country})</p>
                            <div className="card-body bg-success bg-opacity-25">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-6 text-center">
                                        {icon}
                                    </div>
                                    <div className="col-6 text-center">
                                        <p className="h2 text-success">{appState.forecast.toUpperCase()}</p>
                                        {imperial ? 
                                            <p className="h2 text-success" style={{ cursor: "pointer" }} onClick={() => setImperial(!imperial)}>{appState.temp}&deg;F</p> : 
                                            <p className="h2 text-success" style={{ cursor: "pointer" }} onClick={() => setImperial(!imperial)}>{Math.round((appState.temp - 32) / 1.8)}&deg;C</p>
                                        }
                                    </div>      
                                </div>
                                <Accordion className="text-center">
                                    <Accordion.Item style={{backgroundColor: "#198754", color: "white", fontWeight: "700"}}>
                                        <Accordion.Header>More Information</Accordion.Header>
                                        {imperial ? (
                                            <Accordion.Body bg="success" className="row">
                                                <p className="col-4">High:<br />{appState.temp_max}&deg;F</p>
                                                <p className="col-4">Low:<br />{appState.temp_min}&deg;F</p>
                                                <p className="col-4">Feels Like:<br />{appState.feels_like}&deg;F</p>
                                            </Accordion.Body>
                                        ) : (
                                            <Accordion.Body bg="success" className="row">
                                                <p className="col-4">High:<br />{Math.round((appState.temp_max - 32) / 1.8)}&deg;C</p>
                                                <p className="col-4">Low:<br />{Math.round((appState.temp_min - 32) / 1.8)}&deg;C</p>
                                                <p className="col-4">Feels Like:<br />{Math.round((appState.feels_like - 32) / 1.8)}&deg;C</p>
                                            </Accordion.Body>   
                                        )}
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div> :
                        <div>
                            <p className="card-title h4 text-light bg-success text-center py-2 mb-0">{appState.city} ({appState.country})</p>
                            <Carousel>
                            {appState.list.map((item, index) => {
                                var weatherIcon;
                                if (item.weather[0].description.includes("clear")) weatherIcon = <WiDaySunny color="#198754" size="200px"/>;
                                if (item.weather[0].description === "few clouds") weatherIcon = <WiCloud color="#198754" size="200px"/>;
                                if (item.weather[0].description === "scattered clouds") weatherIcon = <WiCloudy color="#198754" size="200px"/>;
                                if (item.weather[0].description === "broken clouds") weatherIcon = <WiDayCloudy color="#198754" size="200px" />;
                                if (item.weather[0].description === "overcast clouds") weatherIcon = <WiNightCloudy color="#198754" size="200px" />;
                                if (item.weather[0].description.includes("rain")) weatherIcon = <WiRain color="#198754" size="200px"/>;
                                if (item.weather[0].description === "thunderstorm") weatherIcon = <WiThunderstorm color="#198754" size="200px"/>;
                                if (item.weather[0].description.includes("snow")) weatherIcon = <WiSnowWind color="#198754" size="200px"/>;
                                var date = moment(item["dt_txt"]).format("MMM D, YYYY h A");
                                return (
                                    <Carousel.Item key={index} style={{ backgroundColor: "#C5E1D4" }}>
                                        <p className="h4 text-center mt-2 py-2" style={{color: "#198754"}}>{date} </p>
                                        <p className="text-center">{weatherIcon}</p>
                                        <p className="h4 text-center" style={{ color: "#198754" }}>
                                            {item.weather[0].description.toUpperCase()}<br />
                                        </p>
                                        {imperial ?
                                            (<p className="h4 text-center pb-5" style={{ cursor: "pointer", color: "#198754" }} onClick={() => setImperial(!imperial)}>
                                            {Math.round(item.main.temp * 1.8 - 459.67)}&deg;F
                                            </p>) : (<p className="h4 text-center pb-5" style={{cursor: "pointer", color: "#198754"}} onClick={()=>setImperial(!imperial)}>
                                            {Math.round(item.main.temp - 272.15)}&deg;C
                                        </p>)}
                                    </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default DetailsNew