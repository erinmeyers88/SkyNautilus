angular.module("skyNautilus")
	.service("flightSearchService", function ($http, $q) {
		
		this.searchResults = function (argument) {
		
		// var deferred = $q.defer();	
			
		//other key: AIzaSyAFSQP3ClWoPPShBYApLfxjazl-1WsKpu8
		//win key: AIzaSyCL0ZLFUF5_SsrocXX6ZKSaRlonngvd9cE
		//my key: AIzaSyAFEjs778GYWjvMrYyuzPLk5eLAqtqLfdA
		//daniel law key: AIzaSyAfUeKttBcaUk-jAIpc9jMURjQ8V0FCBEs	
			
			return $http({
				method: 'POST',
				url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAfUeKttBcaUk-jAIpc9jMURjQ8V0FCBEs',
				data: argument
			}).then(function (response) {
			
			return response.data.trips;
			
						
			// deferred.resolve(searchResults);
			
			});
			
			// return deferred.promise;
		};



	});