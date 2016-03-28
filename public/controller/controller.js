var kontakApp = angular.module('kontakApp',[]);

kontakApp.controller('appCtrl',['$scope', '$http',function ($scope, $http) {
	var refresh = function () {
		$http.get('/listkontak').success(function(response){
			console.log('menerima request data');
			$scope.listkontak = response;
			$scope.kontak = "";
		});
	};
	
	refresh();

	$scope.tambahKontak = function () {
		if ($scope.kontak) {
			$http.post('/listkontak', $scope.kontak).success(function(response){
				console.log('response : ' + response);
				refresh();
			});	
		}else{
			alert('Data masih kosong!!!');
		}		
	};

	$scope.hapus = function(id) {
		$http.delete('/listkontak/' + id).success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		$http.get('/listkontak/' + id).success(function(response) {
			$scope.kontak = response;
		});
	};  

	$scope.ubah = function() {
		$http.put('/listkontak/' + $scope.kontak._id, $scope.kontak).success(function(response) {
			refresh();
		})
	};

	$scope.bersih = function() {
		$scope.kontak = "";
	}

}]);