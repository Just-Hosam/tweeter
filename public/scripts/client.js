const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    console.log('test');
    const $newTweet = createTweetElement(tweet);
    $('.tweet-feed').append($newTweet);
  }
}

// finds the date difference for the tweets
const findDate = date => {
  const nowDate = new Date();
  const dateDiff = nowDate - date;
  let convertedDate = Math.floor(dateDiff / (60 * 60 * 24 * 1000));
  if (convertedDate < 1) {
    convertedDate = 'Today'
  } else if (convertedDate >= 365) {
    convertedDate = Math.floor(convertedDate / 365);
    convertedDate > 1 ? convertedDate += ' Years ago' : convertedDate += ' Year ago';
  } else {
    convertedDate > 1 ? convertedDate += ' Days ago' : convertedDate += ' Day ago';
  }
  return convertedDate;
}

const createTweetElement = function(tweet) {
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
  <p>${tweet.content.text}</p>
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

$(document).ready(function() {
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(data => {
      const sortedData = data.sort((a, b) => {
        return b.created_at - a.created_at;
      });
      renderTweets(sortedData);
    })
  };

  $('#test').on('submit', function(event) {
    event.preventDefault();
    const str = $('#test').serialize();
    $.ajax({
      data: str,
      url: '/tweets',
      method: 'POST'
    }).then(data => console.log('Good POST'));
  });

  loadTweets();
});