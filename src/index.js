import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import Current from './components/Current';
// import Loader from './components/Loader';
// import  usePromiseTracker  from 'react-promise-tracker';




ReactDOM.render(
	<Current />,
	document.getElementById('weather')
);



// ReactDOM.render(
// 	<div>
// 		<Loader />
// 		<Current />	
// 	</div>,
// 	document.getElementById('weather')
// 	);
	
	


// =============== JQUERY CODE FOR THUMBNAILS =================//
(function($){ 
		
	// Main code
	$(document).ready(function(){
	
		// Initialize the object on dom load
		var navigator = new Navigator({
			carousel: '#carousel',
			nextButton: '.arrow.next',
			prevButton: '.arrow.prev',
			shuffle: false
			// chunckSize: 3
		});
		
		navigator.init();		
		
	});
	
	
	// A Navigator "class" responsible for navigating through the carousel.
	function Navigator(config) {

		this.carousel = $(config.carousel); //the carousel element
		this.nextButton = $(config.nextButton); //the next button element
		this.prevButton = $(config.prevButton); //the previous button element
		// this.chunkSize = $(config.chunkSize); //how many items to show at a time (maximum)
		this.chunckSize = config.chunkSize || 3;
		this.shuffle = config.shuffle || false; //should the list be shuffled first? Default is false.
		
		//private variables
		this._items = $(config.carousel + ' li'); //all the items in the carousel
		this._texts = $(config.carousel + ' p');
		this._chunks = []; //the li elements will be split into chunks. 
		this._textChunk = [];
		this._visibleChunkIndex = 0; //identifies the index from the this._chunks array that is currently being shown
		

		this.init = function () {
			// var mq = window.matchMedia( "(max-width: 600px)" );
			// if (mq.matches) {
			// 	this.chunckSize = 1;
			// } else {
			// 	this.chunckSize = 3;
			// }

			// if (window.matchMedia('(max-width: 600px)').matches) {
			// 	this.chunckSize = 1;
			// }

			//Shuffle the array if neccessary
			if (this.shuffle) {
				//remove visible tags
				this._items.removeClass('visible');
				
				
				//shuffle list
				this._items.sort(function() { return 0.5 - Math.random() });
				
				//add visible class to first "chunkSize" items
				this._items.slice(0, this.chunkSize).addClass('visible');
			}
			
			//split array of items into chunks
			this._chunks = this._splitItems(this._items, this.chunkSize);
			this._textChunk = this._splitItems(this._texts, this.chunkSize);
			

			var self = this;
			
			//Set up the event handlers for previous and next button click
			self.nextButton.on('click', function(e) {
				self.handleNextClick(e);
			}).show();
			
			self.prevButton.on('click', function(e) {
				self.handlePrevClick(e);
			});
			
			// Showing the carousel on load
			self.carousel.addClass('active');
		}
		
		//handle all code when previous button is clicked
	  this.handlePrevClick = function (e) {
			
			e.preventDefault();
	
			//as long as there are some items before the current visible ones, show the previous ones
			if (this._chunks[this._visibleChunkIndex - 1] !== undefined) {
				this.showPrevItems();
			}

			if (this._textChunk[this._visibleChunkIndex - 1] !== undefined) {
				this.showPrevItems();
			}

			
		};
		
		//handle all code when next button is clicked
		this.handleNextClick = function(e) {
			
			e.preventDefault();
			
			//as long as there are some items after the current visible ones, show the next ones
			if (this._textChunk[this._visibleChunkIndex + 1] !== undefined) {
				this.showNextItems();
			}
		};
		
		//show the next 3 items
		this.showNextItems = function() {
			
			//remove visible class from current visible chunk
			$(this._chunks[this._visibleChunkIndex]).removeClass('visible');
			$(this._textChunk[this._visibleChunkIndex]).removeClass('visible');
			
			//add visible class to the next chunk
			$(this._chunks[this._visibleChunkIndex + 1]).addClass('visible');
			$(this._textChunk[this._visibleChunkIndex + 1]).addClass('visible');
			
			//update the current visible chunk
			this._visibleChunkIndex++;
			
			//see if the end of the list has been reached.
			this._checkForEnd();
			
		};
		
		//show the previous 3 items
		this.showPrevItems = function() {
			
			//remove visible class from current visible chunk
			$(this._chunks[this._visibleChunkIndex]).removeClass('visible');
			$(this._textChunk[this._visibleChunkIndex]).removeClass('visible');
			
			//add visible class to the previous chunk
			$(this._chunks[this._visibleChunkIndex - 1]).addClass('visible');
			$(this._textChunk[this._visibleChunkIndex - 1]).addClass('visible');
			
			//update the current visible chunk
			this._visibleChunkIndex--;
			
			//see if the beginning of the carousel has been reached.
			this._checkForBeginning();
			
		};
		
		
		//Determine if the previous button should be shown or not.
		this._checkForBeginning = function() {
			this.nextButton.show(); //the prev button was clicked, so the next button can show.
			
			if (this._chunks[this._visibleChunkIndex - 1] === undefined) {
				this.prevButton.hide();
			}
			else {
				this.prevButton.show();
			}

			if (this._textChunk[this._visibleChunkIndex - 1] === undefined) {
				this.prevButton.hide();
			}
			else {
				this.prevButton.show();
			}
		};
		
		//Determine if the next button should be shown or not.
		this._checkForEnd = function() {
			this.prevButton.show(); //the next button was clicked, so the previous button can show.
			
			if (this._chunks[this._visibleChunkIndex + 1] === undefined) {
				this.nextButton.hide();
			}
			else {
				this.nextButton.show();
			}

			if (this._textChunk[this._visibleChunkIndex + 1] === undefined) {
				this.nextButton.hide();
			}
			else {
				this.nextButton.show();
			}
		};
		
		
		//This function takes an array "items" and splits it into subArrays each with a maximum length of "chunk".
		this._splitItems = function(items, chunk) {
			
			var splitItems = [],
			i = 0;
			
			while (items.length > 0) {
				splitItems[i] = items.splice(0, chunk);
				i++;
			}
			
			return splitItems;
		
		};

	}

// eslint-disable-next-line no-undef
})(jQuery);


// ============== CODE FOR CHANGING BACKGROUND ===============//


document.querySelector('.projects__list').addEventListener('mouseover', changeBG);

function changeBG(event) {
	const item = event.target.closest('.projects__list__item');
	
	if(item) {
		const className = item.dataset.num;
		item.parentNode.parentNode.classList.add(`${className}`);
		document.querySelector('.projects__gallery__helper').style.opacity = 1;
		document.querySelectorAll('.projects__list__item').forEach(el => el.classList.add('shrink'));
		document.getElementById(`${className}`).classList.add('focused');
		
	}		
}

const list = document.querySelectorAll('.projects__list__item');
list.forEach( el => el.addEventListener('mouseleave', removeBG));

function removeBG(event) {
	document.querySelector('.projects__gallery__helper').style.opacity = 0;
	const className = event.target.dataset.num;
	event.target.parentNode.parentNode.classList.remove(`${className}`);
	document.getElementById(`${className}`).classList.remove('focused');
	document.querySelectorAll('.projects__list__item').forEach(el => el.classList.remove('shrink'));
		
}

  
    


 