var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope','$http','$sce', function ($scope, $http,$sce) {

    $scope.request = function (){
        $http.get("https://www.googleapis.com/youtube/v3/search",{params:{
            part: 'snippet',
            q: $scope.parameters,
            key: 'AIzaSyBRJDIQsMyS9AfUQTJfQDmuVhcaD35usH0',
            type: 'video',
            videoEmbeddable: 'true',
            videoSyndicated: 'true',
            safeSearch: 'strict'
        }}
    )
            .success(function(data){
                console.log(data);

                data.items.map(function (obj,index){
                    obj.id.videoId = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + obj.id.videoId);
                });

                $scope.data= data.items;
            })
    }

    $scope.requestChannel = function (){
        $http.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=AIzaSyBRJDIQsMyS9AfUQTJfQDmuVhcaD35usH0")
            .success(function(data){
                console.log(data);
            })
    }

    $scope.requestToken = function(){
        $http.get("https://accounts.google.com/o/oauth2/v2/auth",{params:{
            response_type: 'token',
            client_id: "796378537555-ei60v0j7dg0jkahisaherjlvq28jgff1.apps.googleusercontent.com",
            redirect_uri: "http://localhost:8080",
            scope: "https://www.googleapis.com/auth/youtube"

        }})
            .success(function(data){
                console.log(data);
            })
    }

        
}]);







// "https://www.googleapis.com/youtube/v3/search?part=snippet&q=ee&key=AIzaSyBRJDIQsMyS9AfUQTJfQDmuVhcaD35usH0"