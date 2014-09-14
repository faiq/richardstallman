// Yo I am going to use a global variable because I CAN
$('#newQuote').click(function() {
  selectQuote = function() {
  $('#quote').text(quotes[Math.floor(Math.random()*quotes.length)]);
}});
