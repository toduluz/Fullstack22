import { useState, useEffect } from "react";
import CountryShow from "./CountryShow";
import axios from "axios";

const CountryShowSingle = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log('effect insde')
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[0]}&units=metric&appid=${api_key}`)
            .then(response => {
            console.log('promise fulfilled inside')
            setWeather(response.data)
      })
    }, [])

    const [weather, setWeather] = useState({
        "main": {"temp": "fetching data"},
        "weather": [{"icon": "01d"}],
        "wind": {"speed": "fetching data"}
    })

        return (
            <div>
                <CountryShow country={country} />
                <h3>Weather in {country.capital}</h3>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt ="" />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )

}

export default CountryShowSingle