$(document).ready(() => {
  $('.new-tweet textarea').on('keyup', () => {
    console.log(this);
  });
});