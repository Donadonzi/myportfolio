import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import axios from 'axios';



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
    // console.log(`It's currently ${response.data[0].WeatherText}`);
};

 


