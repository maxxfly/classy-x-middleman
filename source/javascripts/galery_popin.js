/**
 * galery_popin.js
 * Gestion du popin de la galerie : ouverture, fermeture, navigation entre photos,
 * mélange aléatoire et ancrage par hash URL.
 * Dépend de : jquery, jquery.masonry, galery_zoom.js
 */
$(document).ready()
{

	$('.galery FIGURE').bind('click', function(e)
		{
			var $figure = $(e.currentTarget);
			var imgSrc = $figure.find('IMG').attr('src').replace('/thumb/', '/big/');

			$('body').append('<div id="popin"></div>');

			// Toolbar : précédent, suivant, fermer
			$('#popin').append(
				'<div id="popin_toolbar">' +
					'<span id="prev_photo" class="toolbar_btn"><span class="fa fa-chevron-left fa-2x"></span></span>' +
					'<span id="next_photo" class="toolbar_btn"><span class="fa fa-chevron-right fa-2x"></span></span>' +
					'<span id="close" class="toolbar_btn"><span class="fa fa-times fa-2x"></span></span>' +
				'</div>'
			);

			if (!$figure.prev().length) { $('#prev_photo').addClass('disabled'); }
			if (!$figure.next().length) { $('#next_photo').addClass('disabled'); }

			// Corps : photo + légende
			$('#popin').append('<div id="popin_body"><img id="bigphoto" src="' + imgSrc + '"/></div>');

			if ($figure.find('DIV').length) {
				$('#popin_body').append('<div class="info_supp">' + $figure.find('DIV').html() + '</div>');
			}
			$('#popin_body').append($figure.find('FIGCAPTION').clone());

			// Navigation
			$('#prev_photo').on('click', function() {
				if ($figure.prev().length) {
					$('#popin').remove();
					$figure.prev().trigger('click');
				}
			});

			$('#next_photo').on('click', function() {
				if ($figure.next().length) {
					$('#popin').remove();
					$figure.next().trigger('click');
				}
			});

			$('#close').on('click', function() {
				$('#popin').remove();
			});

			// Desktop : clic sur la photo = photo suivante
			$('#bigphoto').on('click', function() {
				if ($(window).width() > 750 && $figure.next().length) {
					$('#popin').remove();
					$figure.next().trigger('click');
				}
			});

			// Zoom + pan + minimap (mobile)
			initGaleryZoom($figure);

			window.location = '#' + encodeURI($figure.find('IMG').attr('src'));
		}
	);


	if ($('.galery').length)
	{
		for (var i = 0; i < 50; i++)
		{
			elt = $('.galery FIGURE').eq(Math.floor($('.galery FIGURE').length * Math.random()));
			$('.galery').prepend(elt);
		}

		if (window.location.hash)
		{
			i = $('IMG[src="' + decodeURI(window.location.hash.replace('#', '')) + '"]');
			i.parents().trigger('click');

			$(window).load(function() {
				window.scrollTo(0, 0);
			});
		}
	}

	$(window).on('load', function() {
		$('.galery').masonry({
			itemSelector: 'FIGURE'
		});
	});

}

