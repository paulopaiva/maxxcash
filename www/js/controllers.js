angular.module('starter.controllers', [])
.controller('StatusCtrl', function($scope,   $cordovaCapture, $cordovaStatusbar,  $state, $cordovaNetwork,  $cordovaGeolocation, $cordovaToast, $http, Conexao, $cordovaContacts, $cordovaSocialSharing, $ionicModal, $cordovaCamera, $ionicLoading, $cordovaFileTransfer,  $timeout, $ionicPopup)  {


if (start==0) {
    $scope.mapa={};
    $scope.usuario={};
    $scope.latitude="";
    $scope.longitude="";
    $scope.localizacao="";

    $scope.img_fundo="url(ico/papel1.jpeg)";
    $scope.tema="bar-royal";
    $scope.tab_tema="tabs-background-royal tabs-color-light";
    $scope.btn_tema="button-energized";
    $scope.usuario.foto_perfil="images/foto.jpg";
  //  $scope.btn_tema="background: #536DFE;color: #fff;";

  if (localStorage.getItem('nome')!=null){
    idUsuario= localStorage.getItem('idusuario');
    $scope.idusuario=idUsuario;
  }else {
    $scope.idusuario="";
  }

     start=1;
}



document.addEventListener('deviceready',function(){ // inicia o aplicativo

    if (start2==0){
        $cordovaStatusbar.style(2);
        $cordovaStatusbar.styleHex('#f5a80a');
        start2=1;
        // carregar as paginas de templates aki
        //===========================================================================================
        $ionicModal.fromTemplateUrl('templates/tab-minhaconta.html', {
          scope: $scope
        }).then(function(minhaconta) {
          $scope.tabMinhaconta = minhaconta;
        });

        // Triggered in the login modal to close it
        $scope.close_minhaconta = function() {
          $scope.tabMinhaconta.hide();
        };
        // Open the login modal
        $scope.tab_minhaconta = function() {

          $scope.usuario.nome= localStorage.getItem('nome');
          $scope.usuario.telefone = localStorage.getItem('telefone');
          $scope.usuario.email = localStorage.getItem('email');
          $scope.usuario.foto_perfil = localStorage.getItem('foto_perfil');

          if ($scope.usuario.foto_perfil==null){
             $scope.usuario.foto_perfil="images/foto.jpg";
          }
          $scope.tabMinhaconta.show();
        };


        // modal
        $ionicModal.fromTemplateUrl('templates/tab-usuario.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modalusuario = modal;
        });

        $scope.closeUsuario = function() {
            $scope.modalusuario.hide();
        };


        $scope.usuario = function() {
         //$scope.verificaNet();
         $scope.usuario.idusuario=localStorage.getItem('idusuario');
         $scope.usuario.nome= localStorage.getItem('nome');
         $scope.usuario.email= localStorage.getItem('email');
         $scope.usuario.data_nascimento= localStorage.getItem('data_nascimento');
         $scope.usuario.endereco = localStorage.getItem('endereco');
         $scope.usuario.telefone = localStorage.getItem('telefone');
          $scope.usuario.rg = localStorage.getItem('rg');
           $scope.usuario.data_nascimento = localStorage.getItem('data_nascimento');
         $scope.usuario.tipo = localStorage.getItem('tipo');
         $scope.usuario.foto_perfil = localStorage.getItem('foto_perfil');
         if ($scope.usuario.foto_perfil==null){
            $scope.usuario.foto_perfil="images/foto.jpg";
         }
           $scope.pegaLocal();
           $scope.modalusuario.show();
        };
        $ionicModal.fromTemplateUrl('templates/tab-dica.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modaldica = modal;
        });

        $scope.closeDica = function() {
            $scope.modaldica.hide();
        };

        $scope.dica = function() {
           $scope.pegaDica();
           $scope.modaldica.show();
        };


        $ionicModal.fromTemplateUrl('templates/tab-help.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modalhelp = modal;
        });

        $scope.closeHelp = function() {
            $scope.modalhelp.hide();
        };

        $scope.help = function() {
           $scope.modalhelp.show();
        };

        $ionicModal.fromTemplateUrl('templates/tab-contato.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modalcontato = modal;
        });

        $scope.closeContato = function() {
            $scope.modalcontato.hide();
        };

        $scope.contato = function() {
           $scope.modalcontato.show();
        };

        $ionicModal.fromTemplateUrl('templates/tab-desenvolvedor.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modaldesenvolvedor = modal;

        });

        $scope.closeDesenvolvedor = function() {
            $scope.modaldesenvolvedor.hide();
        };

        $scope.desenvolvedor = function() {
           $scope.modaldesenvolvedor.show();
        };







        // fim dos templates




        $scope.secao=sessionStorage.getItem('secao');
        if ($scope.secao==null){
    //      alert('2.1')
           sessionStorage.setItem('secao',true);
           idUsuario=localStorage.getItem('idusuario');
           $scope.idusuario=idUsuario;

        }
        if (!localStorage.getItem('nome')){
          localStorage.setItem('contador',1);

          $scope.usuario();


        }
    }
   }, false);




$scope.verificaNet = function(){

  var type = $cordovaNetwork.getNetwork()
  var isOnline = $cordovaNetwork.isOnline()

  if (isOnline==false){
     $scope.showAlert('Informação','Vc esta sem conexão de dados, por favor ative sua conexao de dados para ter acesso aos dados do aplicativo.');

   }
}



$scope.cameraPopupPerfil = function (){
    var confirm = $ionicPopup.alert({
      title: "Origem da Foto",
      body: " <i class='ion-camera'>Selecione o dispositivo</i>",
      buttons: [{text: "Camêra",
                 type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFotoPerfil(1);
                  },

               },{text: "Galeria",
                  type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFotoPerfil(2);
                  }


             }]
    });

};


$scope.verificaUsuario = function (usuario){

  $ionicLoading.show({
   template: 'Aguarde, verificando usuário...'
    });

      var valores = {
        parametros:'verificaUsuario',
        pagina:0,
        telefone : usuario.telefone
      }


      $http({
            method:'POST',
            url: path+'api/api.php',
            data: valores,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
            // se existir o usuario coloca os dados para o telefone
            if ((data.length > 0) && (idUsuario==null)){ // cadastro ja existente no banco
              $ionicLoading.hide();
              $scope.showAlert('Atenção','O Telefone '+data[0].telefone+', já esta cadastrado para o usúario => '+data[0].nome +', se este número pertençe a vc e os dados são seus, continue atualizado seus dados, caso contrario entre em contato com o suporte do aplicativo.');
              idUsuario=data[0].idusuario;
              usuario.nome =data[0].nome;
              usuario.endereco =data[0].endereco;
              dt = data[0].data_cadastro;
              usuario.rg = data[0].rg;
              usuario.localizacao = data[0].localizacao;
              usuario.telefone = data[0].telefone;
              usuario.foto_perfil = data[0].foto;
              usuario.data_nascimento = data[0].data_nascimento;
              usuario.email = data[0].email;

            } else
              if ((data.length > 0) && (idUsuario!=null)){ // alteracao no banco
              $ionicLoading.hide();
              $scope.gravaUsuario(usuario);
            } else   if ((data.length == 0) && (idUsuario!=null)){ // so esta trocando o numero do telefone p/ usuario ja cadastrado
              $ionicLoading.hide();
              $scope.gravaUsuario(usuario);
            } else if ((data.length == 0) && (idUsuario==null)){
              $ionicLoading.hide();
              $scope.gravaUsuario(usuario);
            };

        }).error(function(data){
          $ionicLoading.hide();
          $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

        });


}


$scope.gravaUsuario = function(usuario){
       $ionicLoading.show({
        template: 'Enviando...'
      });

 //  delete $scope.usuario;
 //  $scope.usuarioForm.$setPristine();

    if ((idUsuario==0) || (idUsuario==null)) {
    var today = new Date();
    var dt =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
    var valores = {
      parametros:'gravarUsuario',
      nome:usuario.nome,
      endereco:usuario.endereco,
      localizacao:usuario.localizacao,
      latitude:$scope.latitude,
      longitude:$scope.longitude,
      data_cadastro:dt,
      rg:usuario.rg,
      email:usuario.email,
      data_nascimento:usuario.data_nascimento,
      telefone:usuario.telefone,
      foto:usuario.foto_perfil,
      idpush:localStorage.getItem('tokem')

    }


    }else{
     var valores = {
      parametros:'atualizaUsuario',
      nome:usuario.nome,
      endereco:usuario.endereco,
      latitude:$scope.latitude,
      longitude:$scope.longitude,
      localizacao:$scope.localizacao,
      data_cadastro:dt,
      data_nascimento:usuario.data_nascimento,
      rg:usuario.rg,
      telefone:usuario.telefone,
      foto:usuario.foto_perfil,
      email:usuario.email,
      idpush:localStorage.getItem('tokem'),
      idusuario:idUsuario
    }}

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){

           if (data[0].idusuario){
            idUsuario=data[0].idusuario;
            endereco=data[0].endereco;

            $scope.idusuario=data[0].idusuario;
            localStorage.setItem('idusuario', data[0].idusuario);
            localStorage.setItem('nome', usuario.nome);
            localStorage.setItem('email', usuario.email);
            localStorage.setItem('endereco', usuario.endereco);
            localStorage.setItem('telefone', usuario.telefone);
            localStorage.setItem('rg', usuario.rg);
            localStorage.setItem('data_nascimento', usuario.data_nascimento);
            localStorage.setItem('foto_perfil', usuario.foto_perfil);

            $ionicLoading.hide();

            if (usuario.tipo!='Residencial'){
                $scope.showAlert('Atenção','Usuário '+usuario.nome+', cadastrado com sucesso.')
            }
            else {
              {
                  $scope.showAlert('Informação','Usuário '+usuario.nome+' atualizado com sucesso!')
              }
            }


            $scope.closeUsuario();

           }else{
               $ionicLoading.hide();
               $scope.showAlert('Informação','erro ao cadastrar usuário '+usuario.nome+' esta ativo, por favor entre em contato com o administrador do sistema.');
           }

        }).error(function(data){
          $ionicLoading.hide();
          $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

        });


}


$scope.pegaLocal = function(){

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      $http({
          method:'POST',
          url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.latitude+","+$scope.longitude,
          datatype: 'jsonp',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
             $scope.msgvideo.localizacao =data.results[0].formatted_address;
             $scope.msgfoto.localizacao =data.results[0].formatted_address;
             $scope.msgtexto.localizacao =data.results[0].formatted_address;
             $scope.localizacao =data.results[0].formatted_address;

             $scope.endereco =data.results[0].formatted_address;
             $scope.bairro=data.results[1].formatted_address;
             $scope.usuario.localizacao =data.results[0].formatted_address;
          //   console.log(data);
             /**
             $scope.cidade =
             $scope.estado =
             **/
          }).error(function(data){

             $scope.showAlert('Para continuar ative o Localizador do seu celular','Não foi possível pegar sua localização com o GPS.'); // error

          });

    }, function(err) {
            $scope.showAlert('Para continuar ative o Localizador do seu celular','Não foi possível pegar sua localização com o GPS.'); // error
    });

};

// inicio popup
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    //console.log('Tapped!', res);
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title:titulo,
     template: template
   });

   confirmPopup.then(function(res) {
     if(res) {
       //console.log('You are sure');
     } else {
       //console.log('You are not sure');
     }
   });
 };
 // An alert dialog
 $scope.showAlert = function(titulo,template) {
   var alertPopup = $ionicPopup.alert({
     title: titulo,
     template: template
   });

   alertPopup.then(function(res) {
    // //console.log('Thank you for not eating my delicious ice cream cone');
   });

 };
//   fim popup
$scope.carregarFotoPerfil = function(opc){

      var options = {
        quality: 70,
        destinationType: Camera.DestinationType.DATA_URI,
        sourceType: opc,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: true,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {

       $scope.usuario.foto_perfil  =  imageData;
       $scope.btnMsg = false;
       $scope.msgFoto = true;

      }, function(err) {
         alert ('captura de foto cancelada.');
      });

}





})  // fim mensgaemCtrl

.controller('cashbackCtrl', function($scope,   $cordovaCapture, $cordovaStatusbar,  $state, $cordovaNetwork,  $cordovaGeolocation, $cordovaToast, $http, Conexao, $cordovaContacts, $cordovaSocialSharing, $ionicModal, $cordovaCamera, $ionicLoading, $cordovaFileTransfer,  $timeout, $ionicPopup)  {

document.addEventListener('deviceready',function(){ // inicia o aplicativo



   }, false);


$scope.verificaNet = function(){

  var type = $cordovaNetwork.getNetwork()
  var isOnline = $cordovaNetwork.isOnline()

  if (isOnline==false){
     $scope.showAlert('Informação','Vc esta sem conexão de dados, por favor ative sua conexao de dados para ter acesso aos dados do aplicativo.');

   }
}

$scope.vercashBack = function(index){
  $scope.cashback={};

  $scope.cashback.idcashback= $scope.listaCash[index].idcashback;
  $scope.cashback.nome= $scope.listaCash[index].nome;
  $scope.cashback.telefone= $scope.listaCash[index].telefone;
  $scope.cashback.percentual_cliente= $scope.listaCash[index].percentual_cliente;
  $scope.cashback.titulo= $scope.listaCash[index].titulo;
  $scope.cashback.descricao= $scope.listaCash[index].descricao;
  $scope.cashback.foto= $scope.listaCash[index].foto;
  $scope.cashback.categoria = $scope.listaCash[index].categoria;
  $scope.cashback.latitude =$scope.listaCash[index].latitude;
  $scope.cashback.longitude = $scope.listaCash[index].longitude;
  $scope.cashback.endereco = $scope.listaCash[index].endereco;

  $scope.tab_cashBack();

}



$scope.pegacashback = function(){
var valores = {
  parametros:'pegaCashBack',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaCash = data;
          console.log(data);
        });
};



$scope.pegaLocal = function(){

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      $http({
          method:'POST',
          url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.latitude+","+$scope.longitude,
          datatype: 'jsonp',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
             $scope.msgvideo.localizacao =data.results[0].formatted_address;
             $scope.msgfoto.localizacao =data.results[0].formatted_address;
             $scope.msgtexto.localizacao =data.results[0].formatted_address;
             $scope.localizacao =data.results[0].formatted_address;

             $scope.endereco =data.results[0].formatted_address;
             $scope.bairro=data.results[1].formatted_address;
             $scope.usuario.localizacao =data.results[0].formatted_address;
          //   console.log(data);
             /**
             $scope.cidade =
             $scope.estado =
             **/
          }).error(function(data){

             $scope.showAlert('Para continuar ative o Localizador do seu celular','Não foi possível pegar sua localização com o GPS.'); // error

          });

    }, function(err) {
            $scope.showAlert('Para continuar ative o Localizador do seu celular','Não foi possível pegar sua localização com o GPS.'); // error
    });

};

// inicio popup
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    //console.log('Tapped!', res);
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title:titulo,
     template: template
   });

   confirmPopup.then(function(res) {
     if(res) {
       //console.log('You are sure');
     } else {
       //console.log('You are not sure');
     }
   });
 };
 // An alert dialog
 $scope.showAlert = function(titulo,template) {
   var alertPopup = $ionicPopup.alert({
     title: titulo,
     template: template
   });

   alertPopup.then(function(res) {
    // //console.log('Thank you for not eating my delicious ice cream cone');
   });

 };
//   fim popup
$scope.carregaMapa = function(mylatitude, mylongitude) {
    $scope.mapa.msg="Aguarde, carregando mapa...";
    $scope.pegaLocal();


    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var directionsService = new google.maps.DirectionsService();
      var info = new google.maps.InfoWindow({maxWidth:200});

      var mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var mymap = new google.maps.Map(document.getElementById("map"), mapOptions);
      console.log(mymap);
      console.log(document.getElementById("map"));
      var marker = new google.maps.Marker({
        position: latLng,
        title: 'Sua localização atual.',
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        icon: 'ico/usuario.png',
        map: mymap,
        animation: google.maps.Animation.DROP
      });
  marker.setMap(null);

  var directionsDisplay = new google.maps.DirectionsRenderer();
  var request = {
      origin: marker.position,
      destination: new google.maps.LatLng(mylatitude,mylongitude),
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        var titulo = document.getElementById('titulo');
        summaryPanel.innerHTML = '';
        titulo.innerHTML=
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(mymap);
      //  alert ('de '+route.legs[i].start_address + ' até '+route.legs[i].end_address + '  distância de '+route.legs[i].distance.text +' Tempo'+route.legs[0].duration.text);
        /*
        $scope.mapa.endereco= route.legs[0].end_address;
        $scope.mapa.distancia=route.legs[0].distance.text;
        $scope.mapa.tempo = route.legs[0].duration.text;

        */
    //    summaryPanel.innerHTML += '<h5>Origem : ' + route.legs[0].start_address +'</h5><br>';
    //    summaryPanel.innerHTML += '<h5>Destino : ' + route.legs[0].end_address +'</h5><br>';
        titulo.innerHTML='<h5 style="color:#ffffff;" >'+route.legs[0].end_address+'</h5>';
        summaryPanel.innerHTML += '<h5 style="color:#ffffff;" >Distânçia: ' + route.legs[0].distance.text + '    -     Tempo: ' + route.legs[0].duration.text +'</h5>';
      }
  });
  $scope.mapa.msg="";
    }, function(error){
        $scope.mapa.msg="";
        alert("Por favor, ative a localizacão do seu celular e retorne.");

    });

};// da funcao

$scope.attachSecretMessage = function(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
});
google.maps.event.addListener(marker,'click', function() {
         infowindow.open(marker.get('map'), marker);

});

}



//===========================================================================================

$ionicModal.fromTemplateUrl('templates/tab-localizacao.html', {
    scope: $scope,
    animation: 'slide-in-up',
    hardwareBackButtonClose: true
  }).then(function(mapalocalizacao) {
    $scope.mapalocalizacao = mapalocalizacao;
});

$scope.verlocalizacao = function(opc) {
   $scope.carregaMapa($scope.cashback.latitude, $scope.cashback.longitude);
   $scope.mapalocalizacao.show();
};

$scope.closelocalizacao = function() {
   $scope.mapalocalizacao.hide();
//    $scope.mapalocalizacao.remove();
};


$ionicModal.fromTemplateUrl('templates/tab-redecash.html', {
    scope: $scope
  }).then(function(redecash) {
    $scope.redecash = redecash;
});

$scope.closeredeCash = function() {
    $scope.redecash.hide();
};

$scope.redeCash = function() {
   $scope.pegacashback();
   $scope.redecash.show();
};

$ionicModal.fromTemplateUrl('templates/tab-mostra-cupom-cash.html', {
    scope: $scope
  }).then(function(cashBack) {
    $scope.cashBack = cashBack;
});

$scope.closecashBack = function() {
    $scope.cashBack.hide();
};

$scope.tab_cashBack = function() {
   $scope.cashBack.show();
};




})  // fim cashback


.controller('DescontoCtrl', function($scope,   $cordovaCapture, $cordovaStatusbar,  $state, $cordovaNetwork,  $cordovaGeolocation, $cordovaToast, $http, Conexao, $cordovaContacts, $cordovaSocialSharing, $ionicModal, $cordovaCamera, $ionicLoading, $cordovaFileTransfer,  $timeout, $ionicPopup)  {

  $scope.verificaNet = function(){

    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()

    if (isOnline==false){
       $scope.showAlert('Informação','Vc esta sem conexão de dados, por favor ative sua conexao de dados para ter acesso aos dados do aplicativo.');

     }
  }


  $scope.verdesconto = function(index){

    $scope.desconto={};


    $scope.desconto.iddesconto= $scope.listaDesconto[index].iddesconto;
    $scope.desconto.nome= $scope.listaDesconto[index].nome;
    $scope.desconto.telefone= $scope.listaDesconto[index].telefone;
    $scope.desconto.valor_normal= $scope.listaDesconto[index].valor_normal;
    $scope.desconto.valor_desconto= $scope.listaDesconto[index].valor_desconto;
    $scope.desconto.valor_percentual_cliente= $scope.listaDesconto[index].valor_percentual_cliente;
    $scope.desconto.titulo= $scope.listaDesconto[index].titulo;
    $scope.desconto.descricao= $scope.listaDesconto[index].descricao;
    $scope.desconto.foto= $scope.listaDesconto[index].foto;
    $scope.desconto.categoria = $scope.listaDesconto[index].categoria;
    $scope.desconto.latitude =$scope.listaDesconto[index].latitude;
    $scope.desconto.longitude = $scope.listaDesconto[index].longitude;
    $scope.desconto.endereco = $scope.listaDesconto[index].endereco;
    $scope.tab_Desconto();

  }


  $scope.pegaDesconto = function(){
  var valores = {
    parametros:'pegaDesconto',
    pagina:0
  }
      $http({
            method:'POST',
            url: path+'api/api.php',
            data: valores,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
            $scope.listaDesconto = data;
          });
  };


  $scope.pegaLocal = function(){

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;

        $http({
            method:'POST',
            url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.latitude+","+$scope.longitude,
            datatype: 'jsonp',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
               $scope.msgvideo.localizacao =data.results[0].formatted_address;
               $scope.msgfoto.localizacao =data.results[0].formatted_address;
               $scope.msgtexto.localizacao =data.results[0].formatted_address;
               $scope.localizacao =data.results[0].formatted_address;

               $scope.endereco =data.results[0].formatted_address;
               $scope.bairro=data.results[1].formatted_address;
               $scope.usuario.localizacao =data.results[0].formatted_address;
            //   console.log(data);
               /**
               $scope.cidade =
               $scope.estado =
               **/
            }).error(function(data){

               $scope.showAlert('Para continuar ative o Localizador do seu celular','Não foi possível pegar sua localização com o GPS.'); // error

            });

      }, function(err) {
              $scope.showAlert('Para continuar ative o Localizador do seu celular','Não foi possível pegar sua localização com o GPS.'); // error
      });

  };

  // inicio popup
  $scope.showPopup = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi">',
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      //console.log('Tapped!', res);
    });

    $timeout(function() {
       myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);
   };
   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title:titulo,
       template: template
     });

     confirmPopup.then(function(res) {
       if(res) {
         //console.log('You are sure');
       } else {
         //console.log('You are not sure');
       }
     });
   };
   // An alert dialog
   $scope.showAlert = function(titulo,template) {
     var alertPopup = $ionicPopup.alert({
       title: titulo,
       template: template
     });

     alertPopup.then(function(res) {
      // //console.log('Thank you for not eating my delicious ice cream cone');
     });

   };
  //   fim popup

  $scope.carregaMapa = function(mylatitude, mylongitude) {
      $scope.mapa.msg="Aguarde, carregando mapa...";
      $scope.pegaLocal();


      var options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var directionsService = new google.maps.DirectionsService();
        var info = new google.maps.InfoWindow({maxWidth:200});

        var mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var mymap = new google.maps.Map(document.getElementById("map"), mapOptions);
        console.log(mymap);
        console.log(document.getElementById("map"));
        var marker = new google.maps.Marker({
          position: latLng,
          title: 'Sua localização atual.',
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          icon: 'ico/usuario.png',
          map: mymap,
          animation: google.maps.Animation.DROP
        });
    marker.setMap(null);

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var request = {
        origin: marker.position,
        destination: new google.maps.LatLng(mylatitude,mylongitude),
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          var route = response.routes[0];
          var summaryPanel = document.getElementById('directions-panel');
          var titulo = document.getElementById('titulo');
          summaryPanel.innerHTML = '';
          titulo.innerHTML=
          directionsDisplay.setDirections(response);
          directionsDisplay.setMap(mymap);
          titulo.innerHTML='<h5 style="color:#ffffff;" >'+route.legs[0].end_address+'</h5>';
          summaryPanel.innerHTML += '<h5 style="color:#ffffff;" >Distânçia: ' + route.legs[0].distance.text + '    -     Tempo: ' + route.legs[0].duration.text +'</h5>';
        }
    });
    $scope.mapa.msg="";
      }, function(error){
          $scope.mapa.msg="";
          alert("Por favor, ative a localizacão do seu celular e retorne.");

      });

  };// da funcao

  $scope.attachSecretMessage = function(marker, secretMessage) {
    var infowindow = new google.maps.InfoWindow({
      content: secretMessage
  });
  google.maps.event.addListener(marker,'click', function() {
           infowindow.open(marker.get('map'), marker);

  });

  }

// modal
  $ionicModal.fromTemplateUrl('templates/tab-localizacao-desconto.html', {
      scope: $scope,
      animation: 'slide-in-up',
      hardwareBackButtonClose: true
    }).then(function(mapalocalizacaodesconto) {
      $scope.mapalocalizacaodesconto = mapalocalizacaodesconto;
  });

  $scope.verlocalizacao = function() {
     $scope.carregaMapa($scope.desconto.latitude, $scope.desconto.longitude);
     $scope.mapalocalizacaodesconto.show();
  };

  $scope.closelocalizacao = function() {
      $scope.mapalocalizacaodesconto.hide();
      $scope.mapalocalizacao.remove();
  };



  $ionicModal.fromTemplateUrl('templates/tab-rededesconto.html', {
      scope: $scope
    }).then(function(rededesconto) {
      $scope.rededesconto = rededesconto;
  });

  $scope.closeredeDesconto= function() {
      $scope.rededesconto.hide();
  };

  $scope.redeDesconto = function() {
     $scope.pegaDesconto();
     $scope.rededesconto.show();
  };

  $ionicModal.fromTemplateUrl('templates/tab-mostra-cupom-desconto.html', {
      scope: $scope
    }).then(function(cupomdesconto) {
      $scope.cupomdesconto = cupomdesconto;
  });

  $scope.closeDesconto = function() {
      $scope.cupomdesconto.hide();
  };

  $scope.tab_Desconto = function() {
     $scope.cupomdesconto.show();
  };



})


.controller('MapCtrl', function($scope, $state, $http, $cordovaGeolocation, $ionicLoading) {
//$scope.listaMap=[];

// teste de funcao mapa
alert ('mapa')
$scope.idmensagemMap="";
$scope.qtdMensagemNova="Mapa de Mensagens...";
$scope.carregaMapa = function() {
//  alert ('mapa')
  $ionicLoading.show({template: 'Carregando...'});

  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };



    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      title: 'Sua localização atual!',
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'ico/usuario.png',
      map: $scope.map,
      animation: google.maps.Animation.DROP
    });

/// inicio do ajax

    var valores = {
      parametros:'pegaStatusMapa',
      pagina:0,
      status:'Privada'
    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){

//         $scope.listaMap=[];

         for (var i = 0; i < data.length; i++) {
              if (i==0){
                      $scope.idmensagemMap=data[0].idmensagem;
                      $scope.idmensagemMapAtual=data[0].idmensagem;

                    }

              data[i].data_hora=new Date(data[i].data_hora);
              if (data[i].assunto=="Saúde"){
                 var icone = 'ico/saude.png';
              }else if (data[i].assunto=="Outros Assuntos"){
                var icone = 'ico/outros.png';
              }else if (data[i].assunto=="Educação"){
                var icone = 'ico/educacao.png';
              }else if (data[i].assunto=="Transporte"){
                var icone = 'ico/transporte.png';
              }else if (data[i].assunto=="Segurança"){
                var icone = 'ico/seguranca.png';
              }else if (data[i].assunto=="Saneamento Básico"){
                var icone = 'ico/saneamento.png';
              }else if (data[i].assunto=="Iluminação Pública"){
                var icone = 'ico/iluminacao.png';
              }else if (data[i].assunto=="Meio Ambiente"){
                var icone = 'ico/meio.png';
              };
  //           $scope.listaMap.push(angular.copy(data[i]));

              var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
//                 title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 icon: icone,
                 map: $scope.map,
                 animation: google.maps.Animation.DROP
                });

 //                title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,

                var contentString = '<div><h4>'+data[i].assunto +'</h4>'+
                                    '<h4 style="color:blue"><p><b>'+ data[i].nome+'</b></p></h4>'+
                                    '<h5><p><b>'+ data[i].descricao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].localizacao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].endereco +'</b></p></h5></div>';
              $scope.attachSecretMessage(marker, contentString);

      };//fim do laco




  }); // fim do ajax

  }, function(error){
   $ionicLoading.hide();
//    alert("Por favor,  ligue a localizacão do seu celular.");
  });

 $ionicLoading.hide();

};// da funcao
$scope.carregaMapa();




// funcao carrega pontos
$scope.carregaPonto = function() {

  $ionicLoading.show({template: 'Carregando...'});
//  alert ('ponto')
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };



    $scope.map = new google.maps.Map(document.getElementById("ponto"), mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      title: 'Sua localização atual!',
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      icon: 'ico/usuario.png',
      map: $scope.map,
      animation: google.maps.Animation.DROP
    });

/// inicio do ajax

    var valores = {
      parametros:'pegaStatusMapaPonto'

    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){

//         $scope.listaMap=[];

         for (var i = 0; i < data.length; i++) {
              if (i==0){
                      $scope.idmensagemMap=data[0].idusuario;
                      $scope.idmensagemMapAtual=data[0].idusuario;

                    }

              data[i].data_hora=new Date(data[i].data_hora);
              if (data[i].tipo_material=="Bateria"){
                 var icone = 'ico/saude.png';
              }else if (data[i].tipo_material=="Papelao"){
                var icone = 'ico/meio.png';
              };
  //           $scope.listaMap.push(angular.copy(data[i]));

              var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
//                 title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 icon: icone,
                 map: $scope.map,
                 animation: google.maps.Animation.DROP
                });

 //                title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,

                var contentString = '<div><h4>'+data[i].nome +'</h4>'+
                                    '<h4 style="color:blue"><p><b>'+ data[i].referencia+'</b></p></h4>'+
                                    '<h5><p><b>'+ data[i].tipo_material +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].localizacao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].endereco +'</b></p></h5></div>';
              $scope.attachSecretMessage2(marker, contentString);

      };//fim do laco




  }); // fim do ajax

  }, function(error){
   $ionicLoading.hide();
//    alert("Por favor, ligue a localizacão do seu celular.");
  });

 $ionicLoading.hide();

};// da funcao


$scope.carregaPonto();







$scope.paginaMap= function(){
  /// inicio do ajax


    var valores = {
      parametros:'paginaStatusMapa',
      idmensagem: $scope.idmensagemMapAtual,
      status:'Privada'
    }

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){



         for (var i = 0; i < data.length; i++) {
              if (i==0){
                      $scope.qtdMensagemNova="Novas Mensagens  #"+(data[0].idmensagem-$scope.idmensagemMap);
                      $scope.idmensagemMapAtual=data[0].idmensagem;
                  }
              data[i].data_hora=new Date(data[i].data_hora);

              if (data[i].assunto=="Saúde"){
                 var icone = 'ico/saude_novo.png';
              }else if (data[i].assunto=="Outros"){
                var icone = 'ico/outros_novo.png';
              }else if (data[i].assunto=="Educação"){
                var icone = 'ico/educacao_novo.png';
              }else if (data[i].assunto=="Transporte"){
                var icone = 'ico/transporte_novo.png';
              }else if (data[i].assunto=="Segurança"){
                var icone = 'ico/seguranca_novo.png';
              }else if (data[i].assunto=="Saneamento Básico"){
                var icone = 'ico/saneamento_novo.png';
              }else if (data[i].assunto=="Iluminação Pública"){
                var icone = 'ico/iluminacao_novo.png';
              }else if (data[i].assunto=="Meaio Ambiente"){
                var icone = 'ico/meio_novo.png';
              };
// adiciona a lista
    //         $scope.listaMap.push(angular.copy(data[i]));

              var marker = new google.maps.Marker({
                 position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
//                 title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 icon: icone,
                 map: $scope.map,
                 animation: google.maps.Animation.DROP
                });

 //                title: data[i].assunto + " - "+ data[i].descricao + "  - Enviada por: "+ data[i].nome + " / "+data[i].localizacao,

                var contentString = '<div><h4>'+data[i].assunto +'</h4>'+
                                    '<h4 style="color:blue"><p><b>'+ data[i].nome+'</b></p></h4>'+
                                    '<h5><p><b>'+ data[i].descricao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].localizacao +'</b></p></h5>'+
                                    '<h5><p><b>'+ data[i].endereco +'</b></p></h5></div>';
              $scope.attachSecretMessage(marker, contentString);

      };//fim do laco




  });
}

// incio
$scope.attachSecretMessage = function(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
});
google.maps.event.addListener(marker,'click', function() {
         infowindow.open(marker.get('map'), marker);

});

}

$scope.attachSecretMessage2 = function(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
});
google.maps.event.addListener(marker,'click', function() {
         infowindow.open(marker.get('ponto'), marker);

});

}

// fim

/*
var intervalo = window.setInterval(function() {

   $scope.paginaMap();


}, 10000);

window.setTimeout(function() {
    clearInterval(intervalo);
    alert ('teste')
},30000);
*/


})
