var listaSeries = angular.module("listaSeries");

angular.module("listaSeries").controller("listaSeriesCtrl", function($http, ListaSeriesService, $scope, $mdDialog, $state) {
	var self = this;
	this.series = [];
	this.seriesPerfil = [];
	this.seriesWatchList = [];
	
	self.search = function(name,ev) { 
		var promise = ListaSeriesService.search(name);
		promise.then(function(response){
			if (response.data.Response == "False"){
				$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Série não encontrada')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
			}
			self.series = response.data.Search;
		});
		return promise;
	};

	self.hasImagePoster = function(serie) {
		return series.Poster !== 'N/A';
	};	

	self.contemSeriePerfil = function(id) {
		for (var i = 0; i < self.seriesPerfil.length; i++){
			if(self.seriesPerfil[i].imdbID === id){
				return true;
			}
		}
		return false;
	};

	self.adicionarAoPerfil = function(ev, serie, flag) {
		var promise = ListaSeriesService.getSingleSerie(serie.imdbID);
		promise.then(function(response){
			if(!self.contemSeriePerfil(response.data.imdbID)){
				self.seriesPerfil.push(response.data);
				if(!flag)
					self.serieToBD(response.data, false);
			}else{
				$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Você já colocou esta série no Perfil.')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
			}
		});
	};

	self.serieToBD = function(serie, onWatchList){
		var url = "/addSerie";
		data = {
			idUser :$scope.usuarioLogado,
			imdbID : serie.imdbID,
			onWatchList: onWatchList
		}

		$http.post(url,data).then(function(response){
			
		});
	};

	self.removerDoPerfil = function(ev, serie) {
		var dialog = $mdDialog.confirm()
			.title('Cuidado!')
			.textContent('Deseja mesmo remover ' + serie.Title + ' do seu Perfil?')
			.ariaLabel('Confirm Dialog')
			.targetEvent(ev)
			.ok('Remover')
			.cancel('Cancelar');

		$mdDialog.show(dialog).then(function(){
			var index = self.seriesPerfil.indexOf(serie);
			self.seriesPerfil.splice(index,1);
			self.removeBD(serie);
		})
		
	};

	self.removeBD = function(serie){
		var url = "removerSerie/" + $scope.usuarioLogado;
		imdbID = serie.imdbID;

		$http.post(url,imdbID).then(function(){

		})
	}

	self.adicionarAoWatchList = function(ev, serie) {
		if(!self.contemSerieWatchList(serie.imdbID)){
			self.seriesWatchList.push(serie);
			self.serieToBD(serie, true);
		}else{
			$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Você já colocou esta série a sua WatchList.')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
		}
	};

	self.contemSerieWatchList = function(id) {
		for (var i = 0; i < self.seriesWatchList.length; i++){
			if(self.seriesWatchList[i].imdbID === id){
				return true;
			}
		}
		return false;
	}

	self.removerWatchList = function(serie, flag) {
		var index = self.seriesWatchList.indexOf(serie);
		self.seriesWatchList.splice(index,1);
		if(!flag)
			removeBD(serie);
	};

	self.setNota = function(ev, serie, nota) {
		if(nota > 10 || nota < 0){
			
		}else{
			serie.nota = nota;
			var url = "/setNota/" + $scope.usuarioLogado + "/" + serie.imdbID;
			$http.put(url,nota).then(function() {

			});
		}
	};

	self.setUltimoEpisodio = function(serie, episodio) {
		console.log(serie.nota);
		serie.ultimoEpisodio = episodio
	};

	self.adicionarAoPerfilERemoverWatchList = function(evt, serie) {
		self.adicionarAoPerfil(evt, serie, true);
		self.removerWatchList(serie, true);
		var url = "/watchListToPerfil/" +  $scope.usuarioLogado;
		
		var imdbID = serie.imdbID
	
		
		$http.put(url,imdbID).then(function(response){
			console.log("deu bom");
		})
	};

	self.goHome = function(){
	 	$state.go('main.home');
	 	self.carregaSeries();
	};

	self.carregaSeries = function(){
		self.seriesPerfil = [];
		self.seriesWatchList = [];
		var i = 0;
		var url = "/addSerie/" + $scope.usuarioLogado;
		$http.get(url).then(function(response){
			for (i = response.data.length - 1; i >= 0; i--) {
				if(!response.data[i].onWatchList){
					var promise = ListaSeriesService.getSingleSerie(response.data[i].imdbID);
					$scope.nota = response.data[i].nota;

					promise.then(function(response){
						var serie = response.data;
						serie.nota = $scope.nota;
						console.log(serie.nota);
						self.seriesPerfil.push(serie);
					})
		
				}else{
					var promise = ListaSeriesService.getSingleSerie(response.data[i].imdbID);
					promise.then(function(response){
						self.seriesWatchList.push(response.data);
					})
				}
			}
		});
	}
	
	self.criarConta = function(ev, loginUser, senhaUser){
		url = "/usuario";
		data = {
			login:loginUser,
			senha:senhaUser
		}

		$http.post(url,data).then(function(response){
			$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Cadastro Realizado')
        		.textContent('Cadastro Realizado com Sucesso')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
		}, function(response){
			$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Este usuário já existe')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
		});
	};

	self.logar = function(ev, loginUser, senhaUser){
		console.log(loginUser + " " + senhaUser);
		url = "/usuarioLogar";
		data = {
			login:loginUser,
			senha:senhaUser
		}

		$http.post(url,data).then(function(response){
			$scope.usuarioLogado = response.data.id;
			self.goHome();
		}, function(response){
			$mdDialog.show(
     		 	$mdDialog.alert()
        		.parent(angular.element(document.querySelector('#popupContainer')))
       		    .clickOutsideToClose(true)
        		.title('Ops!')
        		.textContent('Usuário ou senha incorretos!')
        		.ariaLabel('Alert Dialog Demo')
        		.ok('Ok')
        		.targetEvent(ev)
   			 );
		});
	};

	self.logout = function() {
		$scope.usuarioLogado = undefined;
		$state.go('main.login')
	};

	(function(){
		console.log($scope.usuarioLogado);
		if(!$scope.usuarioLogado){
			$state.go('main.login');
		}
	})();
});