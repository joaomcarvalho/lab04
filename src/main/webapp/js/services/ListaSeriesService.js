var serieService = angular.module("listaSeries");

serieService.service("ListaSeriesService", ["$http",
function ListaSeriesService($http) {

	var serlf = this;

	var searchUrl = 'https://omdbapi.com/?s=TITULO&apikey=93330d3c&type=series';
	var singleSerieUrl = 'https://omdbapi.com/?i=IMDBID&plot=full&apikey=93330d3c'
	
	/**
	* Procura por series pelo nome
	*
	* @param {nome} nome procurado
	* @return {Promise}
	*/
	this.search = function(nome) {
		var uri = encodeURI(searchUrl.replace(/TITULO/, nome));
		return $http.get(uri);
	}

	/**
	* Faz load de uma serie especifica pelo ID
	*
	*/
	this.getSingleSerie = function(serie) {
		var uri = encodeURI(singleSerieUrl.replace(/IMDBID/, serie));
		return $http.get(uri);
	}
}]);