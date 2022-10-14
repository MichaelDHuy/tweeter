/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){

  const loadTweets = function() {
  $.ajax({
    method: GET,
    url: '/tweets',  
  }).then ((response) => {
    console.log("Response is " + response);
    renderTweets(response);
    $('#tweet-text').val("");
    $(".counter").text(140);
  })
};
loadTweets();

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
 };

const createTweetElement = function(tweet) {
  let date = timeago.format(tweet.create_at);
  let $tweet = $(
    `<article class="tweet-header wrapper">
          <header>
                <img class="left" id="pic" src="${tweet.user.avatars}">
                <h1 class="left">${tweet.user.name}</h1>
              <h5 class="right">${tweet.user.handle}</h5>
            </header>
            <p class="message">${tweet.content.text}</p>
            <footer class="tweet-footer">
              <div>
                <p class="left"> ${date}</p>
              </div>
              <div>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-flag"></i>
              </div>
            </footer>
          </article> `)
  
  return $tweet;
}

const renderTweets = function(tweets) {
  $("#tweets").empty();
  console.log($('.tweets-container'));
  for (let tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

const $newTweet = $('#tweet-form');
$newTweet.on('sumit', function(event) {
  event.preventDefault();
  const tweet = ("#tweet-text").val().length;
  console.log(tweet);
  if(!tweet) {
    $('#errorMessage').show();
    $('#errorMessage').text("Tweet cannot empty!")
  }
  if (tweet > 140) {
    $('#errorMessage').show();
    $('#errorMessage').text("Tweet can't be longer than 140 characters!");
  } else {
    const valTweet = $(this).serialize();
    $.ajax("/tweets", {
      method: "POST",
      data: valTweet
    })
    .then (()=> {
      $('#errorMessage').hide();
      loadTweets();
      ("#tweet-text").val("");
    })
  }
})
});
