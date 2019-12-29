import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import VideoSelector from './VideoSelector';



class Current extends React.Component {

    state = {
        apiKey: 'b0aa8c11a2cbe1989f85e8149167e9a1',
        lat: 0,
        lon: 0,
        time: '',
        code: 0,
        msg: ''
        }

    componentDidMount()   {
        window.navigator.geolocation.getCurrentPosition(res => {
            this.setState({lat: String(res.coords.latitude)}); 
            this.setState({lon: String(res.coords.longitude)});
            this.getWeather(this.state.lat, this.state.lon, this.state.apiKey);
        });
        this.DayOrNight();
    };
        
    getWeather = async(lat, lon, apiKey) => {

        const response = await axios(`
            http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);

        this.setState({msg: `${response.data.weather[0].description} in
            ${response.data.name}. It's currently ${Math.ceil(response.data.main.temp)} degrees,
            feels like ${Math.ceil(response.data.main.feels_like)}`});

        this.setState({code: parseInt(response.data.weather[0].id)});

        console.log(response);
    };

    DayOrNight() {
        const hours = new Date().getHours();
        console.log(hours);
        if (hours >= 6 && hours <= 17) {
            this.setState({time: 'day'});
        } else {
            this.setState({time: 'night'});
        }
    };

    renderText(){
        return (
            <div>
               <div>{this.state.msg}</div>
               <div>{this.state.time}</div>
               <div>{this.state.code}</div>
           </div>
        );
    }

    render() {
                
       return (
        <div>
            <p class="weather__text">
                {this.renderText()}
            </p>
            <VideoSelector time={this.state.time} code={this.state.code} />
        </div>   
        
       );
        
    }
}


export default Current;
// ReactDOM.render(
//     <Current />, document.querySelector('.weather')
// );




   