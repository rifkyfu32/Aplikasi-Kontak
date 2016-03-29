var kontakApp = angular.module('kontakApp',[]);

kontakApp.controller('appCtrl',['$scope', '$http',function ($scope, $http) {
	var refresh = function () {
		$('.ubah').hide();
		$http.get('/listkontak').success(function(response){
			$scope.listkontak = response;
			$scope.kontak = "";
		});
	};
	
	refresh();

	$scope.tambahKontak = function () {
		if ($scope.kontak) {
			$http.post('/listkontak', $scope.kontak).success(function(response){
				refresh();
			});	
		}else{
			alert('Data masih kosong!!!');
		}		
	};

	$scope.hapusKontak = function(id) {
		$http.delete('/listkontak/' + id).success(function(response) {
			refresh();
		});
	};

	$scope.editKontak = function(id) {
		$('.tambah').hide();
		$('.ubah').show();
		$http.get('/listkontak/' + id).success(function(response) {
			$scope.kontak = response;
		});
	};  

	$scope.ubahKontak = function() {
		$('.tambah').show();
		$http.put('/listkontak/' + $scope.kontak._id, $scope.kontak).success(function(response) {
			refresh();
		});
	};

	$scope.bersih = function() {
		$('.tambah').show();
		$scope.kontak = "";
	};

}]);