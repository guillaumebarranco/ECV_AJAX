"use strict";

$(document).ready(function() {

	var userID,
		accessToken;

	$('.fb_connect').on('click', function() {

		var that = $(this);

		FB.getLoginStatus(function(response) {
			// console.log('test', response);

			if(response.status === "not_authorized") {

				FB.login(function(response) {
					// console.log(response.authResponse.accessToken);
				}, {scope: 'user_posts, publish_actions'});

			} else if(response.status === "connected") {
				// console.log(response.authResponse);

				checkUser(response.authResponse);
			}
		});
	});

	function checkUser(user) {
		// console.log(user);

		FB.api(
		    "/"+user.userID,
		    function (response) {
				if (response && !response.error) {
					// console.log(response);

					displayUser(response);
				}
		    }
		);

		userID = user.userID;
		accessToken = user.accessToken;

		// makePost(user.userID, 'test', user.accessToken);
	}

	function displayUser(user) {
		var picture = 'http://graph.facebook.com/'+user.id+'/picture?type=large',
			name = user.name;

		var div =
			`<div>
				<h2>${name}</h2>
				<img src="${picture}" width="200" />
			</div>`
		;

		$('section').append(div);
	}

	function makePost(userId, message, accessToken) {

		$.ajax({
			type: 'POST',
			url: 'https://graph.facebook.com/'+userId+'/feed?message='+message+'&access_token='+accessToken,

			success: function(response) {
				console.log(response);
			},

			error: function(error) {
				console.log('error', error);
			}
		});
	}

	$('form').on('submit', function(e) {
		e.preventDefault();

		console.log(userID);
		console.log($('input').val());
		console.log(accessToken);

		makePost(userID, $('input').val(), accessToken);
	});
});
