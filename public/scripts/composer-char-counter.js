$(document).ready(() => {
  $('#tweet-text').on('keyup', function() {
    let textLength = $(this).val().length;
    let counterElem = $(this).next().find('output');
    let counterValue = 140 - textLength;
    counterElem.html(counterValue);
    if (counterValue < 0) {
      counterElem.addClass('toggleRed');
    } else {
      counterElem.removeClass('toggleRed');
    }
  });
});