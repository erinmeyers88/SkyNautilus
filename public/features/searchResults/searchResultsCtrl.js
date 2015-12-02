angular.module("skyNautilus")
  .controller("searchResultsCtrl", function ($scope, flightSearchService) {

    //Create the request body for the flight search.

    // $scope.requestBody = {
    //   "request": {
    //     "passengers": {
    //       "kind": "qpxexpress#passengerCounts",
    //       "adultCount": 1,
    //       "childCount": 0,
    //       "infantInLapCount": 0,
    //       "infantInSeatCount": 0,
    //       "seniorCount": 0
    //     },
    //     "slice": [
    //       {
    //         "kind": "qpxexpress#sliceInput",
    //         "origin": "PDX",
    //         "destination": "LAX",
    //         "date": "2015-12-15",
    //         "maxStops": 10,
    //         "maxConnectionDuration": 1440,
    //         "preferredCabin": "",
    //         "permittedDepartureTime": {
    //           // "kind": "qpxexpress#timeOfDayRange",
    //           // "earliestTime": "01:00",
    //           // "latestTime": "23:00"
    //         },
    //         "permittedCarrier": [
    //           ""
    //         ],
    //         "alliance": "",
    //         "prohibitedCarrier": [
    //           ""
    //         ]
    //       }
    //     ],
    //     "maxPrice": "",
    //     "saleCountry": "",
    //     "refundable": "",
    //     "solutions": 50
    //   }
    // };
    

    //Set up the search function, which accepts an argument which is a request body.
    $scope.search = function (argument) {
      flightSearchService.searchResults(argument).then(function (resultOfSearch) {

        var airlineCodes = {
          AS: "Alaska Airlines",
          US: "US Air",
          VX: "Virgin America",
          B6: "Jet Blue",
          UA: "United Airlines",
          WS: "WestJet"
        };

        $scope.searchResults = resultOfSearch;

        console.log($scope.searchResults);


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

      });





    };

    //Call the search function and pass it the request body.
    // $scope.search($scope.requestBody);



    $scope.getsearchResults = function () {
      $scope.searchResults = flightSearchService.getCurrentSearch();
    };


    $scope.getsearchResults();

    console.log($scope.searchResults);

  });