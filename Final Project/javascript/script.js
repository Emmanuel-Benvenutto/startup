let myApp = angular.module('myApp', ['ngRoute']);
let apiKey = 'AIzaSyBRJDIQsMyS9AfUQTJfQDmuVhcaD35usH0';
let clientId = '796378537555-ei60v0j7dg0jkahisaherjlvq28jgff1.apps.googleusercontent.com';
let scopes = 'https://www.googleapis.com/auth/youtube';
let auth2;
let authorizeButton = document.getElementById('authorize-button');
let title = document.getElementById('mainTitle');
let nav = document.getElementById('nav');
let titleLogged = document.getElementById('TitleLogged');


function handleClientLoad(){
    gapi.load('client:auth2',initAuth);
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
    }); 
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        let user = auth2.currentUser.get().getBasicProfile();
        titleLogged.textContent = "Bienvenido "+user.ig+"!";
        console.log("logueado");
        login.style.display = 'none';
        title.style.display = 'none';
        nav.style.display = 'block';
        titleLogged.style.display = "block";
    } else {
        nav.style.display = 'none';
        titleLogged.style.display = "none";
        login.style.display = 'block';
        title.style.display = 'block';    
    }
}

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/searchVideos', {
        templateUrl: 'templates/searchVideos.html',
        controller: 'videosController'
    }).
    when('/myChannel', {
        templateUrl: 'templates/myChannel.html',
        controller: 'myChannelController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

myApp.service('service', [function() {
    let request;

    this.videos = {};
    
    this.loadApi = function() {
        return gapi.client.load('youtube', 'v3'); 
    }

    this.getVideos = function(query) {
        return request = gapi.client.youtube.search.list({
            part: 'snippet',
            q: query,
            type: 'video',
            videoEmbeddable: 'true',
            videoSyndicated: 'true',
            safeSearch: 'strict',
            maxResults: '20'
        });
    }
    this.getIdVideo = function(id) {
        return request = gapi.client.youtube.videos.list({
            part: 'snippet,statistics',
            id: id
        });
    }
    this.getPlaylists= function() {
        return request = gapi.client.youtube.playlists.list({
            part: 'snippet',
            maxResults: '50',
            mine: true
        });        
    }
    this.getSubscriptions= function() {
        return request2 = gapi.client.youtube.subscriptions.list({
            'part': 'snippet',
            'mine': 'true'
        });
    }
    this.getUploads = function() {
        return request = gapi.client.youtube.search.list({
            part: 'snippet',
            type: 'video',
            forMine: true
        });
    }
    this.getMineChannel = function() {
        return request = gapi.client.youtube.channels.list({
            part: 'snippet',
            mine: true
        });
    }
    this.auth = function() {
        auth2.signIn();
    }

    this.getChannelByName = function(data) {
        return request = gapi.client.youtube.channels.list({
            part: 'snippet,statistics',
            forUsername: data 
        });
    }
    this.createNewPlaylist = function(title,description) {
        this.newPlaylist.title = title;
        this.newPlaylist.description = description;
        localStorage.setItem('playlist', angular.toJson(this.newPlaylist));
    }

    this.addVideoPlaylist = function(newVideo) {
        this.newPlaylist.items.push(newVideo);
        localStorage.setItem('playlist', angular.toJson(this.newPlaylist));
    }
    this.deleteVideoPlaylist= function(index) {
        this.newPlaylist.items.splice(index,1);
        localStorage.setItem('playlist', angular.toJson(this.newPlaylist));
    }
    this.getLocalPlaylist = function() {
        this.newPlaylist = JSON.parse(localStorage.getItem('playlist'));
        if(this.newPlaylist === null){
            this.newPlaylist = {items:[]};
        }
        return this.newPlaylist;
    }
    this.savePlaylistYoutube = function(title,description) {
        return request = gapi.client.request({
            'path' : 'https://www.googleapis.com/youtube/v3/playlists',
            'method': 'POST',
            'params': {part:'snippet'},
            'body':{"snippet": {"title": title,"description": description}}
        });
    }

    this.newPlaylist = this.getLocalPlaylist();

}]);

myApp.controller('videosController', ['$scope','service','$sce', function ($scope, service, $sce) {
    let idSelected;

    $scope.selectedDisabled = false;
    $scope.scrollDisabled = false;
    $scope.videoDisabled = false;
    $scope.newPlaylistData = service;

    $scope.searchVideos = function () {
        service.loadApi().then(function() {
            service.getVideos($scope.search).then(function (resp) {
                $scope.$apply(function(){
                    $scope.data = resp.result.items;    
                    $scope.scrollDisabled = true;
                });
            });
        });
    }

    $scope.getVideo = function (index){
        service.getIdVideo($scope.data[index].id.videoId).then(function (resp){
            $scope.$apply(function(){
                resp.result.items.map(function (obj,index){
                    idSelected = obj.id;
                    obj.id = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + obj.id);
                    $scope.selected = resp.result.items[0];
                    $scope.videoDisabled = true;
                    $scope.selectedDisabled = true;
                    });   
                });
            });
        };

    $scope.newPlaylist = function() {
        service.createNewPlaylist($scope.new.playlistTitle,$scope.new.playlistDescription);
    }

    $scope.addVideo = function() {
        let newVideo = {
            title: $scope.selected.snippet.title,
            imgUrl: $scope.selected.snippet.thumbnails.medium.url,
            id: idSelected
        }
        service.addVideoPlaylist(newVideo);
    }

    $scope.deleteVideo = function(index){
        service.deleteVideoPlaylist(index);
    }

    $scope.saveYoutube = function(){
        let playlistNew = service.getLocalPlaylist();
        service.savePlaylistYoutube(playlistNew.title,playlistNew.description).then(function (resp){//resp.result.id
            service.addVideoYoutube(resp.result.id).then(function(resp){
                    console.log(resp);
            });
        });
    }                
}]);

myApp.controller('myChannelController', ['$scope','service','$sce','$timeout', function ($scope, service, $sce, $timeout) {
    let channelButton = document.getElementById('channelButton');

    $scope.channelShow = false;

    $scope.bringChannel= function () {
        service.loadApi().then(function(){
            service.getMineChannel().then(function (resp){
                $scope.$apply(function(){
                    $scope.channel = resp.result.items[0];
                });
            });
            service.getPlaylists().then(function (resp){
                $scope.$apply(function(){
                    $scope.playlists = resp.result.items;
                });
            });
            service.getSubscriptions().then(function (resp){
                $scope.$apply(function(){
                    $scope.subscriptions = resp.result.items;
                });
            });
            service.getUploads().then(function (resp){
                $scope.$apply(function(){
                    $scope.uploads = resp.result.items;
                });
            });
        });
        channelButton.style.display = 'none';
        $scope.channelShow = true;
    }
    
    $scope.getPlaylistSelected = function(index) {

        $scope.playlistSelected = $scope.playlists[index];
    }
    $scope.getSubscriptionSelected = function(index) {
        $scope.subscriptionSelected = $scope.subscriptions[index];
    }
    $scope.getUploadSelected = function(index) {
        $scope.uploadSelected = $scope.uploads[index];
    }
}]);

myApp.controller('channelsController', ['$scope','service','$sce', function ($scope, service, $sce) {

    $scope.selectedDisabled = false;
    $scope.channelDisabled = false;

    $scope.searchChannels = function () {
        service.loadApi().then(function() {
            service.getChannelByName($scope.search).then(function (resp){
                $scope.$apply(function() {
                    $scope.data = resp.result.items[0]; 
                    $scope.channelDisabled = true;
                });
            });
        });
    }

}]);

myApp.controller('loginController', ['$scope','service','$sce', function ($scope, service, $sce) {
    $scope.login = function(){
        service.auth();
    }
}]);









