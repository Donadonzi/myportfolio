import React from 'react';
// import '../css/style.css';
import ClearDay from '../videos/ClearDay.mp4';
import RainyDay from '../videos/Rain-s.mp4';
import SnowyDay from '../videos/SnowyDay-s.mp4';
import GreySky from '../videos/GreySky.mp4';
import ClearNight from '../videos/ClearNight.mp4';
import RainyNight from '../videos/RainyNight-s.mp4';
import SnowyNight from '../videos/SnowyNight.mp4';

const DayOrNight= () => {
    const hours = new Date().getHours();
    let time = '';
    hours >= 6 && hours <= 17 ? time = 'day' : time = 'night';
    return time;

};

const VideoSelector = (props) => {
    
    console.log(`VideoSelector update with code=${props.code}`);
    const time = DayOrNight();

    let videoUrl = null;

    if (time === 'day') {
        if (props.code >= 200 && props.code <= 532) {
            videoUrl = RainyDay;
        } else if (props.code >= 600 && props.code <= 785) {
            videoUrl = SnowyDay;
        } else if (props.code === 803 || props.code === 804) {
            videoUrl = GreySky;
        }else {
            videoUrl = ClearDay;
        }
        
    } else if (time === 'night') { 
        if (props.code >= 200 && props.code <= 532) {
            videoUrl = RainyNight;
        } else if (props.code >= 600 && props.code <= 785) {
            videoUrl = SnowyNight;
        } else {
            videoUrl = ClearNight;
        }
    }

    return (
        <div className="bg-video">
            <video key={videoUrl} className="bg-video__content" autoPlay muted loop>
                <source src={videoUrl} type="video/mp4" />     
            </video>
        </div>
    );
};



export default VideoSelector;
