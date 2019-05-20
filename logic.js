// var lastFmApiKey = "6a39f3465b8cc8531c8558573311b265";

function searchArtists(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=8ce559d2fd9f4e234a3ac172db2d0ef6&format=json";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);
      console.log("Artist name: " + response.artist.name);
      console.log("Bio: " + response.artist.bio);
      console.log("Artist Image: " + response.artist.image[0]);

      // Constructing HTML containing the artist information
      var artistName = $("<h1>").text(response.artist.name);
      var artistURL = $("<a>").attr("href", response.artist.url).append(artistName);
      var artistImage = $("<img>").attr("src", response.artist.image[2]["#text"], "align", "right");
      var Bio = $("<p>").text(response.artist.bio.summary.substring(response.artist.bio.summary[0],response.artist.bio.summary.indexOf("<a")));
        
        $("#artist-div").empty();
        $("#similarArtist-div").empty();

       for ( var i = 0; i < 3; i++) {
        var similarArtists = $("<h3>").text(response.artist.similar.artist[i].name);
        var similarArtistsURL = $("<a>").attr("href", response.artist.similar.artist[i].url).append(similarArtists);

        console.log("similar artist link: " + response.artist.similar.artist[i].url);


      
      $("#artist-div").append(artistURL, artistImage, Bio);
      $("#similarArtist-div").append(similarArtistsURL);
      artistImage.css("float", "left");
      artistImage.css("margin-right", "10px");
      }
      
      
    });
  }

  // "https://rest.bandsintown.com/artists/" + artist + "?app_id=playtapus";

  function searchUpcomingEvents(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=playtapus";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
      
      var upcomingEvents = $("<p>").text(response.upcoming_event_count + " upcoming events");
      var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

      // Empty the contents of the artist-div, append the new artist content
      $("#upcomingEventsDiv").empty();
      $("#upcomingEventsDiv").append(upcomingEvents, goToArtist);
    });

  }


  function searchAlbums(artist) {

   
    var queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=8ce559d2fd9f4e234a3ac172db2d0ef6&format=json";


     $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);
      console.log("Album name: " + response.topalbums.album[0].name);
      console.log("Album image: " + response.topalbums.album[0].image[1]["#text"]);
      

         $("#albumDiv1").empty();
         $("#albumDiv2").empty();
         $("#albumDiv3").empty();


        var artistAlbum1 = $("<h4>").text(response.topalbums.album[0].name);
        var albumImage1 = $("<img>").attr("src", response.topalbums.album[0].image[2]["#text"]);
        var albumURL1 = $("<a>").attr("href", response.topalbums.album[0].url).append(albumImage1);

        var artistAlbum2 = $("<h4>").text(response.topalbums.album[1].name);
        var albumImage2 = $("<img>").attr("src", response.topalbums.album[1].image[2]["#text"]);
        var albumURL2 = $("<a>").attr("href", response.topalbums.album[1].url).append(albumImage2);

        var artistAlbum3 = $("<h4>").text(response.topalbums.album[2].name);
        var albumImage3 = $("<img>").attr("src", response.topalbums.album[2].image[2]["#text"]);
        var albumURL3 = $("<a>").attr("href", response.topalbums.album[2].url).append(albumImage3);

        


      $("#albumDiv1").append(artistAlbum1, albumURL1);
      $("#albumDiv2").append(artistAlbum2, albumURL2);
      $("#albumDiv3").append(artistAlbum3, albumURL3);
      

      });
  }


function streamingAccounts(artist) {

    //Querying the MusicGraph api for the selected artist
    var queryURL = "https://api.musicgraph.com/api/v2/artist/suggest?api_key=f195226f9a12a0b87eb1809dfa181da1&prefix=" + artist;

    return $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(artist) {

        console.log(artist);

        // Receiving the musicgraph id
          musicgraphID = (artist.data[0].id);
          console.log(musicgraphID);
          return(musicgraphID);
        });
  }


function SocialAccounts(musicgraphID) {

  // make URL for recieving social_url's
        var social ="https://api.musicgraph.com/api/v2/artist/"+ musicgraphID +"/social-urls?api_key=f195226f9a12a0b87eb1809dfa181da1";
        console.log(social);

        $.ajax({
          url: social,
          method: "GET"
        }).done(function(musicgraphID) {

          var twitter = musicgraphID.data.twitter_url[0];
          var facebook = musicgraphID.data.facebook_url;
          var instagram = musicgraphID.data.instagram_url[0];
          var socials = [twitter,facebook,instagram];

          $("#socialInfoDiv").empty();
              var twitterLinks = $("<h3>").text("Twitter");
              var facebookLinks = $("<h3>").text("Facebook");
              var instagramLinks = $("<h3>").text("Instagram");
              var socialsURL1 = $("<a>").attr("href", socials[0]).append(twitterLinks);
              var socialsURL2 = $("<a>").attr("href", socials[1]).append(facebookLinks);
              var socialsURL3 = $("<a>").attr("href", socials[2]).append(instagramLinks);


              $("#socialInfoDiv").append(socialsURL1, socialsURL2, socialsURL3);


      });
  }



  $(".navbar-brand").on("click", function(event) {
    $("#artistCarousel").show();
    $("#bioDiv").hide();
    $("#similarDiv").hide();
    $("#albums").hide();
    $("#eventsDiv").hide();
    $("#socialDiv").hide();
  })



  // Event handler for user clicking the select-artist button
  $(".select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    $("#artistCarousel").hide();
    $("#bioDiv").show();
    $("#similarDiv").show();
    $("#albums").show();
    $("#eventsDiv").show();
    $("#socialDiv").show();
    // Storing the artist name
    var artist = $(".artist-input").val().trim();

    // Running the searchArtists function (passing in the artist as an argument)
    searchArtists(artist);
    searchUpcomingEvents(artist);

    searchAlbums(artist);

    streamingAccounts(artist);
     streamingAccounts(artist).done(function(){
        SocialAccounts(musicgraphID);
      });

  });
