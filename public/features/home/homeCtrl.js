angular.module("skyNautilus")

.controller("homeCtrl", function ($scope) {
	
	//Toggle oneway or roundtrip 
	
	$scope.tripType = "roundtrip";
	
	$scope.isShown = function (tripType) {
		return tripType === $scope.tripType;	
	};
	
	
	//Search function
	

	
	
	//Request bodies
	
	$scope.onewayRequestBody = {
      request: {
        passengers: {
          kind: "qpxexpress#passengerCounts",
          adultCount: $scope.passengerCount,
          childCount: 0,
          infantInLapCount: 0,
          infantInSeatCount: 0,
          seniorCount: 0
        },
        slice: [
          {
            kind: "qpxexpress#sliceInput",
            origin: $scope.origin,
            destination: $scope.destination,
            date: $scope.departureDate,
            maxStops: 10,
            maxConnectionDuration: 1440,
            preferredCabin: "",
            permittedDepartureTime: {},
            permittedCarrier: [],
            alliance: "",
            prohibitedCarrier: []
          }
		],
        maxPrice: "",
        saleCountry: "",
       	refundable: "",
        solutions: 50
      }
    };
	
	$scope.roundtripRequestBody = {
      request: {
        passengers: {
          kind: "qpxexpress#passengerCounts",
          adultCount: $scope.passengerCount,
          childCount: 0,
          infantInLapCount: 0,
          infantInSeatCount: 0,
          seniorCount: 0
        },
        slice: [
          {
            kind: "qpxexpress#sliceInput",
            origin: $scope.origin,
            destination: $scope.destination,
            date: $scope.departureDate,
            maxStops: 10,
            maxConnectionDuration: 1440,
            preferredCabin: "",
            permittedDepartureTime: {},
            permittedCarrier: [],
            alliance: "",
            prohibitedCarrier: []
          },
		  {
            kind: "qpxexpress#sliceInput",
            origin: $scope.destination,
            destination: $scope.origin,
            date: $scope.returnDate,
            maxStops: 10,
            maxConnectionDuration: 1440,
            preferredCabin: "",
            permittedDepartureTime: {},
            permittedCarrier: [],
            alliance: "",
            prohibitedCarrier: []
          }
        ],
        maxPrice: "",
        saleCountry: "",
       	refundable: "",
        solutions: 50
      }
    };
});