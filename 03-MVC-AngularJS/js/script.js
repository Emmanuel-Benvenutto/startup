var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/:id", {
        template : (`<h1>Title: {{selected.title}}</h1><br>
        <p>Duration: {{selected.duration}}</p>
        <p>Year: {{selected.year}}</p>
        <p>Synopsis: {{selected.synopsis}}</p>`)
    })
});

myApp.service('storage',[function() {

    this.editDisabled = true;

    this.movies = JSON.parse(localStorage.getItem('movies'));

    this.add = function (movieNew) {
        this.movies.push(movieNew);
    }

    this.save  = function (moviesUnsaved) {
        localStorage.setItem('movies', angular.toJson(moviesUnsaved));
    }   

    this.get  = function() {

        if (this.movies === null) {
            this.movies = [];
        }
        return this.movies;
    }
}]);


myApp.controller('mainController', ['$scope', 'storage', function ($scope, storage) {
    let moviesUpdate;

    storage.showDetails = false;
    $scope.movies = {};
    $scope.selected = {};
    moviesUpdate = storage.get();
    $scope.movies.details = moviesUpdate;
    $scope.showDetails = storage.showDetails;

    $scope.$watch('movies.details', function(moviesUpdate) {storage.save(moviesUpdate);}, true);
    
    $scope.deleteMovie = function (index) {
        storage.movies.splice(index, 1);    
    };

    $scope.editMovie = function (index) {
        storage.editDisabled = false;
        storage.editItem = storage.movies[index];
        storage.indexSelected = index;
    };

    $scope.selectMovie = function (item) {
        $scope.selected = item;
        storage.showDetails = true;
        $scope.showDetails = storage.showDetails;
    }
}]);

myApp.controller('subController', ['$scope', 'storage', function ($scope, storage) {

    $scope.storage = storage; 
    $scope.submitAdd = function() {
        let movieNew = {
            "title": this.titleAdd,
            "duration": this.durationAdd, 
            "year": this.yearAdd,
            "synopsis": this.synopsisAdd
        };
        storage.add(movieNew);    
    };

    $scope.submitEdit = function() {
        storage.movies[storage.indexSelected] = {
            "title": $scope.storage.editItem.title,
            "duration": $scope.storage.editItem.duration, 
            "year": $scope.storage.editItem.year,
            "synopsis": $scope.storage.editItem.synopsis
        }
    };
}]);