$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('keyup', function() {
    let tweetCounter = $(this).val().length;
    // let countedTweet = $("output").text(140 - tweetCounter);
    // let $tc = $(this).parent().find('.counter');
    let characterLeft = 0;
    let maxAllowedChar = 140;
    characterLeft = maxAllowedChar - tweetCounter;
    $(".counter").html(characterLeft);
    $(".counter").css("color", "red");
    console.log("tc test", $(this).parent());
    if(characterLeft >= 0) {
      // $tc.removeClass('error');
      $(".counter").css("color", "#545149");
    }
    if(countedTweet < 0){
      $(".counter").css("color", "red");
      // $tc.css('color', 'red');
      // $tc.addClass('error');
    };
  })
})