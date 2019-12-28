import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import axios from 'axios';


/*
window.navigator.geolocation.getCurrentPosition(res => {

        var lat = String(res.coords.latitude);
        var lon = String(res.coords.longitude);
        getCity(lat, lon);
              
 });
    
const getCity = async(lat, lon) => {
        const result = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${lat},${lon}`, {
        params: {
            apikey: 'FQEr45Ckin3o1o2XrqeFi9oN3NGeAY0x',
        }
    });
    
    const locationKey = result.data.ParentCity.Key;
    getWeather(locationKey);
    console.log(locationKey);
    console.log(result);
    
    // return result.data.ParentCity.LocalizedName;
};

const getWeather = async(key) => {
    const response = await axios.get(`
    http://dataservice.accuweather.com/currentconditions/v1/${key}`
    , {
        params: {
            apikey: 'FQEr45Ckin3o1o2XrqeFi9oN3NGeAY0x'
        }
    });

    console.log(response);
    console.log(`It's currently ${response.data[0].WeatherText}`);
};

*/
var apiKey = 'b0aa8c11a2cbe1989f85e8149167e9a1';

window.navigator.geolocation.getCurrentPosition(res => {
    const lat = String(res.coords.latitude);
    const lon = String(res.coords.longitude);
    getWeather(lat, lon, apiKey);   
          
});

const getWeather = async(lat, lon, apiKey) => {
    const response = await axios(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
   
    console.log(response);
    console.log(` ${response.data.weather[0].description} in ${response.data.name}. 
    It's currently ${response.data.main.temp} degrees`);
};
