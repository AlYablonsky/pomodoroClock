// Comments


$(document).ready(function(){
	
    var buzzer = $("#buzzer")[0];   // varianle for buzzer sound
	var count = parseInt($("#num").html());   // counter for session timer
	var breakTime = parseInt($("#breakNum").html());     // counter for break timer
	var rounds =   parseInt($("#numberOfIntervals").html());    // number of rounds or intervals (session + brake)
    var countSec, breakTimeSec, counter, startBreak, session, brake;  // other variables of time in seconds for both counters and names of timers respectively 
	var iCount = 1;
	const MIN_2_SEC = 60;
	
	// Canvas stuff - 1st canvas object for monitorinf session time progress
	var ctx = document.getElementById("pomoCanvas").getContext('2d');
	var al=0;
	var start = Math.PI*1.5;
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height; 
	var diff;
	
	// Canvas stuff - 2nd canvas object for monitorinf brake time progress
	var ctx1 = document.getElementById("pomoCanvas1").getContext('2d');
	var al1=0;
	var start1 = Math.PI*1.5;
	var cw1 = ctx1.canvas.width;
	var ch1 = ctx1.canvas.height; 
	var diff1;
	
	// End of canvas stuff
	
	// Modifying CSS width and height for the two canvas IDs from the values obtained from the JS object
	document.getElementById("pomoCanvas").style.width = 2*cw;
	document.getElementById("pomoCanvas1").style.width = 2*cw1;
	document.getElementById("pomoCanvas").style.height = 2*ch;
	document.getElementById("pomoCanvas1").style.height = 2*ch1;
	
	
	
  	$("#reset").hide();
	$("#pomoCanvas, #pomoCanvas1").hide();
	
	
	$("#start").click(function(){
	
		
		
		
		
		$("#reset").show();
		var delay = 0;
		
		// For loop making repeated calls to last (timer) and next (brakeTimer) functions
		// in addition to theconcurrently running canvas function last_time and next_time
		// These are the executed functions
		
	
		for (var roundCount = 0; roundCount < rounds; roundCount++){
			setTimeout(last, MIN_2_SEC * 1000 * delay);
			setTimeout(last_Time, MIN_2_SEC * 1000 * delay);
			delay+=count;
			setTimeout(next, MIN_2_SEC * 1000 * delay);
			setTimeout(next_Time, MIN_2_SEC * 1000 * delay);
			delay+=breakTime;
		}  
					
		function last(){  // Contains function timer() and the setup for the counter timer interval
			// hide buttons and variables that are displayed before timer is running
			$("#start, #minusClock, #addClock, #minusBreak, #addBreak, #breakNum, #title1, #title2").hide();
			$("#title3, #title4, #addIntervals, #minusIntervals, #numberOfIntervals").hide();
			$("#timeType1, #num").show();    // display buttons and variables relevant to session time display 
			$("#timeType1").html("Session Time: ");

			$("#reset").show();
			$("#timeType3").show();
			$("#timeType3").html("Interval # " + iCount + " out of " + rounds);

			countSec = MIN_2_SEC * count;
			counter = setInterval(timer,1000);  // 1000 = 1sec  makes calls to function timer()
			timer();
		}     // end of last
		
		
		
		function next(){    // Contains function breakTimer() and the setup for the startBreak timer interval
			$("#timeType2, #breakNum").show();   // display buttons and variables relevant to break time display 
			$("#timeType2").html("Break Time: ");	
					
			$("#reset").show();
			$("#timeType3").show();
			$("#timeType3").html("Interval # " + iCount + " out of " + rounds);

			breakTimeSec = MIN_2_SEC * breakTime;
			startBreak = setInterval(breakTimer, 1000);  // 1000 = 1sec  makes calls to function breakTimer()
			breakTimer();
		}   // end of next
		
		
		
		function timer(){   // This function sets the time for the session time
				
				if (countSec === 12){
					buzzer.play();     // Play buzzer 15 sec before
				}
				else if (countSec === 0){        // Actions that occur at 0 sec     
					clearInterval(counter);  // End time interval
					$("#timeType1, #num").hide();
					return;
				}
				if (countSec % 60 >= 10){    // Format time in min:sec
					
					$("#num").html(Math.floor(countSec / 60) + ":" + countSec % 60);
				}
				else {
					
					$("#num").html(Math.floor(countSec / 60) + ":0" + countSec % 60);
				}
				countSec--;
		}   // end of timer

		
		function breakTimer(){    // This function sets the time for the break time		
				
				if (breakTimeSec === 12) {
					buzzer.play();
				}
				else if(breakTimeSec === 0) {    
					clearInterval(startBreak);    // End breakTime interval
					$("#timeType2, #breakNum").hide();
					$("#timeType3").html("Interval # " + ++iCount + " out of " + rounds);
					
					if (iCount === rounds + 1 ){
						$("#timeType3").html("The End");
					}
					return;
				}
				if (breakTimeSec % 60 >= 10){
					$("#breakNum").html(Math.floor(breakTimeSec / 60) + ":" + breakTimeSec % 60);
				}
				else {
					$("#breakNum").html(Math.floor(breakTimeSec / 60) + ":0" + breakTimeSec % 60);
				}
				breakTimeSec--;
			}  // end of breaktimer
		
		
		
		
		// Canvas Functions, two canvas functions, one for the session and one for brake
		
		var intervalSize = 20;  // printing 50 times per second
		
		function progressSession(){
			
				diff = ((al / 100) * Math.PI*2*10);
				ctx.clearRect(0, 0, cw, ch);
				ctx.beginPath();
				ctx.arc(150 , 75, 64, 0, 2*Math.PI, false);  // trace border circle before the progress circle
				ctx.fillStyle = "#FFF";		// for color of circle
				ctx.fill();					// fill function
				ctx.strokeStyle = "#09F"; 	// for border color
				ctx.stroke();					// Stroke function
				ctx.fillStyle = "#000";       // For text color
				ctx.strokeStyle = "#ffcc33"; //For Stroke Color
				ctx.textAlign = 'center';  //for aligning text in center
				ctx.lineWidth = 10;  // fills progress circle 
				ctx.font="2em Arial";  //for font specifying
				ctx.beginPath(); // starting circle drawing function
				ctx.arc(150, 75, 64, start, diff/10+start, false);  // printing circle
				ctx.stroke();	
				ctx.fillText(Math.ceil(al).toFixed(0)  +'%', cw*.5, ch*.5+10, cw); 		
				if (al >=100) {       //  reach 100% 
					clearInterval(session);
					$("#pomoCanvas").hide();
					return;
				}	
				al+= 100/(MIN_2_SEC * count * intervalSize);  //  percentage calculation
		}
		
		
		function last_Time(){  // calls out functiom "progresSession" dislay progress of session time
			al=0;
			$("#pomoCanvas1").hide();
			$("#pomoCanvas").show();
			session = setInterval(progressSession, 1000 / intervalSize );
			progressSession();
		}
		
		function progressBrake() {
				diff1 = ((al1 / 100) * Math.PI*2*10);
				ctx1.clearRect(0, 0, cw1, ch1);
				ctx1.beginPath();
				ctx1.arc(150,75,64, 0, 2*Math.PI, false);  // different
				ctx1.fillStyle = "#FFF";		// for color of circle
				ctx1.fill();					// fill function
				ctx1.strokeStyle = "#09F"; 	// for border color
				ctx1.stroke();					// Stroke function
				ctx1.fillStyle = "#000";       // For text color
				ctx1.strokeStyle = "#33ff66"; //For Stroke Color
				ctx1.textAlign = 'center';  //for aligning text in center;
				ctx1.lineWidth = 10;	// for Stroke width
				ctx1.font="2em Arial"; // for font specifying
				ctx1.beginPath(); // starting circle drawing function
				ctx1.arc(150,75,64, start, diff1/10+start, false); // draw progress circle
				ctx1.stroke(); // stroke function
				ctx1.fillText(Math.ceil(al1).toFixed(0)  +'%', cw1*.5, ch1*.5+10, cw1);  // Print percent	
				if (al1 >=100) {
					clearInterval(brake);
					$("#pomoCanvas1").hide();
					return;
				}
				al1+= 100/(MIN_2_SEC * breakTime * intervalSize);
			}	
		
		function next_Time(){  // calls out functiom "progressBrake" dislay progress of breaktime
			al1=0;
			$("#pomoCanvas").hide();
			$("#pomoCanvas1").show();
			brake = setInterval(progressBrake, 1000 / intervalSize);
				progressBrake();
		}
		
		//  End of Canvas stuff
		
		
	});  // End of start "Click" function
	
	
	// Reload and initialize page
	$("#reset").click(function(){
		iCount =0;
		history.go(0);

	});
	
	// Subtract 1 minute from timer session
	$("#minusClock").click(function(){
		if (count > 1) {
			$("#num").html(--count);
		}
	});
	
	// Add 1 minute to timer session
	$("#addClock").click(function(){	
		if (count < 60) {
			$("#num").html(++count);
		}
	});
	
	// Subtract 1 minute from breakTimer session
	$("#minusBreak").click(function(){
		if (breakTime > 1) {
			$("#breakNum").html(--breakTime);
		}
	});
	
	// Add 1 minute to breakTimer session
	$("#addBreak").click(function(){	
		if (breakTime < 59 ) {
				$("#breakNum").html(++breakTime);
		}
	});
    
	
	// Subtract 1 from the number of intervals
	$("#minusIntervals").click(function(){
		if (rounds > 1) {
			$("#numberOfIntervals").html(--rounds);
		}
	});
	
	
	// Add 1 to the number of intervals 
	$("#addIntervals").click(function(){
		
			$("#numberOfIntervals").html(++rounds);
	});
	

});  // corresponds to document ready
    