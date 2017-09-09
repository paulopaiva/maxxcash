// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

//br.com.ics.socialmidia  - 16
var path="http://cartaofelicidade.com.br/app/";
//var path="http://social.jl.portalexata.com.br/";
//var path="http://cartaofelicidade.com.br/social.franca/";
var idUsuario=null;
var start=0;
var start2=0;

angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform,$http) {

  $ionicPlatform.ready(function() {

  // notificacao inicio
  if (!localStorage.getItem('tokem')){
    var push = PushNotification.init({

            android: {
                senderID: "387471265662"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}

        });

        push.on('registration', function(data) {
            // data.registrationId
          //  alert ("regsitro : "+data.registrationId);
          //  document.getElementById('idConsole').innerHTML=data.registrationId;

            localStorage.setItem('tokem',data.registrationId);
            if (localStorage.getItem('nome')){
               // atualiza banco de dados.
               var valores = {
                parametros:'atualizatokem',
                idpush:localStorage.getItem('tokem'),
                idusuario:idUsuario}

              $http({
                    method:'POST',
                    url: path+'api/api.php',
                    data: valores,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).success(function(data){
                      alert ('Tokem atualizado!');
                  }).error(function(data){
                    alert('erro ao enviar a mensagem, sem conexão com a internet.');

                  });

            }

        });

        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function(e) {
            // e.message
        });
      }
  // fim push

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
// inico
// $cordovaStatusbar.overlaysWebView(true);

  // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
//  $cordovaStatusbar.style(1);

  // supported names: black, darkGray, lightGray, white, gray, red, green,
  // blue, cyan, yellow, magenta, orange, purple, brown
 // $cordovaStatusbar.styleColor('black');

 // $cordovaStatusbar.styleHex('#000');

 // $cordovaStatusbar.hide();

//  $cordovaStatusbar.show();

 // var isVisible = $cordovaStatusbar.isVisible();

// fim bar


    }

    idUsuario=localStorage.getItem('idusuario');
  });

})

.directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toLowerCase();
//          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
})


.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
   .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  // Each tab has its own nav history stack:


  .state('tab.lojista', {
      url: '/lojista',
      views: {
        'tab-lojista': {
          templateUrl: 'templates/tab-lojista.html',
          controller: 'StatusCtrl'
        }
      }
    })

  .state('tab.mapa', {
      url: '/mapa',
      views: {
        'tab-mapa': {
          templateUrl: 'templates/tab-mapa.html',
          controller: 'MapCtrl'
        }
      }
  })
    .state('tab.cashback', {
      url: '/cashback',
      views: {
        'tab-cashback': {
          templateUrl: 'templates/tab-cashback.html',
          controller: 'StatusCtrl'
        }
      }
  })
  .state('tab.desconto', {
    url: '/desconto',
    views: {
      'tab-desconto': {
        templateUrl: 'templates/tab-desconto.html',
        controller: 'StatusCtrl'
      }
    }
})
  .state('tab.classificado', {
      url: '/classificado',
      views: {
        'tab-classificado': {
          templateUrl: 'templates/tab-classificado.html',
          controller: 'StatusCtrl'
        }
      }
  })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/classificado');

});
