var topics = ['dog', 'cat', 'rabbit', 'hamster', 'sunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla',
							'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat', 'chicken', 'capybara', 'serval', 'salamander', 'frog'];

$( document ).ready(function(){

	renderButtons();

	$(document).on('click', '.animal_button', displayAnimalGif);
	$(document).on('click', '.gif_container', showGifHideImage);

	function renderButtons(){

		$('#animal_buttons').empty();


		for (var i = 0; i < topics.length; i++){

		    var animalBtm = $('<button>')
		    animalBtm.addClass('animal_button');
		    animalBtm.attr('data-name', topics[i]);
		    animalBtm.text(topics[i]);
		    $('#animal_buttons').append(animalBtm);
		}
	}

	$('#add_animal').on('click', function(){

		var newAnimal = $('#animal_input').val().trim().toLowerCase();

		var isUnique = true;
		for(var i = 0; i < topics.length; i++){
			if(topics[i] == newAnimal){
				isUnique = false;
			}
		}

		if(newAnimal == ""){
			alert("Nope, need to type a name of the animal you want to add")
		}
		else if(isUnique){

			topics.push(newAnimal);
			renderButtons();
		}
		else{
			alert("Nope, animal already has a " + newAnimal + " button!")
		}
		return false;
	})

	function displayAnimalGif(){

		$('#animal_images').empty();

		//elegante aqui...
		var animal = $(this).attr('data-name').replace(/ /g, '+');
		var myKey = "B4n6UGmZ13i0P9kuKFa1IyxQCsFPMTKM";
		var limit = "10";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + limit + "&api_key=" + myKey;

		$.ajax({url: queryURL, method: 'GET'}).done(function(response){

			for(var i = 0; i < response.data.length; i++){

				var currentStillURL = response.data[i].images.fixed_height_still.url;
				var currentMovingURL = response.data[i].images.fixed_height.url;

				var rating = response.data[i].rating;

					if(rating == ""){
						rating = "none";
					}

				var gifDiv = $('<div>');
				gifDiv.addClass('gif_container');
				gifDiv.attr('data-name', "unclicked");

				var gifRating = $('<h1>');
				gifRating.text("Rating: " + rating);
				gifDiv.append(gifRating);

				var gifImage = $('<img>');
				gifImage.addClass('still_gif');
				gifImage.attr("src", currentStillURL);
				gifDiv.append(gifImage);

				var currentGif = $('<img>')
				currentGif.addClass('moving_gif');
				currentGif.attr("src", currentMovingURL);
				currentGif.hide();
				gifDiv.append(currentGif);

			  $('#animal_images').append(gifDiv);
			}
		});
	}


	function showGifHideImage(){

		var clickedOrNotClicked = $(this).attr('data-name');

		if(clickedOrNotClicked == "unclicked"){

			var gifChildren = $(this).children();

			$(gifChildren[1]).hide();
			$(gifChildren[2]).show();

			$(this).attr('data-name', "clicked");
		}
		else{

			var gifChildren = $(this).children();

			$(gifChildren[2]).hide();
			$(gifChildren[1]).show();

			$(this).attr('data-name', "unclicked");
		}
	}
});
