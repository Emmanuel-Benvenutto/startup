var apiKey = 'AIzaSyBRJDIQsMyS9AfUQTJfQDmuVhcaD35usH0';
var clientId = '796378537555-ei60v0j7dg0jkahisaherjlvq28jgff1.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/youtube';
var auth2;
var authorizeButton = document.getElementById('authorize-button');
var login = document.getElementById('login');
var signoutButton = document.getElementById('signout-button');

function handleClientLoad(){
    gapi.load('client:auth2', initAuth);
}

function initAuth(){
    gapi.client.setApiKey(apiKey);
    gapi.auth2.init({
        client_id: clientId,
        scope: scopes
    }).then(function () {

            auth2 = gapi.auth2.getAuthInstance();
            auth2.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(auth2.isSignedIn.get());
            //auth2.signIn();
            login.onclick = handleAuthClick;
            //authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
        });   
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    auth2.signIn();
}
      
function handleSignoutClick(event) {
    auth2.signOut();
    auth2.disconnect();
}