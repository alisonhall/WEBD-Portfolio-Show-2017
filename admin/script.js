// Initialize Firebase
var config = {
	apiKey: "AIzaSyANKO5LqddgASdkSG2WzcPXLPQ41AkewPo",
	authDomain: "webd-portfolio-show-2017.firebaseapp.com",
	databaseURL: "https://webd-portfolio-show-2017.firebaseio.com",
	storageBucket: "webd-portfolio-show-2017.appspot.com",
	messagingSenderId: "888183054325"
};
firebase.initializeApp(config);

var adminUser = 'WLvS4vczBzTdcON21xt2Qet8TVd2';
var user = '';


var mapDataNames = [
	// [ HTML admin form element ID name, Firebase key name ]
	['first-name', 'firstName'],
	['last-name', 'lastName'],
	['photo-URL', 'photoURL'],
	['thumbnail-photo-URL', 'thumbnailPhotoURL'],
	['introduction', 'introduction'],
	['skill-set', 'skillSet'],
	['portfolio-link', 'portfolioLink'],
	['social-media-1', 'socialMedia1'],
	['social-media-2', 'socialMedia2'],
	['social-media-3', 'socialMedia3'],
	['linkedin', 'linkedin'],
	['github', 'github'],
	['dribbble', 'dribbble'],
	['instagram', 'instagram'],
	['behance', 'behance'],
	['twitter', 'twitter'],
	['codepen', 'codepen'],
	['facebook', 'facebook']
];

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// [START signout]
		firebase.auth().signOut();
		// [END signout]
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		if (email.length < 4) {
			alert('Please enter your email address.');
			return;
		}
		if (password.length < 2) {
			alert('Please enter your password.');
			return;
		}
		// Sign in with email and pass.
		// [START authwithemail]
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			document.getElementById('sign-in').disabled = false;
		});
		// [END authwithemail]

	}
}

function sendPasswordReset() {
	var email = document.getElementById('email').value;
	// [START sendpasswordemail]
	firebase.auth().sendPasswordResetEmail(email).then(function() {
		// Password Reset Email Sent!
		alert('Password Reset Email Sent!');
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/invalid-email') {
			alert(errorMessage);
		} else if (errorCode == 'auth/user-not-found') {
			alert(errorMessage);
		}
		console.log(error);
	});
	// [END sendpasswordemail];
}

function displayUserData(snapshot) {
	document.getElementById('user-details-container').style.display = 'block';
	if(snapshot.val() !== null) {
		for (var i = 0; i < mapDataNames.length; i++) {
			var elementName = mapDataNames[i][0];
			var firebaseName = mapDataNames[i][1];
			var data = snapshot.val()[firebaseName];
			if(data !== undefined) {
				document.getElementById(elementName).value = data;
			} else {
				document.getElementById(elementName).value = "";
			}
		}
		var photoVal = document.getElementById('photo-URL').value;
		var thumbPhotoVal = document.getElementById('thumbnail-photo-URL').value;
		if(photoVal == ' ' || photoVal == '' || photoVal == undefined || photoVal == null) {
			console.log("empty image");
			document.getElementById('photo').src = '../images/placeholder.png';
		} else {
			console.log("non empty image", photoVal);
			console.log(document.getElementById('photo'));
			console.log(document.getElementById('photo').src);
			document.getElementById('photo').src = '../images/' + photoVal;
			console.log(document.getElementById('photo'));
		}

		if(thumbPhotoVal == ' ' || thumbPhotoVal == '' || thumbPhotoVal == undefined || thumbPhotoVal == null) {
			console.log("empty image");
			document.getElementById('thumbnail-photo').src = '../images/placeholder.png';
		} else {
			console.log("non empty image", thumbPhotoVal);
			document.getElementById('thumbnail-photo').src = '../images/' + thumbPhotoVal;
		}
	}
}

function retrieveCurrentUserData(userId) {
	firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
		console.log(snapshot.val());
		document.getElementById('loading').style.display = 'none';
		document.getElementById('account-details').style.display = 'block';

		displayUserData(snapshot);
	});
}

function getUserData() {
	console.log("getUserData");
	// Create references
	var currentUserId = firebase.auth().currentUser.uid;
	user = currentUserId;

	if(currentUserId == adminUser){
		console.log("Admin");
		document.getElementById('photo-URL').disabled = false;
		document.getElementById('thumbnail-photo-URL').disabled = false;
		firebase.database().ref('/users/').on('value', function(snapshot) {
			var data = snapshot.val();
			var userKeys = Object.keys(data);
			document.getElementById('users-list').innerHTML = '';

			// document.getElementById('users-list').
			for (var i = 0; i < userKeys.length; i++) {
				var userData = data[userKeys[i]];
				console.log(userKeys[i], userData);
				var button = document.createElement('button');
				button.innerHTML = userData.firstName + ' ' + userData.lastName;
				button.className = 'userName';
				button.value = userKeys[i];
				document.getElementById('users-list').append(button);
			}

			var allUsers = document.getElementsByClassName('userName');
			for (var i = 0; i < allUsers.length; i++) {
				allUsers[i].addEventListener('click', function() {
					user = this.value;
					var prevUser = document.getElementsByClassName('selectedUser')[0];
					if(prevUser) {
						prevUser.classList.remove('selectedUser');
					}
					this.className += ' selectedUser';
					console.log(user + " button clicked");
					removeData();
					retrieveCurrentUserData(user);
				}, false);
			}
		});
	} else {
		console.log("regular user");
		document.getElementById('photo-URL').disabled = true;
		document.getElementById('thumbnail-photo-URL').disabled = true;
		retrieveCurrentUserData(currentUserId);
	}
}

function saveCurrentUserData(user, snapshot) {
	if(snapshot.val() !== null) {
		var userData = {};
		for (var i = 0; i < mapDataNames.length; i++) {
			var elementName = mapDataNames[i][0];
			var firebaseName = mapDataNames[i][1];
			var data = document.getElementById(elementName).value;
			if(data !== undefined) {
				userData[firebaseName] = data;
			}
		}
		var updates = {};
		updates['/users/' + user] = userData;

		return firebase.database().ref().update(updates);
	}
}

function saveUserData() {
	console.log("saveUserData");

	var currentUserId = firebase.auth().currentUser.uid;

	if(currentUserId == adminUser) {
		console.log("Admin");
		firebase.database().ref('/users/' + user).on('value', function(snapshot) {
			var data = snapshot.val();
			
			saveCurrentUserData(user, snapshot);
		});
	} else {
		console.log("regular user");
		firebase.database().ref('/users/' + currentUserId).on('value', function(snapshot) {
			console.log(snapshot.val());
			
			saveCurrentUserData(currentUserId, snapshot);
		});
	}
}

function removeData() {
	for (var i = 0; i < mapDataNames.length; i++) {
		var elementName = mapDataNames[i][0];
		document.getElementById(elementName).value = null;
	}
}

function resetData() {
	removeData();
	getUserData();
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
	// Listening for auth state changes.
	// [START authstatelistener]
	console.log("initApp");

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;

			document.getElementById('sign-in-container').style.display = 'none';
			document.getElementById('signed-in-container').style.display = 'block';
			if(uid == adminUser) {
				document.getElementById('users-list').style.display = 'block';
				document.getElementById('user-details-container').style.display = 'none';
			}
			
			document.getElementById('loading').style.display = 'none';
			document.getElementById('account-details').style.display = 'block';

			document.getElementById('current-user').textContent = email;

			getUserData();

			

		} else {
			// User is signed out.

			document.getElementById('sign-in-container').style.display = 'block';
			document.getElementById('signed-in-container').style.display = 'none';
			document.getElementById('users-list').style.display = 'none';
			document.getElementById('user-details-container').style.display = 'none';
			document.getElementById('loading').style.display = 'block';
			document.getElementById('account-details').style.display = 'none';

			removeData();

			
		}
	});
	// [END authstatelistener]

	document.getElementById('sign-out').addEventListener('click', toggleSignIn, false);
	document.getElementById('save-data').addEventListener('click', function(){
		saveUserData();
	}, false);
	document.getElementById('cancel').addEventListener('click', resetData, false);

	document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
	document.getElementById('password-reset1').addEventListener('click', sendPasswordReset, false);
	document.getElementById('password-reset2').addEventListener('click', sendPasswordReset, false);

}

window.onload = function() {
	initApp();
};
