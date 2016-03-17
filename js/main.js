"use strict";

$(document).ready(function() {

	var queries = [];

	if(typeof sessionStorage.getItem("queries") !== "undefined" && sessionStorage.getItem("queries") !== null) {
		queries = JSON.parse(sessionStorage.getItem("queries"));
		initQueries(queries);
	}

	console.log(queries);

	$('form').on('submit', function(e) {
		e.preventDefault();

		var movie = $('input').val().toLowerCase();
		callAPI('http://www.vodkaster.com/api/search?q='+movie, 'GET');
	});

	$(document).on('click', 'footer li img', function() {
		// searchById($(this).parents('li').attr('data-id'));

		var movie = [];
		movie.original_title = $(this).parents('li').find('.name').text();
		movie.picture = $(this).parents('li').find('.picture img').attr('src');
		movie.synopsis = $(this).parents('li').find('p').text();

		displayMovie(movie);

	});

	function callAPI(url, method) {

		$.ajax({
			method: method,
			url: 'api.php?url='+url,

			success: function(response) {
				var movie = JSON.parse(response);

				displayResponse(movie);
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	function searchById(id) {
		callAPI("http://www.vodkaster.com/api/film/show?id="+id);
	}

	function displayResponse(movie) {

		console.log(movie.data);

		if(typeof movie.data[0] !== 'undefined') {

			movie.data[0].picture = movie.data[0].media_urls.poster.scale_240x320;
			displayMovie(movie.data[0]);

			displayFooterResponse(movie);

		} else {
			movie.data.picture = movie.data.media_urls.poster.scale_240x320;
			displayMovie(movie.data);
			$('footer ul').empty();
		}
	}

	function displayMovie(movie_datas) {
		$('section h2').empty().append(movie_datas.original_title);
		$('section img').attr('src', movie_datas.picture);
		$('section p').empty().append(movie_datas.synopsis);

		pushQuery(movie_datas);
	}

	function pushQuery(movie_datas) {
		queries.push(movie_datas.picture);
		sessionStorage.setItem("queries", JSON.stringify(queries));

		var picture = movie_datas.picture;

		$('.queries').prepend(`<li><img src="${picture}" width="50"></li>`);
	}

	function displayFooterResponse(movie) {

		for (var i = 1; i < movie.data.length; i++) {

			var name = movie.data[i].original_title;
			var description = movie.data[i].synopsis;

			var picture = (typeof movie.data[i].media_urls.poster !== "undefined") ? movie.data[i].media_urls.poster.scale_240x320: '';
			var id = movie.data[i].id;

			if(typeof name !== 'undefined') {

				var li =
					`<li data-id="${id}">
						<div class="name">${name}</div>
						<div class="picture"><img src="${picture}" width="50"></div>
						<p style="display:none;">${description}</p>
					</li>`
				;

				$('footer ul').append(li);
			}
		}
	}

	function initQueries(queries) {

		if(typeof queries[0] !== 'undefined') {

			for (var i = 0; i < queries.length; i++) {
				var picture = queries[i];
				$('.queries').prepend(`<li><img src="${picture}" width="50"></li>`)
			}
		}
	}
});
