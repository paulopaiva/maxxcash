'use strict';
angular.module('starter')
.factory('Conexao', ['$http', function($http){
   var _getConexao = function(valores,url){
      return $http({ // sucesso
      method: 'POST',
      url: url,
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
    };
	return {  // erro
		getConexao: _getConexao
	};
}]);