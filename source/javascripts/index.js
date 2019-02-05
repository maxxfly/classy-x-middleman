var setIntervalCarousel;
var setIntervalParagraphe;
var position_paragraphe = 0;

$(function() {
  animate_paragraphe();
  animate_carousel();

  $('.ia-container').bind('screen.orientationclick touch', function() {
    $('FIGURE').addClass('disabled');
    $('.fa-chevron-left').addClass('hidden');
    $('.fa-chevron-right').addClass('hidden');

    $('.ia-container INPUT:checked').parent().removeClass('disabled');

    $('.ia-container INPUT:checked').parent().siblings(".fa-chevron-left").removeClass('hidden');
    $('.ia-container INPUT:checked').siblings("FIGURE").children(".fa-chevron-right").removeClass('hidden');

    clearInterval(setIntervalCarousel);
  });

  $('.navigation').bind('click touch', function() {
    $(this).siblings("INPUT").trigger("click");
  });
});


function animate_carousel()
{
  setIntervalCarousel = setInterval(function() {
    $('FIGURE').addClass('disabled');
    $('.fa-chevron-left').addClass('hidden');
    $('.fa-chevron-right').addClass('hidden');

    if($('.ia-container INPUT:checked ~ FIGURE > INPUT').length > 0) {
      $('.ia-container INPUT:checked ~ FIGURE').removeClass('disabled');
      $('.ia-container INPUT:checked ~ .fa-chevron-left').removeClass('hidden');

      $('.ia-container INPUT:checked ~ FIGURE > INPUT').prop( "checked", true );

      $('.ia-container INPUT:checked ~ FIGURE > .fa-chevron-right').removeClass('hidden');
    }
  }, 8000);
}

function animate_paragraphe()
{
  $('.paragraphe').eq(0).addClass('displayed');

  setIntervalParagraphe = setInterval(function() {
    change_paragraphe();
  }, 8000);
}

function replay()
{
  $('.paragraphe A').hide();
  position_paragraphe = 0;
  $("#carousel").css('margin-left', '0px');

  clearInterval(setIntervalParagraphe);

  setIntervalParagraphe = setInterval(function() {
    change_paragraphe();
  }, 8000);
}

function change_paragraphe()
{
  if(position_paragraphe == 2)
  {
    $('.paragraphe A').show();
  }
  else
  {
    position_paragraphe = position_paragraphe += 1;
    $('.paragraphe').eq(position_paragraphe).addClass('displayed');
    $("#carousel").css('margin-left', (-1 * ($('.paragraphe').width()) *position_paragraphe) +'px');
  }
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}
