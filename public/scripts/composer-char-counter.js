let num = 100
$(document).ready(() => {
  $('#tweet-text').on('keyup', (event) => {
    let textLength = $(event.target).val().length;
    let counterElem = $(event.target).next().find('output');
    let counterValue = 140 - textLength;
    counterElem.html(counterValue);
    if (counterValue < 0) {
      counterElem.addClass('toggleRed');
    } else {
      counterElem.removeClass('toggleRed');
    }
  });
});