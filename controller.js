var app = angular.module('myApp', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/success', {
      templateUrl: 'feedview.html',
      controller: 'feedCtrl'
    })
    .when('/login', {
      templateUrl: 'form.html',
      controller: 'validateCtrl'
    }).
  when('/:title', {
    templateUrl: 'detailview.html',
    controller: 'DetailViewctrl'
  }).
  otherwise({
    redirectTo: '/login'
  })
}])


app.controller('validateCtrl', function($scope, $http, $location) {

  $scope.submit = function(user, password) {
    //for local storage validation'

    $http.get('credentials.json').then(function(response) {
      $scope.credentials = response.data;

      if ((user === $scope.credentials.username) && (password === $scope.credentials.password)) {
        $location.path('/success');
        localStorage.setItem("glittrLoggedin", user);
      } else {
        alert("Invalid credentials");
      }
    });
  };

})

.controller('feedCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('items.json').then(function(response) {
    $scope.items = response.data;
    $scope.user = localStorage.getItem("glittrLoggedin");
  });
  $scope.convertToDate = function(stringDate) {
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate());
    return dateOut;
  };

}])

.controller('DetailViewctrl', ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter) {
  var title = $routeParams.title;
  $http.get('items.json').then(function(response) {
    $scope.items = $filter('filter')(response.data, function(d) {
      return d.title === title;
    })[0];
    $scope.mainImage = $scope.items.picture;
  });
  $scope.convertToDate = function(stringDate) {
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate());
    return dateOut;
  };
}]);