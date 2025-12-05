window.addEventListener( 'load', function () {
	const field = document.getElementById( 'field' ),
		ds = isDSi();
	if ( ds ) {
		document.getElementById( 'root' ).className = 'dsi';
		field.height = '162';
		field.width = '162';
	}

	const ctx = field.getContext( '2d', {
			alpha: true,
			willReadFrequently: true
		} ),
		plrTxt = document.getElementById( 'plr' ),
		winO = document.getElementById( 'wins-o' ),
		winX = document.getElementById( 'wins-x' ),
		h = field.height,
		w = field.width,
		magic = w / 3;

	var curPlayer = true,
		fieldData = [
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		],
		filled = 0,
		won = false,
		winsO = 0,
		winsX = 0;

	ctx.lineWidth = ds ? 5 : 10;

	function getData( x, y ) {
		return fieldData[ y * 3 + x ];
	}

	function drawLine( x, y, x2, y2 ) {
		const startX = x * magic + magic * 0.5,
			startY = y * magic + magic * 0.5,
			endX = x2 * magic + magic * 0.5,
			endY = y2 * magic + magic * 0.5;
		ctx.beginPath();
		ctx.moveTo( startX, startY );
		ctx.lineTo( endX, endY );
		ctx.closePath();
		ctx.stroke();
	}

	function checkWin( x, y ) {
		// horizontal
		if ( ( getData( 0, y ) === getData( 1, y ) ) &&
			( getData( 0, y ) === getData( 2, y ) ) &&
			( getData( 0, y ) > 0 ) ) {
			drawLine( 0, y, 2, y );
			won = true;
		}

		// vertical
		if ( ( getData( x, 0 ) === getData( x, 1 ) ) &&
			( getData( x, 0 ) === getData( x, 2 ) ) &&
			( getData( x, 0 ) > 0 ) ) {
			drawLine( x, 0, x, 2 );
			won = true;
		}

		// diagonal \
		if ( ( getData( 0, 0 ) === getData( 1, 1 ) ) &&
			( getData( 1, 1 ) === getData( 2, 2 ) ) &&
			( getData( 0, 0 ) > 0 ) ) {
			drawLine( 0, 0, 2, 2 );
			won = true;
		}

		// diagonal /
		if ( ( getData( 2, 0 ) === getData( 1, 1 ) ) &&
			( getData( 1, 1 ) === getData( 0, 2 ) ) &&
			( getData( 2, 0 ) > 0 ) ) {
			drawLine( 2, 0, 0, 2 );
			won = true;
		}

		if ( won ) {
			return true;
		}
		return false;
	}

	function drawField() {
		const halfH = Math.floor( h * 0.5 ),
			halfW = Math.floor( w * 0.5 ),
			posH = halfH - 10,
			third = Math.floor( field.width / 6 ),
			rad = ds ? 4 : 5;
		ctx.clearRect( 0, 0, field.width, field.height );
		ctx.fillStyle = 'gray';
		ctx.translate( halfW, halfH );
		for ( var i = 0; i < 4; i++ ) {
			ctx.beginPath();
			ctx.moveTo( third - rad, posH * -1 );
			ctx.arc( third, posH * -1, rad, Math.PI, 0, false );
			ctx.lineTo( third + rad, posH );
			ctx.arc( third, posH, rad, 0, Math.PI, false );
			ctx.lineTo( third - rad, posH * -1 );
			ctx.closePath();
			ctx.fill();
			ctx.rotate( Math.PI * 0.5 );
		}
		ctx.translate( halfW * -1, halfH * -1 );
	}

	function drawO( x, y ) {
		ctx.fillStyle = '#0026ff';
		ctx.beginPath();
		ctx.arc( x * magic + magic * 0.5, y * magic + magic * 0.5, ds ? 18 : 25, 0, 2 * Math.PI, false );
		ctx.arc( x * magic + magic * 0.5, y * magic + magic * 0.5, ds ? 13 : 15, 0, 2 * Math.PI, true );
		ctx.closePath();
		ctx.fill();
	}

	function drawXLine() {
		const a = ds ? 18 : 25,
			b = ds ? 3 : 5;
		ctx.beginPath();
		ctx.moveTo( b * -1, a * -1 );
		ctx.arc( 0, a * -1, b, Math.PI, 0, false );
		ctx.lineTo( b, a );
		ctx.arc( 0, a, b, 0, Math.PI, false );
		ctx.lineTo( b * -1, a * -1 );
		ctx.closePath();
		ctx.fill();
	}

	function drawX( x, y ) {
		const offsetX = x * magic + magic/2,
			offsetY = y * magic + magic/2;
		ctx.translate( offsetX, offsetY );
		ctx.fillStyle = '#f00';
		ctx.rotate( Math.PI * 0.25 );
		drawXLine();
		ctx.rotate( -Math.PI * 0.5 );
		drawXLine();
		ctx.rotate( Math.PI * 0.25 );
		ctx.translate( -offsetX, -offsetY );
	}

	function reset() {
		drawField();
		for ( var i = 0; i < 9; i++ ) {
			fieldData[ i ] = 0;
		}
		filled = 0;
		won = false;
	}
	reset();
	field.addEventListener( 'click', function ( e ) {
		const X = Math.floor( ( e.offsetX === undefined ? e.layerX : e.offsetX ) / magic ),
			Y = Math.floor( ( e.offsetY === undefined ? e.layerY : e.offsetY ) / magic ),
			n = Y * 3 + X,
			d = ctx.getImageData( e.offsetX, e.offsetY, 1, 1 ).data;
		if ( won || d[ 1 ] === 128 || fieldData[ n ] > 0 ) {
			return;
		}
		filled++;
		fieldData[ n ] = curPlayer ? '1' : '2';
		curPlayer ? drawX( X, Y ) : drawO( X, Y );
		if ( checkWin( X, Y ) ) {
			winsX += curPlayer ? 1 : 0;
			winsO += curPlayer ? 0 : 1;
			winX.textContent = winsX;
			winO.textContent = winsO;
			setTimeout( reset, 1500 );
		}
		curPlayer = !curPlayer;
		plrTxt.className = curPlayer ? 'playerX' : 'playerO';
		plrTxt.textContent = curPlayer ? 'X' : 'O';
		if ( filled === 9 && !won ) {
			reset();
		}
	}, false );
}, false );
