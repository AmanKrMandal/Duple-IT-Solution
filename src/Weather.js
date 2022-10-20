import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function Weather() {
    const [city, setCity] = useState("Bhopal");
    const [users, setUsers] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const test = async (city) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=13a6a9e8cfd56b9c9012a88b1d29951b`
            );
            const result = await response.json();
            setUsers(result);
            if (result.message === "undefined") {
                setUsers(result);
                setLoading(false);
            } else {
                setMessage(result.message);
                setLoading(true);
            }
            console.log("message", result.message);
            console.log("r", result.weather[0].main);
        } catch (error) {
            console.log("my error is " + error);
        }
    };
    const inputHandle = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setCity(value);
    };
    console.log(city);

    useEffect(() => {
        test(city);
    }, [city]);

    var directions = [
        "North",
        "North-East",
        "East",
        "South-East",
        "South",
        "South-West",
        "West",
        "North-West",
    ];

    function getDirection(heading) {
        var index = Math.round(heading / 8 / 5, 625);
        return directions[index];
    }


    const time = (dt) => {
        var unixTimestamp = users.dt;
        var date = new Date(unixTimestamp * 1000);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const date = (dt) => {
        var unixTimestamp = dt;
        var date = new Date(unixTimestamp * 1000);
        return date.toLocaleDateString("en-GB");
    };

    const dayFormate = (dt) => {
        var unixTimestamp = dt;
        var date = new Date(unixTimestamp * 1000);
        return String(date).split(" ")[0];
    };

    console.log(message);
    return (
        <div style={{ marginTop: "200px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <input
                            className="form-control mb-5"
                            type="text"
                            onChange={inputHandle}
                            placeholder="Enter City"
                        />
                        <div className="card p-2 text-white backgroundColor">
                            <div className="row p-4">
                                <div className="col-sm-4">
                                    <p>
                                        {dayFormate(users.dt)}. {date(users.dt)}
                                    </p>
                                    <p className="display-4">{time(users.dt)}</p>
                                </div>
                                <div className="col-sm-8">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="d-flex">
                                                <div>
                                                    <p
                                                        className="display-1"
                                                        style={{ marginLeft: "50px" }}
                                                    >
                                                        {(users.main?.temp - 273.15).toFixed(0)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>&#176;C</p>
                                                </div>
                                            </div>
                                            <p className="text-center" style={{ marginTop: "-25px" }}>
                                                {" "}
                                                Max: {(users.main?.temp_max - 273.15).toFixed(0)}{" "}
                                                &#176;C Min:{" "}
                                                {(users.main?.temp_min - 273.15).toFixed(0)} &#176;C{" "}
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <img
                                                src={`https://openweathermap.org/img/wn/${users?.weather?.[0].icon}.png`}
                                                alt="Loading"
                                                className="rounded mx-auto d-block"
                                            />
                                            <p className="text-center">
                                                {" "}
                                                <i>{users?.weather?.[0].description}</i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                className="text-center"
                                style={{ marginTop: "-30px", fontSize: "20px" }}
                            >
                                {getDirection(users.wind?.deg)}
                                <span> {users.wind?.speed} mi/h</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;