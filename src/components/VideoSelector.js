import React from 'react';
import '../css/style.css';
import ClearDay from '../videos/ClearDay.mp4';
import RainyDay from '../videos/RainyDay-s.mp4';
import SnowyDay from '../videos/SnowyDay-s.mp4';
import ClearNight from '../videos/ClearNight.mp4';
import RainyNight from '../videos/RainyNight-s.mp4';
import SnowyNight from '../videos/SnowyNight.mp4';


const VideoSelector = (props) => {

    
        if (props.time === 'day') {
            if (props.code >= 200 && props.code <= 532) {
                return (
                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={RainyDay} type="video/mp4" />     
                        </video>
                    </div>    
                );
            } else if (props.code >= 600 && props.code <= 785) {
                return (

                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={SnowyDay} type="video/mp4" />     
                        </video>
                    </div>

                );
            } else {
                return (

                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={ClearDay} type="video/mp4" />     
                        </video>
                    </div>
                );
            }
    
        } else { 
            if (props.code >= 200 && props.code <= 532) {
                return (

                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={RainyNight} type="video/mp4" />     
                        </video>
                    </div>
                );

            } else if (props.code >= 600 && props.code <= 785) {
                return (

                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={SnowyNight} type="video/mp4" />     
                        </video>
                    </div>
                );

            } else {
                return (

                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={ClearNight} type="video/mp4" />     
                        </video>
                    </div>
                );
            }
    
        }
   

};



export default VideoSelector;
