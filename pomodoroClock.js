
$(document).ready(function(){
	
    var buzzer = $("#buzzer")[0],
	count = parseInt($("#num").html()),
	breakTime = parseInt($("#breakNum").html()),
	rounds =   parseInt($("#numberOfIntervals").html()),
    countSec, breakTimeSec, counter, startBreak, session, brake, 
	iCount = 1,
	ctx = document.getElementById("pomoCanvas").getContext('2d'),
	start = Math.PI*1.5,
	cw = ctx.canvas.width,
	ch = ctx.canvas.height,
	al,
	diff,
	ctx1 = document.getElementById("pomoCanvas1").getContext('2d'),
	start1 = Math.PI*1.5,
	cw1 = ctx1.canvas.width,
	ch1 = ctx1.canvas.height,
	al1,
	diff1,
	countStringSeconds,
	breakStringSeconds,
	timeDisplay,
	timeDisplay1;

	
	// Modifying CSS width and height for the two canvas IDs from the values obtained from the JS object
	document.getElementById("pomoCanvas").style.width = 2*cw;
	document.getElementById("pomoCanvas1").style.width = 2*cw1;
	document.getElementById("pomoCanvas").style.height = 2*ch;
	document.getElementById("pomoCanvas1").style.height = 2*ch1;
	
	const MIN_2_SEC = 60;
	
  	$("#reset").hide();
	$("#pomoCanvas, #pomoCanvas1").hide();
	
	
	$("#start").click(function(){
	
		
		var timeLapse = document.getElementsByClassName('spacer');
  		for (var i = 0; i < timeLapse.length; i++) {
    	timeLapse[i].style.display = 'inline';
		}
		
		
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
		
		
		function formatTime(timeValue){

		 var newNumber = timeValue.toFixed(0);
			if (newNumber % 60 >= 10){
					return Math.floor(newNumber/ 60) + ":" + newNumber % 60;
				
				}
				else {
					return Math.floor(newNumber / 60) + ":0" + newNumber % 60;
				
				}
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
					buzzer.play();     // Play buzzer 12 sec before
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
				ctx.arc(150 , 75, 64, 0, 2*Math.PI, false);  
				ctx.fillStyle = "#FFF";		
				ctx.fill();					
				ctx.strokeStyle = "#09F"; 	
				ctx.stroke();				
				ctx.fillStyle = "#000";       
				ctx.strokeStyle = "#FFA500"; 
				ctx.textAlign = 'center';  
				ctx.lineWidth = 10;   
				ctx.font="2em Arial";  
				ctx.beginPath(); 
				ctx.arc(150, 75, 64, start, diff/10+start, false);  
				ctx.stroke();	
			    countStringSeconds = (0.01*(100 - al)*MIN_2_SEC * count.toFixed(0));
			    timeDisplay = formatTime(countStringSeconds);
                ctx.fillText(timeDisplay, cw*.5, ch*.5+10, cw);
				if (al >=100) {       
					clearInterval(session);
					$("#pomoCanvas").hide();
					return;
				}	
			//	al+= 100/(MIN_2_SEC * count * intervalSize); 
			al+= 100/(MIN_2_SEC * count * intervalSize);
		}
		
		
		function last_Time(){  
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
				ctx1.arc(150,75,64, 0, 2*Math.PI, false);  
				ctx1.fillStyle = "#000";		
				ctx1.fill();					
				ctx1.strokeStyle = "#09F"; 	
				ctx1.stroke();					
				ctx1.fillStyle = "#FFF";       
				ctx1.strokeStyle = "#33FF66"; 
				ctx1.textAlign = 'center';  
				ctx1.lineWidth = 10;	
				ctx1.font="2em Arial"; 
				ctx1.beginPath(); 
				ctx1.arc(150,75,64, start, diff1/10+start, false); 
				ctx1.stroke(); 
			    breakStringSeconds = (0.01*(100 - al1)*MIN_2_SEC * breakTime.toFixed(0));
			    timeDisplay1 = formatTime(breakStringSeconds);
			    ctx1.fillText(timeDisplay1, cw1*.5, ch1*.5+10, cw1);
				if (al1 >=100) {
					clearInterval(brake);
					$("#pomoCanvas1").hide();
					return;
				}
			   al1+= 100/(MIN_2_SEC * breakTime * intervalSize);
			}	
		
		function next_Time(){  
			al1=0;
			$("#pomoCanvas").hide();
			$("#pomoCanvas1").show();
			brake = setInterval(progressBrake, 1000 / intervalSize);
				progressBrake();
		}
	});  
	
	
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
	
});  
    