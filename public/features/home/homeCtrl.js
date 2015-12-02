angular.module("skyNautilus")

  .controller("homeCtrl", function ($scope, flightSearchService) {
	
    //Toggle oneway or roundtrip 
	
    $scope.tripType = "roundtrip";

    $scope.isShown = function (tripType) {
      return tripType === $scope.tripType;
    };
	
    ////////////Request bodies////////////////
	
  
    //One Way
    $scope.populateSearch = function () {

      $scope.passengerCount = Number($scope.passengerCount);

      console.log(typeof $scope.passengerCount);

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
              origin: "PDX",
              destination: $scope.destination,
              date: $scope.departureDate,
              maxStops: 10,
              maxConnectionDuration: 1440,
              preferredCabin: "",
              permittedDepartureTime: {
                kind: "qpxexpress#timeOfDayRange",
                earliestTime: "",
                latestTime: ""
              },
              permittedCarrier: [""],
              alliance: "",
              prohibitedCarrier: [""]
            }
          ],
          maxPrice: "",
          saleCountry: "",
          refundable: "",
          solutions: 50
        }
      };
	
  
      //Round Trip
  
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
              origin: "PDX",
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
              destination: "PDX",
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
    };   
    
    //Search function
	
    $scope.saveSearchData = function () {
      if ($scope.tripType === "oneway") {
        JSON.stringify($scope.onewayRequestBody);
        flightSearchService.saveSearchData($scope.onewayRequestBody);

        flightSearchService.searchResults($scope.onewayRequestBody).then(function (resultOfSearch) {

          var airlineCodes = {
            AS: "Alaska Airlines",
            US: "US Air",
            VX: "Virgin America",
            B6: "Jet Blue",
            UA: "United Airlines",
            WS: "WestJet"
          };

          $scope.searchResults = resultOfSearch;

          $scope.airlines = [];
          $scope.cities = [];
        
          //Airline Filter Info
          $scope.searchResults.data.carrier.forEach(function (airline) {

            airline.code = airline.code.replace(/AS|US|VX|B6|UA|WS/gi, function (code) {
              return airlineCodes[code];
            });

            $scope.airlines.push(airline.code);

          });
        
          //Origin Filter Info
          $scope.searchResults.data.city.forEach(function (city) {

            $scope.cities.push(city.code);

          });
        
        
          //Flight Search Info
          $scope.searchResults.tripOption.forEach(function (option1) {

            option1.saleTotal = option1.saleTotal.replace("USD", "$");

            option1.slice.forEach(function (option2) {

              option2.segment.forEach(function (option3) {

                var m = option3.duration % 60;
                var h = (option3.duration - m) / 60;

                option3.cleanDuration = h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();


                option3.flight.carrier = option3.flight.carrier.replace(/AS|US|VX|B6|UA|WS/gi, function (code) {
                  return airlineCodes[code];
                });
            
               
                // option3.flight.number,
                 

                option3.leg.forEach(function (option4) {


                  option4.cleanDepartureTime = new Date(option4.departureTime);
                    
                  // option4.origin,
                    
                  option4.cleanArrivalTime = new Date(option4.arrivalTime);
              
                   
                  // option4.destination,
                    
                  // option4.duration
                  

                }
                  );
              });

            });

          });

          console.log($scope.searchResults);

          flightSearchService.setCurrentSearch($scope.searchResults);

        });

      } else {
        JSON.stringify($scope.roundtripRequestBody);
        flightSearchService.saveSearchData($scope.roundtripRequestBody);
        flightSearchService.searchResults($scope.roundtripRequestBody);
      }


    };



  });