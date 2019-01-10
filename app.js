 //create topics array
 var topics = ["Biggie Smalls", "Snoop Dog", "Phife Dawg", "Busta Rhymes", "Drake"];

 
 //function loops through topics array, creates button, and appends to page
 function renderButtons() {
     $("#button-display").empty();
     
     for (var i = 0; i < topics.length; i++) {
         var btn = $("<button>");
         btn.addClass("rapper-btn");
         btn.addClass("btn btn-primary");
         btn.attr("data-name", topics[i]);
         btn.text(topics[i]);
         $("#button-display").append(btn);
     }
 };

 function displayGifs() {
     //event listener for buttons appended to html
     $("button").on("click", function () {

        //create variable to include inside url query- this refers to button that was clicked
        var person = $(this).attr("data-name");

        //construct url to search Giphy for gifs related to topics
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=HRHgIG4zqFVU91tc8vZifNXXdYGAobgR&limit=10";

        //perform ajax GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            //after data comes back from the API
            .then(function (response) {
                $("#gif-display").empty(); //emptys gifs from previous gif button click
                
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    var animatedGif = results[i].images.fixed_height.url;
                    var staticGif = results[i].images.fixed_height_still.url;
                    personImage.attr("src", staticGif);
                    personImage.attr("data-state", "still");
                    personImage.attr("data-still", staticGif);
                    personImage.attr("data-animate", animatedGif);
                    personImage.addClass("gif");
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#gif-display").prepend(gifDiv)
                }

           

            });
    });
 };

 //function to change gif image source to animated or static
 function changeGifState() {
     var state = $(this).attr("data-state");
     if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  
     };
 };





 //execute
 $(document).ready(function () {

    $("#add-rapper").on("click", function(event){
        event.preventDefault();
        
        var rapper = $("#rapper-input").val().trim();
        
        var rapperCapitalized = rapper.charAt(0).toUpperCase() + rapper.slice(1); 
        
        topics.push(rapperCapitalized);

        $("#rapper-input").val("");
        
        renderButtons();

        console.log(topics);
    });
    
    $(document).on("click", ".rapper-btn", displayGifs);
    
    renderButtons();

    $(document).on("click", ".gif", changeGifState);
   
 });