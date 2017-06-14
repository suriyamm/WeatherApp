var app = angular.module('WeatherApp', []);
app.controller('WeatherCtrl', function($scope, $http, $filter) {

	$scope.cityName = "Christchurch";
	$scope.tmp = 0;
	$scope.minTemp = 0;
	$scope.maxTemp = 0;
	$scope.saveList = [];
	$scope.date = new Date();
	$scope.currentDate = $filter('date')(new Date(), 'dd/MM/yyyy');
	$scope.currentTime = $filter('date')(new Date(), 'HH:mm:ss');

	$scope.getWatherData = function() {
		if (JSON.parse(localStorage.getItem($scope.cityName)) == null) {
			$scope.saveList.push($scope.cityName);
			var url = "http://api.openweathermap.org/data/2.5/weather?q="
					+ $scope.cityName
					+ "&APPID=ae9b610b50f991e256fc67d9531f9578";
			$http.get(url).success(
					function(response) {
						$scope.ct = response.name;
						$scope.tmp = response.main.temp - 272.15;
						$scope.minTemp = response.main.temp_min - 272.15;
						$scope.maxTemp = response.main.temp_max - 272.15;
						$scope.hmdy = response.main.humidity;
						$scope.imgCode = response.weather[0].icon;
						$scope.windSpeed = response.wind.speed;
						$scope.desc = response.weather[0].description;
						localStorage.setItem($scope.cityName, JSON
								.stringify(response));

					});
		} else {

			var response = JSON.parse(localStorage.getItem($scope.cityName));
			$scope.ct = response.name;
			$scope.tmp = response.main.temp - 272.15;
			$scope.minTemp = response.main.temp_min - 272.15;
			$scope.maxTemp = response.main.temp_max - 272.15;
			$scope.hmdy = response.main.humidity;
			$scope.imgCode = response.weather[0].icon;
			$scope.windSpeed = response.wind.speed;
			$scope.desc = response.weather[0].description;
		}

	}

});