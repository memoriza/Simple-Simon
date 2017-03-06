$(document).ready(function () {

// global variables
			
var simrandomnumber;
var simonsequence = [];
var i = 0;

// audio variables
var audioone = document.createElement("AUDIO");
var audiotwo = document.createElement("AUDIO");


// background fade in

function backgroundFade () {

	var bgimage = new Image();

		bgimage.src="../img/sun.jpg"

			$(bgimage).load(function(){

				$("body").css("background-image","url("+$(this).attr("src")+")").fadeIn(2000);

			});

};

// audio functionality

function audioPlay () {

	audioone.canPlayType("audio/mpeg");

	audioone.setAttribute("src","/audio/simonhightrim.mp3");

	audioone.loop = true|false;

	audioone.play().loop;

};

function losingAudio () {

	audiotwo.canPlayType("audio/mpeg");

	audiotwo.setAttribute("src","/audio/simonend.mp3");

	audiotwo.loop = true|false;

	audiotwo.loop;

	audiotwo.play().loop;

};

// game start function 

$(".start").click(function() {

	audiotwo.pause();

	backgroundFade();

	audioPlay();

	$(".start").fadeOut(200,getRandomIntInclusive());	

	$(".end").fadeOut(300);

	$(".end").addClass("hidden");

});

// random number generator that adds to array when called

function getRandomIntInclusive() {

	var min = 1;

	var max = 4;

  	simrandomnumber = Math.floor(Math.random() * (max - min + 1)) + min;

  	simonsequence.push(simrandomnumber);

  	console.log(simonsequence);

	animateSimon();

};

			
// animating simon sequence

function animateSimon () {

	var i = 0;

	var interval = setInterval(function() {

		if(i >= simonsequence.length) {
			clearInterval(interval);
		};

		lightingUp(simonsequence[i]);

		i++;

	}, 400);

};

// function switch statement calls to light up each square
function buttonFlash(color) {

	color.addClass("up");

	setTimeout(function () {

		color.removeClass("up");

	}, 300); 
				
};

// function that checks simon sequence and determines which button to light up
function lightingUp(element) {

	switch(element) {

		case 1:
			buttonFlash($(".red"));
		break;

		case 2:
			buttonFlash($(".blue"));
		break;
					
		case 3:
			buttonFlash($(".green"));
		break;

		case 4:
			buttonFlash($(".yellow"));
		break;

	};

};
			 
// function for animation for user click 

function squareClick () {

	$(".square").mousedown(function() {

		$(this).addClass("down");
				
		$(this).mouseup(function() {

			$(this).removeClass("down");

		});

		console.log($(this).attr("data"));

// game logic based on user input being the same as the simon array

		if ($(this).attr("data") == simonsequence[i]) {

			if (simonsequence.length - 1 == i) {

				getRandomIntInclusive();

				i = 0; 

			} else {

				i++;

			};

		} else {

			simonsequence = [];

			i = 0;

			$(".end").removeClass("hidden").fadeIn(500);
					
				function newRound() {

					$(".start").fadeIn(300);

					$(".square").removeClass("down");

					audioone.pause();

					losingAudio(); 

				};

		newRound();

		};
				
	});

};

squareClick();

});


