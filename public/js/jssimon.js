$(document).ready(function () {

"use strict";
			
var simrandomnumber;
var simonsequence = [];
var i = 0;
var roundcounter = 0;

var backgroundm = document.createElement("AUDIO");
var losingm = document.createElement("AUDIO");
var	redm = document.createElement("AUDIO");
var bluem = document.createElement("AUDIO");
var greenm = document.createElement("AUDIO");
var yellowm = document.createElement("AUDIO");
var userm = document.createElement("AUDIO");
var roundm = document.createElement("AUDIO");

function backgroundFade () {

	var bgimage = new Image();

	bgimage.src = "../img/sun.jpg";

	$(bgimage).load(function(){

		$("body").css("background-image","url("+$(this).attr("src")+")");

	});

};

function audioPlay () {

	backgroundm.canPlayType("audio/mpeg");

	backgroundm.setAttribute("src","/audio/simonsoft.mp3");

	backgroundm.loop = true|false;

	backgroundm.play().loop;

};

function losingAudio () {

	losingm.canPlayType("audio/mpeg");

	losingm.setAttribute("src","/audio/simonend.mp3");

	losingm.loop = true|false;

	losingm.loop;

	losingm.play().loop;

};

function redAudio () {

	redm.canPlayType("audio/mpeg");

	redm.setAttribute("src","/audio/red.mp3");

	redm.play();

};

function blueAudio () {

	bluem.canPlayType("audio/mpeg");

	bluem.setAttribute("src","/audio/blue.mp3");

	bluem.play();

};

function greenAudio () {

	greenm.canPlayType("audio/mpeg");

	greenm.setAttribute("src","/audio/green.mp3");

	greenm.play();

};

function yellowAudio () {

	yellowm.canPlayType("audio/mpeg");

	yellowm.setAttribute("src","/audio/yellow.mp3");

	yellowm.play();

};

function userAudio () {

	userm.canPlayType("audio/mpeg");

	userm.setAttribute("src","/audio/userclick.mp3");

	userm.play();

};

function roundAudio () {

	roundm.canPlayType("audio/mpeg");

	roundm.setAttribute("src", "/audio/newround.mp3")

	roundm.play();

};

function gameStart () {

	$(".start").click(function() {

		losingm.pause();

		backgroundFade();

		audioPlay();

		$(".start").fadeOut(200,getRandomIntInclusive());	

		$(".end").addClass("hidden");

		$(".end").fadeOut(300);

		$("div.roundcounter").fadeIn(200);

		roundcounter = 0;

		simonRound();

	});
	
};

gameStart();

function simonRound () {

	$("div.roundcounter").hide().fadeIn(200);

	$("div.roundcounter").html("<p>" + "Round: " + (roundcounter += 1) + "</p");

	if (roundcounter >= 10) {

		$(".gameboard").css("background-image", "url('../img/wavesofjoy.gif')");
			
	} else {

		roundAudio();

		$(".gameboard").css("background-image","url('')");

	};

};

function gameOver() {

	$(".start").fadeIn(300);

	$(".square").removeClass("down");

	backgroundm.pause();

	losingAudio(); 

	$(".display").addClass("hidden").fadeOut(300);



};

function getRandomIntInclusive() {

	var min = 1;

	var max = 4;

  	simrandomnumber = Math.floor(Math.random() * (max - min + 1)) + min;

  	simonsequence.push(simrandomnumber);

	animateSimon();

};

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

function buttonFlash(color) {

	color.addClass("up");

	setTimeout(function () {

		color.removeClass("up");

	}, 300); 
				
};

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

function userClick () {

	$(".square").mousedown(function() {

		$(this).addClass("down");

		userAudio();
				
		$(this).mouseup(function() {

		$(this).removeClass("down");

		});



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


