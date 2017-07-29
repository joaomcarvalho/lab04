const app = angular.module('listaSeries', ['ngMaterial', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('main',{
			url: '',
			abstract: true,
			template: '<div ui-view></div>',
			controller: 'listaSeriesCtrl as ctrl' 
		})
		.state('main.home', {
			url:'/home',
			templateUrl:'home.html',
		})
 
		.state('main.login', {
			url:'/login',
			templateUrl:'login.html',
		});
});