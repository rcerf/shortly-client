angular.module('shortlyApp', [])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: "LinkControl",
    templateUrl: '/client/template/link.html'
  })
  .when('/shorten', {
    controller: "ShortenControl",
    templateUrl: '/client/template/shorten.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.controller('LinkControl',
  function($scope, $http){
    $http.get('/links')
    .success(function(data, status, headers, config){
      $scope.link = data;
      $scope.predicate = "-visits";
    })
    .error(function(data, status){

    });
  })
.controller('ShortenControl',
  function($scope, $http){
    $scope.submit = function(){
      $http.post('/links', {url: $scope.link})
          .success(function(data, status, headers, config){
            console.log("Posted!");
          }).error(function(data, status){
            console.error("Problem posting.");
            console.log($scope.link);
            console.log(data);
          });
    };
  });