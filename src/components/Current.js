import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import VideoSelector from './VideoSelector';
// import  trackPromise from 'react-promise-tracker';

import Loader from './Loader';
// import ClearLoader from './Loader';



class Current extends React.Component {

    state = {
        apiKey: 'b0aa8c11a2cbe1989f85e8149167e9a1',
        lat: 0,
        lon: 0,
        code: null,
        msg1: '',
        msg2: '',
        iconUrl: '',
        loading: true
        };
    
    componentDidMount()   {

       
    //    trackPromise(
        window.navigator.geolocation.getCurrentPosition(
            geoLocation => {
                const coords = {
                    latitude: geoLocation.coords.latitude,
                    longitude: geoLocation.coords.longitude
                };
               this.getWeather(coords, this.state.apiKey);
            },
            error => {
                const coords = {
                    latitude: 43.6548,
                    longitude: -79.3883
                }
                this.getWeather(coords, this.state.apiKey);
            }
        );
    //    );
                
    };
        
    getWeather = async(coords, apiKey) => {
       
       try {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?` +
                    `lat=${coords.latitude}&` +
                    `lon=${coords.longitude}&` +
                    `units=metric&` +
                    `appid=${apiKey}`
            );

            console.log('Received weather API response');
            console.log(response);

            this.setState({
                code: response.data.weather[0].id,
                msg1: `${this.capitalizeFirstLetter(response.data.weather[0].description)} in ${response.data.name}.`,
                msg2: `It's currently ${Math.ceil(response.data.main.temp)} degrees,
                    feels like ${Math.ceil(response.data.main.feels_like)}`,
                iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                loading: false 
            });
       
      } catch (err) {            
            alert(err);     
       }
        
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    componentDidUpdate()  {
        console.log(`Current update with code=${this.state.code}`);
        
    }; 

    render() { 
        if (this.state.loading) {
        return (
            <div className="spinner">
                <Loader />
            </div>
            );
        } else {
            return (
                <div className="weather">
                    <p className="weather__text" id="weather__text">
                        {this.state.msg1}<br />{this.state.msg2}
                        <img src={this.state.iconUrl} alt="Icon" />
                    </p>
                    <VideoSelector code={this.state.code} />
                </div>

            );
        }
    }                      
}

export default Current;






