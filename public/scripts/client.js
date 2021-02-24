const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "This is a test"
    },
    "created_at": 1614016490370
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1514102890370
  }
]

// sorts tweet data based on created_at value
const sortedData = tweetData.sort((a, b) => {
  return b.created_at - a.created_at;
});

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
  if (convertedDate >= 365) {
    convertedDate = Math.floor(convertedDate / 365);
    convertedDate > 1 ? convertedDate += ' Years' : convertedDate += ' Year';
  } else {
    convertedDate > 1 ? convertedDate += ' Days' : convertedDate += ' Day';
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
        <p>${dateDiff} ago</p>
        <div class="icons">
          <span>&#10084</span>
          <span>&#8617</span>
          <span>&#9873</span>
        </div>
      </footer>
    </article>`;
}

$(document).ready(function() {
  renderTweets(sortedData);
});