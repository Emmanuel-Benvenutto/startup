var myApp = angular.module('myApp', []);

myApp.service('storage',[function() {

    this.save  = function (moviesUnsaved) {
        localStorage.setItem('movies', JSON.stringify(moviesUnsaved));
    }

    this.get  = function() {
        let movies = JSON.parse(localStorage.getItem('movies'));

        if (movies === null) {
            movies = [];
        }
        return movies;
    }
}]);
 
myApp.controller('mainController', ['$scope', 'storage', function ($scope, storage) {
    let moviesUpdate;

    $scope.movies = {};
    $scope.selected = {};
    $scope.storage = storage;
    $scope.movies.details = $scope.storage.get();
    moviesUpdate = $scope.movies.details;
    $scope.isDisabled = true;
    $scope.showDetails = false;

    $scope.$watch('movies.details', function(moviesUpdate) {$scope.storage.save(moviesUpdate);}, true);
    
    $scope.deleteMovie = function (index) {
        $scope.movies.details.splice(index, 1);    
    };

    $scope.editMovie = function (index) {
        $scope.isDisabled = false;
        $scope.lastIndex = index;
        movieEdit = $scope.movies.details[index];
        $scope.titleEdit = movieEdit.title;
        $scope.durationEdit = movieEdit.duration;
        $scope.yearEdit = movieEdit.year;
        $scope.synopsisEdit = movieEdit.synopsis;
    };

    $scope.selectMovie = function (item) {
        $scope.selected = item;
        $scope.showDetails = true;
    }
    
}]);

myApp.controller('subController', ['$scope', function ($scope) {

    $scope.submitAdd = function() {
        let movieNew = {
            "title":this.titleAdd,
            "duration":this.durationAdd, 
            "year":this.yearAdd,
            "synopsis":this.synopsisAdd
        };
        $scope.movies.details.push(movieNew);    
    };

    $scope.submitEdit = function() {
        $scope.$parent.movies.details[$scope.lastIndex] = {
            "title": this.titleEdit,
            "duration": this.durationEdit, 
            "year": this.yearEdit,
            "synopsis": this.synopsisEdit
        }

        $scope.$parent.selected = $scope.movies.details[$scope.lastIndex];
        $scope.$parent.isDisabled = true; 
    };
}]);