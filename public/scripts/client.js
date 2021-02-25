const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('.tweet-feed').prepend($newTweet);
  }
}

// finds the date difference for the tweets
const findDate = date => {
  const nowDate = new Date();
  const dateDiff = nowDate - date;
  let convertedDate = Math.floor(dateDiff / (60 * 60 * 24 * 1000));
  if (convertedDate < 1) {
    convertedDate = 'Today';
  } else if (convertedDate >= 365) {
    convertedDate = Math.floor(convertedDate / 365);
    convertedDate > 1 ? convertedDate += ' Years ago' : convertedDate += ' Year ago';
  } else {
    convertedDate > 1 ? convertedDate += ' Days ago' : convertedDate += ' Day ago';
  }
  return convertedDate;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
  const newstr = escape(tweet.content.text);
  return `
  <article class="tweet-container">
    <header>
      <div>
        <img src=${tweet.user.avatars}>
        <p class="user-name">${tweet.user.name}</p>
      </div>
      <p class="user-ID">${tweet.user.handle}</p>
    </header>
    <div class="tweet-content">
      <p>${newstr}</p>
    </div>
    <footer>
      <p>${findDate(tweet.created_at)}</p>
      <div class="icons">
        <span>&#10084</span>
        <span>&#8617</span>
        <span>&#9873</span>
      </div>
    </footer>
  </article>`;
}

const errorMsg = msg => {
  $('#error-cont').removeClass('hideElem');
  $('#error-cont h3').html(msg);
};

const composeTweetToggle = () => {
  $('#compose-tweet').on('click', () => {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });
}

$(document).ready(function() {
  $('#error-cont').hide();
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(data => {
      renderTweets(data);
    })
  };
  // hash maps for sorting (!!!!)
  composeTweetToggle();

  $('#test').on('submit', function(event) {
    event.preventDefault();
    const tweetContent = $('#tweet-text').val().length;
    const str = $('#test').serialize();
    if (tweetContent < 1) {
      $('#error-cont h3').html('You can\'t post an empty tweet!');
      $('#error-cont').slideDown('slow');
      return;
    }
    if (tweetContent > 140) {
      $('#error-cont h3').html('You have exceeded the character limit!');
      $('#error-cont').slideDown('slow');
      return;
    }
    $('#error-cont').slideUp();
    
    $.ajax({
      data: str,
      url: '/tweets',
      method: 'POST'
    }).then(() => {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      }).then(data => {
        const $tweet = createTweetElement(data[data.length - 1]);
        $('.tweet-feed').prepend($tweet);
        $('#tweet-text').val('');
        $('.counter').val(140);
      })
    });
  });
  // introduce func that can return a GET ajax or POST ajax based on given parameter
  // const testGET = function() {
  //   $.ajax({
  //     url: '/tweets',
  //     method: 'GET'
  //   })
  // }
  loadTweets();
});

