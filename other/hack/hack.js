const terminalTexts = [
	'rm -rf /* --no-preserve-root',
	'pacman -Syu',
	'sudo -s',
	'neofetch',
	'Hacking database',
	'Establishing connection',
	'Hi',
	'undefined',
	'Hello World!',
	'Goodbye World!',
	'Ah free at last',
	'A visitor. Hm indeed, I\'ve slept long enough.',
	'Rise and shine mr Freeman',
	'Get out',
	'kernel panic - not syncing: Attempted to kill inint !',
	'Uncaught ReferenceError: message is not defined',
	'Exception in thread "main" java.lang.NullPointerException',
	'Segmentation fault (core dumped)',
	'Fatal error: Unexpectedly found nil while unwrapping an Optional value',
	'ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE id=1\' at line 1',
	'System.NullReferenceException: Object reference not set to an instance of an object.',
	'panic: runtime error: index out of range [5] with length 3',
	'Type mismatch: inferred type is Int but String was expected',
	'thread "main" panicked at "attempt to add with overflow", src/main.rs:4:9',
	'for(int i = 0; i < sizeof(arr); i++) {}',
];

window.addEventListener('load', function() {
	const ds = isDSi();
	if ( ds ) {
		document.getElementById( 'root' ).className = 'dsi';
	}
	const terminal = document.getElementById('terminal'),
		numbers = document.getElementById('numbers'),
		bars = document.getElementById('bars'),
		canv = document.getElementById('tiles'),
		scan = document.getElementById('scan'),
		ctx = canv.getContext('2d', { alpha: false }),
		termLength = terminalTexts.length,
		barLength = 30,
		cols = ds ? 2 : 6,
		rows = ds ? 14 : 30,
		tileRows = ds ? 15 : 16,
		tileCols = ds ? 10 : 16,
		barCount = ds ? 6 : 9,
		echoCount = ds ? 6 : 16;
	var terminalLength = 0,
		barTxt = '',
		newNum = '',
		newBar = '',
		oldTiles = [];

	if ( ds ) {
		scan.src = 'img/Radar DSi.gif';
	} else {
		scan.src = 'img/Radar 3DS.gif';
	}

	canv.height = 5 * tileRows - 2;
	canv.width = 13 * tileCols - 2;

	function ran(num) {
		return Math.floor(Math.random() * num);
	}

	function echo() {
		var v = terminal.value;
		if (terminalLength < echoCount) {
			terminalLength++;
		} else {
			v = v.substring(v.match('\n').index + 2);			
		}
		terminal.value = v + terminalTexts[ran(termLength-1)] + '\n';
	}

	function genTiles() {
		for (var y=0; y<tileRows; y++) {
			for (var x=0; x<tileCols; x++) {
				const r = Math.random() < 0.5,
					i = y*16+x;
				if (oldTiles[i] !== r) {
					ctx.fillStyle = r ? '#000' : '#0f960f';
					ctx.fillRect(x * 13, y * 5, 11, 3);
					oldTiles[i] = r;
				}
			}
		}
	}

	function genBars() {
		newBar = '';
		for (var ln=0; ln<barCount; ln++) {
			newBar += ln + " ) l" + barTxt.substring(0, ran(barLength)) + '\n';
		}
		bars.value = newBar;
	}

	function genNums() {
		newNum = '';
		for (var row=0; row<rows; row++) {
			for (var col=0; col<cols; col++) {
				newNum += ran(64) + ' ';
			}
			newNum += (row === rows-1) ? '' : '\n';
		}

		numbers.value = newNum;
	}

	for (var j=0; j<barLength; j++) {
		barTxt += 'l';
	}

	echo();
	genTiles();
	genBars();
	genNums();

	var intervalIDs = [];
	if (!document.hidden) {
		intervalIDs.push(setInterval(echo, 50));
		intervalIDs.push(setInterval(genTiles, 1000));
		intervalIDs.push(setInterval(genBars, 500));
		intervalIDs.push(setInterval(genNums, 20));
	}
	window.addEventListener('blur', function() {
		if (intervalIDs.length === 0) return;
		intervalIDs.forEach(function(id) {
			clearInterval(id);
		})
		intervalIDs.length = 0;
	}, false);
	window.addEventListener('focus', function() {
		if (intervalIDs.length > 0) return;
		intervalIDs.push(setInterval(echo, 50));
		intervalIDs.push(setInterval(genTiles, 1000));
		intervalIDs.push(setInterval(genBars, 500));
		intervalIDs.push(setInterval(genNums, 20));
	}, false);
}, false);