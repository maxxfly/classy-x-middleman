$(document).ready()
{

	$('.galery FIGURE').bind('click', function(e)
		{
			$('body').append('<div id="popin"></div>');
			$('#popin').css('height', Math.max($('body').height(), $(window).innerHeight()));

			$('#popin').append('<figure id="content_popin"><img id="bigphoto" src="'+ $(e.currentTarget).find('IMG').attr('src').replace('/thumb/', '/big/') +'"/></figure>');

			$('#content_popin').css('margin-top', $(window).scrollTop() + 10);
			$('#content_popin').prepend('<div id="close"><span class="fa fa-window-close fa-2x"></span></div>');

			if($(e.currentTarget).find('DIV').length)
			{
				$('#content_popin').append('<div class="info_supp">'+ $(e.currentTarget).find('DIV').html() +"<div>");
			}

			$('#content_popin').append($(e.currentTarget).find('FIGCAPTION').clone());

			$('#popin #bigphoto').bind('click', function()
			{
				$('#popin').remove();
				if($(e.currentTarget).next().length)
				{
					$(e.currentTarget).next().trigger('click');
				}
			});

			$('#popin #close').bind('click', function()
				{
					$('#popin').remove();
					//window.location = "#";
				}
			);

			window.location = "#"+ encodeURI($(e.currentTarget).find('IMG').attr('src'));

		}
	);


	if($('.galery').length)
	{
		for(var i=0; i< 50; i++)
		{
			elt = $('.galery FIGURE').eq( Math.floor($('.galery FIGURE').length * Math.random())  );
			$(".galery").prepend(elt);
		}

		if(window.location.hash)
		{
			i = $('IMG[src="'+  decodeURI(window.location.hash.replace("#", "")) +'"]');
			i.parents().trigger('click');

			$(window).load(function(){
				$('#popin').css('height', Math.max($('body').height(), $(window).innerHeight()));
				window.scrollTo(0,0);
			});

		}
	}

	$( window ).on( "load", function() {
		$('.galery').masonry({
		  itemSelector : 'FIGURE'
	  });
	});

}
