const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $newTweet = createTweetElement(tweet);
    $('.tweet-feed').prepend($newTweet);
  }
}

// finds the date difference between now and date the tweet was created at.
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
  $('#error-cont h3').html(msg);
  $('#error-cont').slideDown(200);
};

const composeTweetToggle = () => {
  $('#compose-tweet').on('click', () => {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });
};

const ajaxFunc = (method, data) => {
  if (method === 'GET') {
    return $.ajax({
      url: '/tweets',
      method: 'GET'
    })
  } else if (method === 'POST') {
    return $.ajax({
      data: data,
      url: '/tweets',
      method: 'POST'
    })
  }
};

const loadTweets = () => {
  ajaxFunc('GET').then(data => renderTweets(data));
};

const postTweet = data => {
  const $tweet = createTweetElement(data[data.length - 1]);
  $('#error-cont').slideUp(200);
  $('.tweet-feed').prepend($tweet);
  $('#tweet-text').val('');
  $('.counter').val(140);
};

$(document).ready(function() {
  $('#error-cont').hide();
  
  loadTweets();
  composeTweetToggle();

  $('#test').on('submit', event => {
    event.preventDefault();

    const tweetContentLength = $('#tweet-text').val().length;
    if (tweetContentLength < 1) return errorMsg('You can\'t post an empty tweet!');
    if (tweetContentLength > 140) return errorMsg('You have exceeded the character limit!');
    
    const serializedStr = $('#test').serialize();
    ajaxFunc('POST', serializedStr)
      .then(() => ajaxFunc('GET'))
      .then(data => postTweet(data))
    });
  });