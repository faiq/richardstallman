// Yo I am going to use a global variable because I CAN
$('#newQuote').click(function() {
    console.log("FJFJFJF");
    $.getJSON("/gettweet", function(data){
      console.log("FFFFFFF");
      console.log(data);
      $('#quote').text(data);
      $('#tweet').val(data);
    });
});
