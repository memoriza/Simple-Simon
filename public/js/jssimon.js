$(document).ready(function () {

"use strict";

// global variables
			
var simrandomnumber;
var simonsequence = [];
var i = 0;
var roundcounter = 0;

// audio variables
var audioone = document.createElement("AUDIO");
var audiotwo = document.createElement("AUDIO");
var audiothree = document.createElement("AUDIO");
var audiofour = document.createElement("AUDIO");
var audiofive = document.createElement("AUDIO");
var audiosix = document.createElement("AUDIO");
var audioseven = document.createElement("AUDIO");



// background fade in

function backgroundFade () {

	var bgimage = new Image();

	bgimage.src = "../img/sun.jpg";

	$(bgimage).load(function(){

		$("body").css("background-image","url("+$(this).attr("src")+")").fadeIn(7000);

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

function redAudio () {

	audiothree.canPlayType("audio/mpeg");

	audiothree.setAttribute("src","/audio/red.mp3");

	audiothree.play();

};

function blueAudio () {

	audiofour.canPlayType("audio/mpeg");

	audiofour.setAttribute("src","/audio/blue.mp3");

	audiofour.play();

};

function greenAudio () {

	audiofive.canPlayType("audio/mpeg");

	audiofive.setAttribute("src","/audio/green.mp3");

	audiofive.play();

};

function yellowAudio () {

	audiosix.canPlayType("audio/mpeg");

	audiosix.setAttribute("src","/audio/yellow.mp3");

	audiosix.play();

};

function userAudio () {

	audioseven.canPlayType("audio/mpeg");

	audioseven.setAttribute("src","/audio/userclick.mp3");

	audioseven.play();

};

// function for determining which round of Simon the user is on

function simonRound () {

	$("div.roundcounter").html("<p>" + "Round: " + (roundcounter += 1) + "</p");

	$("div.roundcounter").hide().fadeIn(100);

}

// game start function 

function gameStart () {

	$(".start").click(function() {

		audiotwo.pause();

		backgroundFade();

		audioPlay();

		$(".start").fadeOut(200,getRandomIntInclusive());	

		$(".end").addClass("hidden");

		$(".end").fadeOut(300);

		$("div.roundcounter").fadeIn(100);

		roundcounter = 0;

		simonRound();

	});
	
};

gameStart();

// game over function

function gameOver() {

	$(".start").fadeIn(300);

	$(".square").removeClass("down");

	audioone.pause();

	losingAudio(); 

	$(".display").addClass("hidden").fadeOut(300);

	roundcounter = 1;

};

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
			redAudio();
			buttonFlash($(".red"));
		break;

		case 2:
			blueAudio();
			buttonFlash($(".blue"));
		break;
					
		case 3:
			greenAudio();
			buttonFlash($(".green"));
		break;

		case 4:
			yellowAudio();
			buttonFlash($(".yellow"));
		break;

	};

};


			 
// function for animation for user click 

function userClick () {

	$(".square").mousedown(function() {

		$(this).addClass("down");

		userAudio();
				
		$(this).mouseup(function() {

		$(this).removeClass("down");

		});

		console.log($(this).attr("data"));

// game logic based on user input being the same as the simon array

		if ($(this).attr("data") == simonsequence[i]) {

			if (simonsequence.length - 1 == i) {

				getRandomIntInclusive();

				i = 0; 

				simonRound();

			} else {

				i++;

			};

		} else {

			simonsequence = [];

			i = 0;

			$("div.roundcounter").fadeOut(50);

			$(".end").removeClass("hidden").fadeIn(500);
					
			gameOver();

		};
				
	});

};

userClick();

});


