$(document).ready(() => {
  $('#tweet-text').on('keyup', function() {
    const textLength = $(this).val().length;
    const counterElem = $(this).next().find('output');
    const counterValue = 140 - textLength;
    counterElem.html(counterValue);
    if (counterValue < 0) {
      counterElem.addClass('toggleRed');
    } else {
      counterElem.removeClass('toggleRed');
    }
  });
});