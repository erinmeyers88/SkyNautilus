angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService, loadResults) {
    
    $scope.getUserSearch = function () {
      $scope.userSearch = flightSearchService.saveSearchData();
    };
    
    $scope.getSearchData = function () {
      $scope.searchData = loadResults;
      console.log($scope.searchData);
      
      $scope.searchResults = $scope.searchData.searchResults;
      $scope.cities = $scope.searchData.cities;
      $scope.airlines = $scope.searchData.airlines;
      console.log("test");
    }();
    
    console.log($scope.searchResults);

  });
  
  