import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import Current from "./components/Current";

// import SimpleMenu from './components/Language';
// import Loader from './components/Loader';
// import  usePromiseTracker  from 'react-promise-tracker';



/* --- Language menu ---
ReactDOM.render(
	<SimpleMenu />,
	document.querySelector('.header__menu-lang')
);
*/

// ReactDOM.render(
// 	<div>
// 		<Loader />
// 		<Current />
// 	</div>,
// 	document.getElementById('weather')
// 	);


// Get the modal
var modal = document.getElementById("weather-modal");

// Get the button that opens the modal
var btn = document.getElementById("weather-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  ReactDOM.render(
    <Current />,
    document.getElementById('weather')
  );
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}