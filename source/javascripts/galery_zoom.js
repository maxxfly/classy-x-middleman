/**
 * galery-zoom.js
 * Zoom (pinch), déplacement (pan 1 doigt) et minimap pour la galerie mobile.
 * Appelé par galery-popin.js via initGaleryZoom($figure).
 */
function initGaleryZoom($figure) {
	var zoomScale = 1;
	var translateX = 0;
	var translateY = 0;
	var lastTouchDist = null;
	var touchMoved = false;
	var isPanning = false;
	var panStartX = 0, panStartY = 0;
	var panStartTx = 0, panStartTy = 0;

	function getTouchDist(touches) {
		var dx = touches[0].clientX - touches[1].clientX;
		var dy = touches[0].clientY - touches[1].clientY;
		return Math.sqrt(dx * dx + dy * dy);
	}

	function applyTransform($el) {
		$el.css('transform', 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + zoomScale + ')');
		updateMinimap($el);
	}

	function updateMinimap($el) {
		var $mm = $('#zoom_minimap');
		if (!$mm.length || $(window).width() > 750) { $mm.hide(); return; }
		if (zoomScale <= 1.01) { $mm.hide(); return; }
		$mm.show();
		var mW = $mm.outerWidth();
		var mH = $mm.outerHeight();
		var iW = $el.width() || 1;
		var iH = $el.height() || 1;
		var vpW = Math.max(6, mW / zoomScale);
		var vpH = Math.max(6, mH / zoomScale);
		var cnX = 0.5 - translateX / (iW * zoomScale);
		var cnY = 0.5 - translateY / (iH * zoomScale);
		cnX = Math.max(vpW / (2 * mW), Math.min(1 - vpW / (2 * mW), cnX));
		cnY = Math.max(vpH / (2 * mH), Math.min(1 - vpH / (2 * mH), cnY));
		$('#zoom_viewport').css({
			width: vpW + 'px', height: vpH + 'px',
			left: (cnX * mW - vpW / 2) + 'px',
			top:  (cnY * mH - vpH / 2) + 'px'
		});
	}

	// Injecter le minimap dans le popin (caché par défaut)
	$('#popin').append('<div id="zoom_minimap" style="display:none"><div id="zoom_viewport"></div></div>');

	// Conseil de zoom (mobile uniquement, disparaît après 2,5s)
	if ($(window).width() <= 750) {
		var hint = $('.galery').data('zoom-hint');
		if (hint) {
			$('#popin').append('<div id="zoom_hint">' + $('<span>').text(hint).html() + '</div>');
			setTimeout(function() { $('#zoom_hint').fadeOut(500, function() { $(this).remove(); }); }, 2500);
		}
	}

	var $bigphoto = $('#popin #bigphoto');

	// Adapter la hauteur du minimap au ratio de l'image
	$bigphoto[0].addEventListener('load', function() {
		if (this.naturalWidth && this.naturalHeight) {
			var ar = this.naturalWidth / this.naturalHeight;
			$('#zoom_minimap').css('height', Math.min(Math.round(80 / ar), 70) + 'px');
		}
	});
	if ($bigphoto[0].complete && $bigphoto[0].naturalWidth) {
		var ar = $bigphoto[0].naturalWidth / $bigphoto[0].naturalHeight;
		$('#zoom_minimap').css('height', Math.min(Math.round(80 / ar), 70) + 'px');
	}

	$bigphoto.on('touchstart', function(eT) {
		touchMoved = false;
		var t = eT.originalEvent.touches;
		if (t.length === 2) {
			isPanning = false;
			lastTouchDist = getTouchDist(t);
			eT.preventDefault();
		} else if (t.length === 1 && zoomScale > 1) {
			isPanning = true;
			panStartX = t[0].clientX;
			panStartY = t[0].clientY;
			panStartTx = translateX;
			panStartTy = translateY;
			eT.preventDefault();
		}
	});

	$bigphoto.on('touchmove', function(eT) {
		touchMoved = true;
		var t = eT.originalEvent.touches;
		if (t.length === 2 && lastTouchDist) {
			eT.preventDefault();
			var d = getTouchDist(t);
			zoomScale = Math.min(4, Math.max(1, zoomScale * (d / lastTouchDist)));
			lastTouchDist = d;
			if (zoomScale <= 1) { zoomScale = 1; translateX = 0; translateY = 0; }
			applyTransform($(this));
		} else if (t.length === 1 && isPanning && zoomScale > 1) {
			eT.preventDefault();
			var iW = $(this).width();
			var iH = $(this).height();
			translateX = panStartTx + t[0].clientX - panStartX;
			translateY = panStartTy + t[0].clientY - panStartY;
			var maxTx = iW * (zoomScale - 1) / 2;
			var maxTy = iH * (zoomScale - 1) / 2;
			translateX = Math.max(-maxTx, Math.min(maxTx, translateX));
			translateY = Math.max(-maxTy, Math.min(maxTy, translateY));
			applyTransform($(this));
		}
	});

	$bigphoto.on('touchend', function(eT) {
		var t = eT.originalEvent.touches;
		if (t.length < 2) lastTouchDist = null;
		if (t.length === 0) isPanning = false;
		if (t.length === 0 && !touchMoved && zoomScale <= 1) {
			$('#popin').remove();
			if ($figure.next().length) { $figure.next().trigger('click'); }
		}
	});
}
