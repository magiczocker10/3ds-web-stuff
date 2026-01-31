window.addEventListener('load', function() {
	if ( isDSi() ) {
		document.getElementById( 'root' ).className = 'dsi';
	}
	const code = document.getElementById('code'),
		input = document.getElementById('text'),
		codeSelectors = document.getElementsByName('codeSelectRadio'),
		pages = document.getElementsByClassName('page'),
		left = document.getElementById('left'),
		right = document.getElementById('right');
	var page = 0;

	function getSelectedCode() {
		for (var i = 0; i < codeSelectors.length; i++) {
			const sel = codeSelectors[i];
			if (sel.checked) return sel.value;
		}
	}

	function generate(str) {
		code.src = 'http://bwipjs-api.metafloor.com?bcid=' + getSelectedCode() + '&text=' + decodeURIComponent(str);
	}

	function nextPage() {
		if (page + 1 >= pages.length) return;

		left.className = '';
		pages[page].style.display = 'none';
		page++;
		pages[page].style.removeProperty('display');
		if (page + 1 === pages.length) right.className = 'hidden';
	}

	function prevPage() {
		if (page <= 0) return;

		right.className = '';
		pages[page].style.display = 'none';
		page--;
		pages[page].style.removeProperty('display');
		if (page === 0) left.className = 'hidden';
	}

	document.getElementById('btn-gen').addEventListener('click', function() {
		if (input.value.length) generate(input.value);
	}, false);

	onBtnJustPressed('left', prevPage);
	onBtnJustPressed('right', nextPage);

	left.addEventListener('click', prevPage, false);
	right.addEventListener('click', nextPage, false);
}, false);
