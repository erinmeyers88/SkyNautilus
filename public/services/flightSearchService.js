angular.module("skyNautilus")
	.service("flightSearchService", function ($http, $q) {
		
		
		//Save search data to service	
		this.searchData = {};

		this.saveSearchData = function (data) {
			this.searchData = data;
			console.log(this.searchData);
		};
		
		
		//HTTP POST request for flight info	
		
		this.searchResults = function (argument) {
		
			// var deferred = $q.defer();	
			
			//other key: AIzaSyAFSQP3ClWoPPShBYApLfxjazl-1WsKpu8
			//win key: AIzaSyCL0ZLFUF5_SsrocXX6ZKSaRlonngvd9cE
			//my key: AIzaSyAFEjs778GYWjvMrYyuzPLk5eLAqtqLfdA
			//daniel law key: AIzaSyAfUeKttBcaUk-jAIpc9jMURjQ8V0FCBEs	
			
			return $http({
				method: 'POST',
				url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAFSQP3ClWoPPShBYApLfxjazl-1WsKpu8',
				data: argument
			}).then(function (response) {

				return response.data.trips;
			
						
				// deferred.resolve(searchResults);
			
			});
			
			// return deferred.promise;
		};

		
		
		
		this.currentSearch = {};

		
		
		this.getCurrentSearch = function () {
			return this.currentSearch;
		};
		
		this.setCurrentSearch = function (searchObject) {
			this.currentSearch = searchObject;
			console.log(this.currentSearch);
		};

		
		
	});