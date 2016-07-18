(function () { // Initialize
	$('<div id="container" class="container"></div>').appendTo($('body'));
	$('<div id="toprow" class="toprow"></div>').appendTo($('#container'));
	$('<div id="toggle" class="toggle">Toggle</div>').appendTo($('#toprow'));
	$('<div id="config" class="config"></div>').appendTo($('#toprow'));
	$('<div id="start" class="start">Start</div>').css('visibility', 'hidden').appendTo($('#toprow'));
	$('<div id="timer" class="timer"><label id="minutes">00</label>:<label id="seconds">00</label></div>').css('visibility', 'hidden').appendTo($('#toprow'));
	$('<div id="score" class="score"></div>').css('visibility', 'hidden').appendTo($('#toprow'));
	$('<div id="selector" class="selector"></div>').appendTo($('#container'));
	for (var i = 0; i < 11; i++) {
		var txt = (i == 0 ? '*' : i);
		var cls = (i == 0 ? 'scell sall' : 'scell');
		$('<div id="score" class="' + cls + '">' + txt + '</div>').appendTo($('#selector'));
	}
	$('<div id="select_disable" class="select_disable"></div>').show().appendTo($('#container'));
	$('<div id="matrix" class="matrix"></div>').appendTo($('#container'));
	var txt = '';
	var cls = '';
	var ids = '';
	var ttl = '';
	for (var i = 0; i < 11; i++) {
		$('<div id="mrow' + i + '" class="mrow"></div>').appendTo($('#matrix'));
		for (var j = 0; j < 11; j++) {
			if (j == 0) {
				txt = i;
				clss = 'rheader'
					ids = (i == 10 ? i : '0' + i);
				ttl = '';
			}
			if (i == 0) {
				txt = j;
				clss = 'cheader'
					ids = (j == 10 ? j : '0' + j);
				ttl = '';
			}
			if ((j == 0) && (i == 0)) {
				txt = '*';
				clss = 'mheader'
					ids = '';
				ttl = '';
			}
			if ((j != 0) && (i != 0)) {
				txt = i + 'x' + j;
				clss = 'mcell'
					ids = '_' + (i == 10 ? i : '0' + i) + '_' + (j == 10 ? j : '0' + j);
				ttl = i + 'x' + j;
			}
			$('<div id="cell' + ids + '" class="' + clss + '" data-r=' + i + ' data-c=' + j + ' data-state="0" title="' + ttl + '">' + txt + '</div>').appendTo($('#mrow' + i));
		}
	}
	$('<div id="actionrow" class="actionrow"></div>').css('visibility', 'hidden').appendTo($('#container'));
	$('<div id="question" class="question">Qxxx</div>').appendTo($('#actionrow'));
	$('<div id="replydiv" class="replydiv"><input type="number" size="3" min="1" max="100" id="reply" class ="reply"/></div>').appendTo($('#actionrow'));
	$('<div id="ok" class="actionoption">OK</div>').appendTo($('#actionrow'));
	$('<div id="next" class="actionoption">Next</div>').appendTo($('#actionrow'));

	$('<div id="resultdiv" class="resultdiv"><table class="resulttable"><tbody><tr> <td id="resdone" colspan="2" rowspan="1">DONE!!!</td> </tr> <tr> <td class="reslabel">Total </td><td id="restotal">100<br> </td> </tr> <tr> <td class="reslabel">Correct</td> <td id="rescorrect">100 (100%) </td> </tr> <tr> <td class="reslabel">Time</td> <td id="restime">12:32 </td> </tr> </tbody></table><div id="resbuttondiv"><button id="resok" class="resbutton">OK</button><button id="resbetter" class="resbutton">Better</button><button id="resfaster" class="resbutton">Faster</button></div></div>').hide().appendTo($('#container'));
	
	$('<div id="conf_div"> <table id="configtable"> <tbody> <tr> <td class="configlabel">Show correct<br> </td> <td id="config_showcorrect" class="conf_value">YES</td> </tr> <tr> <td class="configlabel">Show result<br> </td> <td id="config_showresult" class="conf_value">YES</td> </tr> <tr> <td class="configlabel">Mark wrong<br> </td> <td id="config_markwrong" class="conf_value">YES</td> </tr> <tr> <td class="configlabel">Repeat wrong<br> </td> <td id="config_repeatwrong" class="conf_value">YES</td> </tr> <tr> <td class="configlabel">Highlight question<br> </td> <td id="config_hilightquestion" class="conf_value">YES</td> </tr> <tr> <td class="configlabel">Reverse pairs too<br> </td> <td id="config_fillcross" class="conf_value">YES</td> </tr> <tr> <td style="vertical-align: top;"><br> </td> <td style="vertical-align: top;"><br> </td> </tr> <tr> <td class="configlabel">Timer<br> </td> <td id="config_usetimer" class="conf_value">YES</td> </tr> <tr> <td class="configlabel">Countdown<br> </td> <td id="usecountdown" class="conf_value">NO<br> </td> </tr> <tr> <td class="configlabel">Count down time <br> </td> <td id="config_countdowntime" class="conf_value"><input id="conf_minutes" type="number" size="2" min="1" max="99" value="00" disabled/ > : <input id="conf_seconds" type="number" size="2" min="0" max="59" value="00" disabled/ ></td> </tr> </tbody> </table><div id="confbtndiv"><button id="conf_ok">OK</button></div> </div>').hide().appendTo($('#container'));
	
}());
// VARIABLES ----------
var active_numbers = [];
var active_combinations = [];
var sec = 0;
var timer;
var showresult = true;
var showcorrect = true;
var markwrong = true;
var repeatwrong = true;
var hilightquestion = true;
var fillcross = true;
var usetimer = true;
var usecountdown = false;
var countdowntime=300;
// FUNCTIONS ----------
function reset_matrix() {
	var txt = '';
	var ttl = '';
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			if ((j != 0) && (i != 0)) {
				txt = i + 'x' + j;
				ttl = i + 'x' + j;
				ids = '_' + (i == 10 ? i : '0' + i) + '_' + (j == 10 ? j : '0' + j);
				$('div#cell' + ids).html(txt);
			}
		}
	}
	$('div.mcell').css('background-color', 'rgb(173, 216, 230)');
	$('div.cheader').css('background-color', 'rgb(173, 216, 230)');
	$('div.rheader').css('background-color', 'rgb(173, 216, 230)');
	$('div.mheader').css('background-color', 'rgb(173, 216, 230)');
}
function reset_selector() {
	$('div.scell').css('background-color', 'rgb(173, 216, 230)');
}
function reset() {
	reset_matrix();
	reset_selector();
}
function reset_timer(){

$('label#minutes').html('00');
$('label#seconds').html('00')
	$("#seconds").html(pad(countdowntime%60));
    $("#minutes").html(pad(parseInt(countdowntime/60,10)));



}
function endgame(){
	$('div#start').html('New');
	clearInterval(timer);
	
	active_numbers = [];
	active_combinations = [];
	$('#actionrow').css('visibility', 'hidden');

	var score = $('#score').html().match(/\d+/g);
	
	$('td#restotal').html(score[1]);
	$('td#rescorrect').html(score[0]+(score[1]==0?'':' / ( '+ (score[0] * 100 / score[1]).toFixed(1) +' % )'));
	if(usecountdown){
	var rsec = countdowntime - sec;
	$('td#restime').html(pad(parseInt(rsec/60,10))+':'+pad(rsec%60));
	sec = 0;
	}else{
	$('td#restime').html($('#timer').html());
	sec = 0;
	}
	$('div#resultdiv').show();
	}
function pad ( val ) { 
return val > 9 ? val : "0" + val; 
}


// LOGIC ----------
$('div#config').click(function () { // Show config screen
	$('div#conf_div').show();
	$('div#start').css('visibility', 'hidden');
	});
$('button#conf_ok').click(function () { // close config screen
	$('div#conf_div').hide();
	if($('div#toggle').html()=='Challenge'){$('div#start').css('visibility', 'visible');}
	countdowntime=parseInt($('#conf_minutes').val())*60+parseInt($('#conf_seconds').val());
	$("label#seconds").html(pad(countdowntime%60));
    $("label#minutes").html(pad(parseInt(countdowntime/60,10)));
	});
$('td#config_showresult').click(function () {
showresult=!showresult;
if($(this).html()=='YES'){$(this).html('NO')}else{$(this).html('YES')}

console.log(showresult);
});
$('td#config_showcorrect').click(function () {
showcorrect=!showcorrect;
if($(this).html()=='YES'){$(this).html('NO')}else{$(this).html('YES')}
console.log(showcorrect);
});
$('td#config_markwrong').click(function () {
markwrong=!markwrong;
if($(this).html()=='YES'){$(this).html('NO')}else{$(this).html('YES')}
console.log(markwrong);
});
$('td#config_repeatwrong').click(function () {
repeatwrong=!repeatwrong;
if($(this).html()=='YES'){$(this).html('NO')}else{$(this).html('YES')}
console.log(repeatwrong);
});
$('td#config_hilightquestion').click(function () {
hilightquestion=!hilightquestion;
if($(this).html()=='YES'){$(this).html('NO')}else{$(this).html('YES')}
console.log(hilightquestion);
});
$('td#config_fillcross').click(function () {
fillcross=!fillcross;
if($(this).html()=='YES'){$(this).html('NO')}else{$(this).html('YES')}
console.log(fillcross);
});
$('td#config_usetimer').click(function () {
usetimer=!usetimer;
usecountdown=!usecountdown;
if($(this).html()=='YES'){
$(this).html('NO')
$('td#usecountdown').html('YES');
$('#conf_minutes').val('01').prop('disabled', false);
$('#conf_seconds').val('00').prop('disabled', false);
}else{
$(this).html('YES')
$('td#usecountdown').html('NO');
$('#conf_minutes').val('00').prop('disabled', true);
$('#conf_seconds').val('00').prop('disabled', true);
}
console.log(config_usetimer);
});
$('td#usecountdown').click(function () {
usecountdown=!usecountdown;
usetimer=!usetimer;
if($(this).html()=='YES'){
$(this).html('NO')
$('td#config_usetimer').html('YES');
$('#conf_minutes').val('00').prop('disabled', true);
$('#conf_seconds').val('00').prop('disabled', true);
}else{
$(this).html('YES')
$('td#config_usetimer').html('NO');
$('#conf_minutes').val('01').prop('disabled', false);
$('#conf_seconds').val('00').prop('disabled', false);
}
console.log(config_usetimer);
});

$('button#resok').click(function () { // close result screen
	$('div#resultdiv').hide();
});
$('div#select_disable').click(function () { // Disable number selection selector
});
$('div.mcell').each(function () { // matrix cell click
	$(this).click(function () {
		if ($('div#toggle').html() == "Toggle") {
			//console.log($(this).css('background-color'));
			if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
				$(this).html($(this).data('c') * $(this).data('r'));
				$(this).css('background-color', 'rgb(200, 200, 200)');
			} else {
				//alert('ok');
				$(this).html($(this).data('c') + 'x' + $(this).data('r'));
				$(this).css('background-color', 'rgb(173, 216, 230)');
			}
		}
	})

});
$('div.cheader').each(function () { // column header click
	$(this).click(function () {
		if ($('div#toggle').html() == "Toggle") {
			if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
				$(this).css('background-color', 'rgb(200, 200, 200)');
			} else {
				$(this).css('background-color', 'rgb(173, 216, 230)');
			}

			for (var k = 1; k < 11; k++) {

				if ($('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
					$('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(173, 216, 230)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
						$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(173, 216, 230)');
					});
				}
			}
			for (var k = 1; k < 11; k++) {
				if ($('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') == -1) {
					$('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(200, 200, 200)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
						$(this).html($(this).data('c') * $(this).data('r')).css('background-color', 'rgb(200, 200, 200)');
					});
				}
			}
		}

	});
});
$('div.rheader').each(function () { // row header click
	$(this).click(function () {
		if ($('div#toggle').html() == "Toggle") {
			if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
				$(this).css('background-color', 'rgb(200, 200, 200)');
			} else {
				$(this).css('background-color', 'rgb(173, 216, 230)');
			}

			for (var k = 1; k < 11; k++) {
				if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
					$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(173, 216, 230)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
						$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(173, 216, 230)');
					});
				}
			}
			for (var k = 1; k < 11; k++) {
				if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') == -1) {
					$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(200, 200, 200)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
						$(this).html($(this).data('c') * $(this).data('r')).css('background-color', 'rgb(200, 200, 200)');
					});
				}
			}

		}
	});
});
$('div.mheader').click(function () { // matrix header clcik//
	if ($('div#toggle').html() == "Toggle") {
		if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
			$(this).css('background-color', 'rgb(200, 200, 200)');
			$('div.cheader').css('background-color', 'rgb(200, 200, 200)');
			$('div.rheader').css('background-color', 'rgb(200, 200, 200)');
			$('div.mcell').each(function () {
				$(this).html($(this).data('c') * $(this).data('r')).css('background-color', 'rgb(200, 200, 200)');
			});
		} else {
			$(this).css('background-color', 'rgb(173, 216, 230)');
			$('div.cheader').css('background-color', 'rgb(173, 216, 230)');
			$('div.rheader').css('background-color', 'rgb(173, 216, 230)');
			$('div.mcell').each(function () {
				$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(173, 216, 230)');
			});

		}

		for (var k = 1; k < 11; k++) {
			if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
				$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(173, 216, 230)');
				$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
					$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(173, 216, 230)');
				});
			}
		}
	}
});
$('div#toggle').click(function () { // (toggle) mode selector click
	if ($(this).html() == 'Toggle') {
		$(this).html('Challenge');
		$('div#config').show();
		$('div#start').html('Start');
		reset();
		$('#start').css('visibility', 'visible');
		$('#timer').css('visibility', 'hidden');
		$('#score').css('visibility', 'hidden').html('0 / 0 ( 0 % )');
		$('#actionrow').css('visibility', 'hidden');
		$('div.scell').addClass('glow');
		$('div#select_disable').hide();

		
		return;
	}
	if ($(this).html() == 'Challenge') {
		$(this).html('Toggle');
		$('div#config').show();
		reset();
		$('#start').css('visibility', 'hidden');
		$('#timer').css('visibility', 'hidden');
		$('#score').css('visibility', 'hidden');
		$('#actionrow').css('visibility', 'hidden');
		$('div.scell').removeClass('glow');
		$('div#select_disable').show();
	clearInterval(timer);
	active_numbers = [];
	active_combinations = [];
		return;
	}

});
$('div#start').click(function () { // start click
	if ($(this).html() == 'Start') {
		sec = 0;
		reset_timer();
		active_numbers = [];
		active_combinations = [];
		$('div.scell:gt(0)').each(function () {
			if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') == -1) {
				active_numbers.push($(this).html())
			}
		})
		if (active_numbers.length > 0) { // if numbers selected
			for (var i = 0; i < active_numbers.length; i++) {
				for (var k = 1; k < 11; k++) {
					active_combinations.push(active_numbers[i] + ' x ' + k)
				}
			}
			if (active_combinations.length > 0) {
				var pick = Math.floor((Math.random() * active_combinations.length));
				$('#question').html(active_combinations[pick]);
				$('#actionrow').css('visibility', 'visible');
				$('div#config').hide();
				$(this).html('Stop');
			$('#timer').css('visibility', 'visible');
		$('#score').css('visibility', 'visible').html('0 / 0 ( 0 % )');
			
			$('div#select_disable').show();
			$('div.scell').removeClass('glow');
			}
			$('#reply').focus();
	
	
	if(usecountdown){//countdown
	sec=countdowntime;
	timer =setInterval( function(){
    $("#seconds").html(pad(--sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
	if (sec<=0){endgame();}}
	, 1000);
	}else{//timer
	timer =setInterval( function(){
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
	}, 1000);
	}
		} else { // no number selected
			alert('Select Numbers');
		}
	return;
	} 
	if($(this).html() == 'Stop'){
	$(this).html('New');
	clearInterval(timer);
	sec = 0;
	active_numbers = [];
	active_combinations = [];
	$('#actionrow').css('visibility', 'hidden');
	return;
	
	
	
	}
	if($(this).html() == 'New'){
	$(this).html('Start');
	$('div#config').show();
	clearInterval(timer);
	sec = 0;
	reset_timer();
	$('div#select_disable').hide();
	$('div.scell').addClass('glow');
	reset();
	$('#timer').css('visibility', 'hidden');
	$('#score').css('visibility', 'hidden');
	$('#actionrow').css('visibility', 'hidden');
	return;
	}
});
$('div.scell:gt(0)').click(function () { // number selector click
	if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
		$(this).css('background-color', 'rgb(200, 200, 200)');
		if (fillcross) { // fill cross
				$('div.rheader:eq(' + (parseInt($(this).html()) - 1) + ')').css('background-color', 'rgb(180, 250, 250)');
				$('div.cheader:eq(' + (parseInt($(this).html()) - 1) + ')').css('background-color', 'rgb(180, 250, 250)');
				
			
		} else { // no fill cross
			var n = ($(this).html() == 10 ? $(this).html() : '0' + $(this).html());
		
				$('div.rheader:eq(' + (parseInt($(this).html()) - 1) + ')').css('background-color', 'rgb(180, 250, 250)');
			
		}
	} else {
		$(this).css('background-color', 'rgb(173, 216, 230)');
		if (fillcross) { // fill cross
	
				$('div.cheader:eq(' + (parseInt($(this).html()) - 1) + ')').css('background-color', 'rgb(173, 216, 230)');
				$('div.rheader:eq(' + (parseInt($(this).html()) - 1) + ')').css('background-color', 'rgb(173, 216, 230)');
			
		} else { // no fill cross
			
				$('div.rheader:eq(' + (parseInt($(this).html()) - 1) + ')').css('background-color', 'rgb(173, 216, 230)');
			
		}

	}

if (fillcross)	{
		for (var k = 1; k < 11; k++) {

	
	
	if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
				//	$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(180, 250, 250)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
						$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(173, 216, 230)');
					});
				}
	}
	for (var k = 1; k < 11; k++) {
	if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(180, 250, 250)') != -1) {
				//	$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(180, 250, 250)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '"]').each(function () {
						$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(180, 250, 250)');
					});
				}
	}
	
	}else{ //no fill cross
	
	for (var k = 1; k < 11; k++) {
	
	if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
				//	$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(180, 250, 250)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '_"]').each(function () {
						$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(173, 216, 230)');
					});
				}
	}
	for (var k = 1; k < 11; k++) {
	if ($('div.rheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color').indexOf('rgb(180, 250, 250)') != -1) {
				//	$('div.cheader[id*="' + (k == 10 ? k : '0' + k) + '"]').css('background-color', 'rgb(180, 250, 250)');
					$('div[id*="_' + (k == 10 ? k : '0' + k) + '_"]').each(function () {
						$(this).html($(this).data('c') + 'x' + $(this).data('r')).css('background-color', 'rgb(180, 250, 250)');
					});
				}
	
	}			
				
	
	
}

	
	
	
	
});
$('div.scell:first').click(function () { // number selector click
	if ($(this).css('background-color').indexOf('rgb(173, 216, 230)') != -1) {
		$('div.scell').css('background-color', 'rgb(200, 200, 200)');
		if (fillcross) { // fill cross
				$('div.rheader').css('background-color', 'rgb(180, 250, 250)');
				$('div.cheader').css('background-color', 'rgb(180, 250, 250)');
			} else { // no fill cross
				$('div.rheader').css('background-color', 'rgb(180, 250, 250)');
				}
	$('div.mcell').css('background-color', 'rgb(180, 250, 250)');
	$('div.mheader').css('background-color', 'rgb(180, 250, 250)');
	} else {
		$('div.scell').css('background-color', 'rgb(173, 216, 230)');
		if (fillcross) { // fill cross
	
				$('div.cheader').css('background-color', 'rgb(173, 216, 230)');
				$('div.rheader').css('background-color', 'rgb(173, 216, 230)');
			
		} else { // no fill cross
			
				$('div.rheader').css('background-color', 'rgb(173, 216, 230)');
			
		}
$('div.mcell').css('background-color', 'rgb(173, 216, 230)');
$('div.mheader').css('background-color', 'rgb(173, 216, 230)');
	}



	
	
	
	
});
$('div#ok').click(function () { // ok click
	if($('input#reply').val()!=''){
	var combination = $('#question').html();
	var correct = eval($('#question').html().replace('x', '*'));
	var nums = [];
	var score = [];
	var reply = $('#reply').val();
	console.log(eval($('#question').html().replace('x', '*')));
	console.log(correct)
	console.log(reply)
	nums = combination.match(/\d+/g);
	score = $('#score').html().match(/\d+/g);
	if (correct == reply) {

		console.log(nums)
		if (fillcross) { //fill cross
			$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).css('background-color', 'rgb(0, 200, 0)');
			$('#cell_' + (nums[1] == 10 ? nums[1] : '0' + nums[1]) + '_' + (nums[0] == 10 ? nums[0] : '0' + nums[0])).css('background-color', 'rgb(0, 200, 0)');
			if (showresult) {
				$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).html(eval((nums[0] == 10 ? nums[0] : '0' + nums[0]) + '*' + (nums[1] == 10 ? nums[1] : '0' + nums[1])));
				$('#cell_' + (nums[1] == 10 ? nums[1] : '0' + nums[1]) + '_' + (nums[0] == 10 ? nums[0] : '0' + nums[0])).html(eval((nums[1] == 10 ? nums[1] : '0' + nums[1]) + '*' + (nums[0] == 10 ? nums[0] : '0' + nums[0])));
			}
		} else { //do not fill cross
			$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).css('background-color', 'rgb(0, 200, 0)');
			if (showresult) {
				$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).html(eval((nums[0] == 10 ? nums[0] : '0' + nums[0]) + '*' + (nums[1] == 10 ? nums[1] : '0' + nums[1])));
			}
		}
		score = $('#score').html().match(/\d+/g);
		score[0] = parseInt(score[0]) + 1;
		score[1] = parseInt(score[1]) + 1;
		score[2] = (score[0] * 100 / score[1]).toFixed(1);
		$('#score').html(score[0] + ' / ' + score[1] + '  ( ' + score[2] + ' % )');

		for (var i = 0; i < active_combinations.length; i++) {
			if (active_combinations[i] == combination) {
				active_combinations.splice(i, 1)
				if (active_combinations.length > 0) {
					var pick = Math.floor((Math.random() * active_combinations.length));
					$('#question').html(active_combinations[pick]);
					$('#reply').val('').focus();
				}else{
		endgame();
		}
			}
		}
	} else { // wrong
		if (fillcross) { //fill cross
			$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).css('background-color', 'rgb(0, 200, 0)');
			$('#cell_' + (nums[1] == 10 ? nums[1] : '0' + nums[1]) + '_' + (nums[0] == 10 ? nums[0] : '0' + nums[0])).css('background-color', 'rgb(0, 200, 0)');
			if (markwrong) {
				$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).css('background-color', 'rgb(200, 0, 0)');
				$('#cell_' + (nums[1] == 10 ? nums[1] : '0' + nums[1]) + '_' + (nums[0] == 10 ? nums[0] : '0' + nums[0])).css('background-color', 'rgb(200, 0, 0)');
			}
			if (showcorrect) {
				$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).html(eval((nums[0] == 10 ? nums[0] : '0' + nums[0]) + '*' + (nums[1] == 10 ? nums[1] : '0' + nums[1])));
				$('#cell_' + (nums[1] == 10 ? nums[1] : '0' + nums[1]) + '_' + (nums[0] == 10 ? nums[0] : '0' + nums[0])).html(eval((nums[1] == 10 ? nums[1] : '0' + nums[1]) + '*' + (nums[0] == 10 ? nums[0] : '0' + nums[0])));
			}
		} else { // do not fill cross
			if (markwrong) {
				$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).css('background-color', 'rgb(200, 0, 0)');
			}
			if (showcorrect) {
				$('#cell_' + (nums[0] == 10 ? nums[0] : '0' + nums[0]) + '_' + (nums[1] == 10 ? nums[1] : '0' + nums[1])).html(eval((nums[0] == 10 ? nums[0] : '0' + nums[0]) + '*' + (nums[1] == 10 ? nums[1] : '0' + nums[1])));
			}
		}

		score[1] = parseInt(score[1]) + 1;
		score[2] = (score[0] * 100 / score[1]).toFixed(1);
		$('#score').html(score[0] + ' / ' + score[1] + '  ( ' + score[2] + ' % )');

		if (!repeatwrong) {
			for (var i = 0; i < active_combinations.length; i++) {
				if (active_combinations[i] == combination) {
					active_combinations.splice(i, 1)
				}
			}
		}
		if (active_combinations.length > 0) {
			var pick = Math.floor((Math.random() * active_combinations.length));
			$('#question').html(active_combinations[pick]);
			$('#reply').val('').focus();
		}else{
		endgame();
		}

	} //wrong

	
	

	
	
	
	
	
	}// if not null
	});
$('#reply').on('keydown', function (e) { // reply onenter
	if (e.which == 13) {
		$('div#ok').click();
		return false;
	}
});
$('div#next').click(function () { // Skip to next question

if (active_combinations.length > 1) {
var combination = $('#question').html();
	for (var i = 0; i < active_combinations.length; i++) {
			if (active_combinations[i] == combination) {
				active_combinations.splice(i, 1);
					var pick = Math.floor((Math.random() * active_combinations.length));
					$('#question').html(active_combinations[pick]);
					$('#reply').val('').focus();
				active_combinations.push(combination);
			}
		}
}
});


