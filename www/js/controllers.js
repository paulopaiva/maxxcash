angular.module('starter.controllers', [])
.controller('StatusCtrl', function($scope,   $cordovaCapture, $cordovaStatusbar,  $state, $cordovaNetwork,  $cordovaGeolocation, $cordovaToast, $http, Conexao, $cordovaContacts, $cordovaSocialSharing, $ionicModal, $cordovaCamera, $ionicLoading, $cordovaFileTransfer,  $timeout, $ionicPopup)  {


if (start==0) {
    $scope.classificado ={};
    $scope.mapa={};
    $scope.classificado.foto="images/foto.jpg";
    $scope.classificado.status_finaliza="Vendi pelo Aplicativo";
    $scope.foto="";
    $scope.classefoto="foto-avatar";
    $scope.lista = [];
    $scope.listaComentario = [];
    $scope.listaCurtir = [];
    $scope.btnFinalizar= true;
    $scope.btnMsg = true;
    $scope.msgFoto = false;
    $scope.msgVideo = false;
    $scope.msgTexto = false;
    $scope.onTv=false;
    $scope.onRadio=false;
    $scope.titulo="";
    $scope.template="";
    $scope.agendamento = {};
    $scope.form = {};
    $scope.usuario={};
    $scope.msgvideo={};
    $scope.msgfoto={};
    $scope.msgtexto={};
    $scope.classe_curtir="";
    $scope.classe_compartilhar="";
    $scope.classe_comentar="";
    $scope.idorgao="0";
    $scope.idmensagem="";
    $scope.quantidade="";
    $scope.descricao="";
    $scope.latitude="";
    $scope.longitude="";
    $scope.data_hora="";
    $scope.endereco="";
    $scope.status="";
    $scope.bairro="";
    $scope.area="";
    $scope.status="";
    $scope.foto_file="";
    $scope.foto_file_path="";
    $scope.video_file="";
    $scope.video_file_path="";
    $scope.currentPercentage=0;
    $scope.btn = false;
    $scope.onChat = false;
    $scope.idestabelecimento="";
    $scope.idcoletor="";
    $scope.data="";
    $scope.localizacao="";
    $scope.osb="";
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


//localStorage.clear();
//    localStorage.setItem('tema',"bar-energized");
//    localStorage.setItem('tab_tema',"tabs-background-energized");
//    localStorage.setItem('btn_tema',"button-energized");

/// inicio da funcao maoa'

document.addEventListener('deviceready',function(){ // inicia o aplicativo
  $cordovaStatusbar.style(2);

  // supported names: black, darkGray, lightGray, white, gray, red, green,
  // blue, cyan, yellow, magenta, orange, purple, brown
   $cordovaStatusbar.styleHex('#f5a80a');

    if (start2==0){
        start2=1;
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


$scope.gerarCupom_cash = function(index){
  $ionicLoading.show({
   template: 'Aguarde, gerando seu cupom...'
 });

  $scope.cashback={};
  var today = new Date();
  var dt_val = new Date();
  dt_val.setDate(today.getDate()+(parseInt($scope.listaCash[index].validade_dias)-1));
  var dt =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
  var dt_validade =dt_val.getFullYear()+"-"+(dt_val.getMonth()+1)+"-"+dt_val.getDate()+" "+dt_val.getHours()+":"+dt_val.getMinutes()+":"+dt_val.getSeconds();
  $scope.cashback.validade = dt_val.getDate()+"-"+(dt_val.getMonth()+1)+"-"+dt_val.getFullYear();
// Math.floor(Math.random() * 65536) - 32768;
  var numero = Math.floor(Math.random() * 9999999);
  var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
  var aleatorio = '';
  for (var i = 0; i < 3 ; i++) {
      var rnum = Math.floor(Math.random() * letras.length);
      aleatorio += letras.substring(rnum, rnum + 1);
  }
  var numero_cupom = aleatorio + ("0000000" + numero).slice(-7);
  var valores = {
    parametros:'gerarCupom_cash',
    idusuario:idUsuario,
    data: dt,
    data_hora : dt,
    data_validade:dt_validade,
    percentual_cliente :  $scope.listaCash[index].percentual_cliente ,
    percentual_rede : $scope.listaCash[index].percentual_rede ,
    percentual_total: $scope.listaCash[index].percentual_total,
    idlojista:$scope.listaCash[index].idlojista,
    status :"ABERTO",
    idcashback:$scope.listaCash[index].idcashback,
    numero_cupom:numero_cupom,
    pagina:0
  }

  $http({
        method:'POST',
        url: path+'api/api.php',
        data: valores,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
         $ionicLoading.hide();
         if (data[0].idcupom_cashback!=null) {

           $scope.cashback.numero_cupom= numero_cupom;
           $scope.cashback.idcashback= $scope.listaCash[index].idcashback;
           $scope.cashback.nome= $scope.listaCash[index].nome;
           $scope.cashback.telefone= $scope.listaCash[index].telefone;
           $scope.cashback.percentual_cliente= $scope.listaCash[index].percentual_cliente;
           $scope.cashback.titulo= $scope.listaCash[index].titulo;
           $scope.cashback.descricao= $scope.listaCash[index].descricao;
           $scope.cashback.foto= $scope.listaCash[index].foto;
           $scope.tab_cashBack();
         }
         else {
               $scope.showAlert('Atenção','vc já possui um cupom em aberto com a data de hoje para este Lojista, verifique seus cupons no menu lateral na opção Minha conta, meus cupons.');
         }

      });
$ionicLoading.hide();
}

$scope.gerarCupom_desconto = function(index){
$scope.desconto={};
$ionicLoading.show({
   template: 'Aguarde, gerando seu cupom...'
 });

 var valores = {
   parametros:'pegaqtd_cupom',
   iddesconto:$scope.listaDesconto[index].iddesconto,
   pagina:0
 }


 $http({
       method:'POST',
       url: path+'api/api.php',
       data: valores,
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function(data){
       $scope.desconto.qtd_disponivel= data[0].qtd_disponivel;

        if (parseInt($scope.desconto.qtd_disponivel)>0){
          //  qtd_disponivel: (parseInt($scope.listaDesconto[index].qtd_disponivel)-1),

          var today = new Date();
          var dt_val = new Date();
          dt_val.setDate(today.getDate()+(parseInt($scope.listaDesconto[index].validade_dias)-1));
          var dt =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
          var dt_validade =dt_val.getFullYear()+"-"+(dt_val.getMonth()+1)+"-"+dt_val.getDate()+" "+dt_val.getHours()+":"+dt_val.getMinutes()+":"+dt_val.getSeconds();
          $scope.desconto.validade = dt_val.getDate()+"-"+(dt_val.getMonth()+1)+"-"+dt_val.getFullYear();
        // Math.floor(Math.random() * 65536) - 32768;
          var numero = Math.floor(Math.random() * 9999999);
          var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
          var aleatorio = '';
          for (var i = 0; i < 3 ; i++) {
              var rnum = Math.floor(Math.random() * letras.length);
              aleatorio += letras.substring(rnum, rnum + 1);
          }
          var numero_cupom = aleatorio + ("0000000" + numero).slice(-7);
          var valores = {
            parametros:'gerarCupom_desconto',
            idusuario:idUsuario,
            data: dt,
            data_hora : dt,
            data_validade:dt_validade,
            valor_normal :  $scope.listaDesconto[index].valor_normal ,
            valor_desconto : $scope.listaDesconto[index].valor_desconto ,
            idlojista:$scope.listaDesconto[index].idlojista,
            status :"ABERTO",
            iddesconto:$scope.listaDesconto[index].iddesconto,
            numero_cupom:numero_cupom,
            pagina:0
          }

          // ok

          $http({
                method:'POST',
                url: path+'api/api.php',
                data: valores,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              }).success(function(data){

                 $ionicLoading.hide();
                 if (data[0].idcupom_desconto!=null) {

                   $scope.desconto.numero_cupom= numero_cupom;
                   $scope.desconto.iddesconto= $scope.listaDesconto[index].iddesconto;
                   $scope.desconto.nome= $scope.listaDesconto[index].nome;
                   $scope.desconto.telefone= $scope.listaDesconto[index].telefone;
                   $scope.desconto.valor_normal= $scope.listaDesconto[index].valor_normal;
                   $scope.desconto.valor_desconto= $scope.listaDesconto[index].valor_desconto;
                   $scope.desconto.titulo= $scope.listaDesconto[index].titulo;
                   $scope.desconto.descricao= $scope.listaDesconto[index].descricao;
                   $scope.desconto.foto= $scope.listaDesconto[index].foto;

                  // dar baixa na quantidade
                  var valores = {
                    parametros:'atualizaqtd_cupom',
                    iddesconto:$scope.listaDesconto[index].iddesconto,
                    qtd_disponivel:(parseInt($scope.desconto.qtd_disponivel)-1),
                    pagina:0
                  }
                  $http({
                        method:'POST',
                        url: path+'api/api.php',
                        data: valores,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                      }).success(function(data){
      //                  $scope.qtd_disponivel = data[0].qtd_disponivel;
                      });
                   $scope.tab_Desconto();
                 }
                 else {
                       $scope.showAlert('Atenção','vc já possui um cupom em aberto com a data de hoje para esta oferta, verifique seus cupons no menu lateral na opção Minha conta, meus cupons de desconto.');
                 }

              });
        }
        else {
          $scope.showAlert('Atenção','Não existe mais cupons para esta oferta.');
        }
 });
$ionicLoading.hide();
}



$scope.verAnuncio = function(index) {

  $scope.index=index;
  $scope.classificado.idclassificado= $scope.listaClassificado[index].idclassificado;
  $scope.classificado.nome= $scope.listaClassificado[index].nome;
  $scope.classificado.telefone= $scope.listaClassificado[index].telefone;
  $scope.classificado.bairro= $scope.listaClassificado[index].bairro;
  $scope.classificado.categoria= $scope.listaClassificado[index].categoria;
  $scope.classificado.titulo= $scope.listaClassificado[index].titulo;
  $scope.classificado.data_hora= $scope.listaClassificado[index].data_hora;
  $scope.classificado.preco= $scope.listaClassificado[index].preco;
  $scope.classificado.foto= $scope.listaClassificado[index].foto;
  $scope.classificado.descricao= $scope.listaClassificado[index].descricao;
  $scope.mostra_anuncio();

};

$scope.verMeuAnuncio = function(index) {

  $scope.index=index;
  $scope.classificado.idclassificado= $scope.listaMeusClassificado[index].idclassificado;
  $scope.classificado.nome= $scope.listaMeusClassificado[index].nome;
  $scope.classificado.telefone= $scope.listaMeusClassificado[index].telefone;
  $scope.classificado.bairro= $scope.listaMeusClassificado[index].bairro;
  $scope.classificado.categoria= $scope.listaMeusClassificado[index].categoria;
  $scope.classificado.titulo= $scope.listaMeusClassificado[index].titulo;
  $scope.classificado.data_hora= $scope.listaMeusClassificado[index].data_hora;
  $scope.classificado.preco= $scope.listaMeusClassificado[index].preco;
  $scope.classificado.foto= $scope.listaMeusClassificado[index].foto;
  $scope.classificado.descricao= $scope.listaMeusClassificado[index].descricao;
  $scope.mostra_anuncio_finaliza();

};

$scope.cameraPopup = function (){
    var confirm = $ionicPopup.alert({
      title: "Origem da Foto",
      body: " <i class='ion-camera'>Selecione o dispositivo</i>",
      buttons: [{text: "Camêra",
                 type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFoto(1);
                  },

               },{text: "Galeria",
                  type: 'button-positive',
                  onTap: function (){
                    $scope.carregarFoto(2);
                  }


             }]
    });
};

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

$scope.pegaCategoria = function(){
var valores = {
  parametros:'pegaCategoria',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaCategoria = data;
        });
};

$scope.pegaClassificado = function(){
var valores = {
  parametros:'pegaClassificado',
  pagina:0
}
    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaClassificado = data;
        });
};

$scope.pegaMeusClassificado = function(){
var valores = {
  parametros:'pegaMeusClassificado',
  idusuario:idUsuario,
  pagina:0
}

    $http({
          method:'POST',
          url: path+'api/api.php',
          data: valores,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          $scope.listaMeusClassificado = data;
        });
};

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



$scope.pegaStatus = function(){

var valores = {
  parametros:'pegaStatus',
  pagina:0,
  status:'Privada'

}
       $ionicLoading.show({
        template: 'Carregando feed de mensagens...'
      });

$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){


    $scope.lista = [];

     for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
       //   data[i].perfil= path+"perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          if ((data[i].perfil==null) || (data[i].perfil=="") || (data[i].perfil=="images/foto.jpg")){
             data[i].perfil= "perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          }
      $scope.lista.push(angular.copy(data[i]));

     };
    });
$ionicLoading.hide();
}


// recarregar o status de mensgens quado chegar ao final do scroll
$scope.paginacao = function(){

var valores = {
  parametros:'pegaStatus',
  pagina:$scope.lista.length,
  status:'Privada'
}
       $ionicLoading.show({
        template: 'Carregando feed de mensagens...'
      });
$scope.btn = false;

if ($scope.lista.length>1){
$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
 //     console.log($scope.lista.length);
//      if ($scope.lista.length>0){
    if(data.length == 0){

        $scope.btn = true;

     }else{

      for (var i = 0; i < data.length; i++) {

          data[i].data_hora=new Date(data[i].data_hora);
       //   data[i].perfil= path+"perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          if ((data[i].perfil==null) || (data[i].perfil=="") || (data[i].perfil=="images/foto.jpg")){
             data[i].perfil= "perfil/"+data[i].nome.toUpperCase().substring(0,1)+".jpg";
          }
 //     //console.log(data[i].nome);
      $scope.lista.push(angular.copy(data[i]));

//     };
     }
     }
    $scope.$broadcast('scroll.infiniteScrollComplete');
//    $scope.$broadcast('scroll.refreshComplete');

    }).error(function(data){
    $scope.$broadcast('scroll.infiniteScrollComplete');

    });

}
$ionicLoading.hide();

}


$scope.mostraFoto = function(foto,titulo) {

  if (foto!=""){
   var alertPopup = $ionicPopup.alert({
     title: titulo,
     template: '<img class="full-image" src="'+foto+'" ></img>'
   });
   alertPopup.then(function(res) {
     // acao apos precionar ok.
   });
   }
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

$scope.enviarAnuncio = function(formulario){

      $ionicLoading.show({
        template: 'Enviando...'
      });

      $scope.currentPercentage=0;

        $scope.dataURL = $scope.classificado.foto;
        var today = new Date();
        $scope.foto_file="img_file-"+today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds()+today.getMilliseconds()+".jpg";
        $scope.foto_file_path=path+'foto/'+$scope.foto_file;
       // enviar o arquivo compactado *******************************************

        var url = path+"uploadftp_foto.php";
        //File for Upload
        var targetPath =$scope.dataURL;
        // File name only
        var filename = $scope.foto_file;
        var options = {
             fileKey: "file",
             fileName: filename,
             chunkedMode: false,
             mimeType: "image/jpg",
         params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
         };
         $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            // //console.log("SUCCESS: " + JSON.stringify(result.response));
             $scope.gravarAnuncio(formulario);
           //  $scope.fotoForm.$setPristine();

         }, function (err) {
             $ionicLoading.hide();
             $scope.showAlert("Erro ao Enviar Imagem", JSON.stringify(err));
         }, function (progress) {
                 if (progress.lengthComputable) {
                   var perc = Math.floor(progress.loaded / progress.total * 100);
                   $scope.currentPercentage=perc;
                }
         });


};


$scope.atualizarAnuncio = function(){

      $ionicLoading.show({
        template: 'Enviando...'
      });

      $scope.currentPercentage=0;

        $scope.dataURL = $scope.classificado.foto;
        var today = new Date();
        $scope.foto_file="img_file-"+today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+"-"+today.getHours()+"-"+today.getMinutes()+"-"+today.getSeconds()+today.getMilliseconds()+".jpg";
        $scope.foto_file_path=path+'foto/'+$scope.foto_file;
       // enviar o arquivo compactado *******************************************

        var url = path+"uploadftp_foto.php";
        //File for Upload
        var targetPath =$scope.dataURL;
        // File name only
        var filename = $scope.foto_file;
        var options = {
             fileKey: "file",
             fileName: filename,
             chunkedMode: false,
             mimeType: "image/jpg",
         params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
         };
         $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            // //console.log("SUCCESS: " + JSON.stringify(result.response));
             $scope.atualizar_Anuncio();
           //  $scope.fotoForm.$setPristine();

         }, function (err) {
             $ionicLoading.hide();
             $scope.showAlert("Erro ao Enviar Imagem", JSON.stringify(err));
         }, function (progress) {
                 if (progress.lengthComputable) {
                   var perc = Math.floor(progress.loaded / progress.total * 100);
                   $scope.currentPercentage=perc;
                }
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


$scope.limpaAnuncio = function(){

$scope.classificado.titulo="";
$scope.classificado.descricao="";
$scope.classificado.categoria="";
$scope.classificado.preco="";
$scope.classificado.localizacao="";
$scope.classificado.latitude="";
$scope.classificado.longitude="";
$scope.classificado.data_hora="";
$scope.foto_file_path="";
$scope.bairro="";
$scope.classificado.foto="images/foto.jpg";
$scope.classefoto="foto-avatar";
}

$scope.gravarAnuncio = function(dados){
if (idUsuario!=""){
var today = new Date();
$scope.data_hora=today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
if ($scope.endereco==null){
  $scope.endereco=" ";
}

var valores = {
  parametros:'gravarAnuncio',
  pagina:0,
  titulo:dados.titulo,
  descricao:dados.descricao,
  categoria:dados.categoria,
  preco:dados.preco,
  localizacao:$scope.localizacao,
  latitude:$scope.latitude,
  longitude:$scope.longitude,
  idusuario:idUsuario,
  status:"NOVO",
  data_hora:$scope.data_hora,
  foto:$scope.foto_file_path,
  bairro:$scope.bairro

}



$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
  //     console.log(data);
       $ionicLoading.hide();
       $scope.classificado = {};
//      $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')
       $scope.closecad_classificado();
       $scope.limpaAnuncio();
//       $scope.listaClassificado=[];
//       $scope.pegaClassificado();

       $scope.showAlert('Informação','Seu anúncio em breve estará publicado, agurade.');

    }).error(function(data){
       $ionicLoading.hide();
       $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

    });
 } else {
       $scope.showAlert('Informação','Para fazer anúcios vc precisa primeiro se cadastrar no aplicativo. Se vc estiver tendo dificudades em fazer o cadatro entre em contato com o suporte pelo email: paulospcoelho@hotmail.com');

 }
}

$scope.atualizar_Anuncio = function(){

var valores = {
  parametros:'atualizarAnuncio',
  pagina:0,
  idclassificado:$scope.classificado.idclassificado,
  titulo:$scope.classificado.titulo,
  descricao:$scope.classificado.descricao,
  categoria:$scope.classificado.categoria,
  preco:$scope.classificado.preco,
  idclassificado:$scope.classificado.idclassificado

}

$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
  //     console.log(data);
       $ionicLoading.hide();

//      $scope.showAlert('Informação','Sua mensagem foi enviada com sucesso!')
       $scope.close_editaranuncio();
//       $scope.limpaAnuncio();
//       $scope.listaClassificado=[];
//       $scope.pegaClassificado();

       $scope.showAlert('Informação','Seu anúncio em breve estará atualizado, agurade.');

    }).error(function(data){
       $ionicLoading.hide();
       $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

    });
}



$scope.salvarFinalizar = function(){

  var today = new Date();
  var dt =today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

var valores = {
  parametros:'salvarFinalizar',
  pagina:0,
  idclassificado:$scope.classificado.idclassificado,
  status_finaliza:$scope.classificado.status_finaliza,
  status:'FINALIZADO',
  data_finalizado:dt

}


$http({
      method:'POST',
      url: path+'api/api.php',
      data: valores,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
       $scope.showAlert('Informação','Seu anúncio foi finalizado.');
      $scope.close_confirma_finalizacao();
      $scope.close_anuncio_finaliza();
    }).error(function(data){
  //     $ionicLoading.hide();
       $scope.showAlert('Informação','erro ao enviar a mensagem, sem conexão com a internet.');

    });
}


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
$scope.carregarFoto = function(opc){

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

     $scope.foto  =  imageData;
     $scope.classificado.foto =  imageData;
     $scope.classefoto="foto-perfil";
     $scope.btnMsg = false;
     $scope.msgFoto = true;

    }, function(err) {
       alert ('captura de foto cancelada.')
    });



}

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

$ionicModal.fromTemplateUrl('templates/tab-localizacao.html', {
    scope: $scope
  }).then(function(mapalocalizacao) {
    $scope.mapalocalizacao = mapalocalizacao;
});

$scope.closelocalizacao = function() {
    $scope.mapalocalizacao.hide();
};

$scope.verlocalizacao = function(opc) {

  if (opc=="cashback"){
    lat=$scope.cashback.latitude;
    log=$scope.cashback.longitude;
  } else if (opc=="desconto") {
    lat=$scope.desconto.latitude;
    log=$scope.desconto.longitude;
  }


   $scope.carregaMapa(lat, log);
   $scope.mapalocalizacao.show();
};


/*


$ionicModal.fromTemplateUrl('templates/tab-localizacao-desconto.html', {
    scope: $scope
  }).then(function(mapalocalizacaodesconto) {
    $scope.mapalocalizacaodesconto = mapalocalizacaodesconto;
});

$scope.closelocalizacaodesconto = function() {
    $scope.mapalocalizacaodesconto.hide();
};
$scope.verlocalizacaodesconto = function() {
   $scope.carregaMapaDesconto($scope.desconto.latitude, $scope.desconto.longitude);
   $scope.mapalocalizacaodesconto.show();
};
*/


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


$ionicModal.fromTemplateUrl('templates/menu-classificado.html', {
  scope: $scope
}).then(function(classificado) {
  $scope.menuClassificado = classificado;
});

// Triggered in the login modal to close it
$scope.closecad_classificado = function() {
  $scope.menuClassificado.hide();
};
// Open the login modal
$scope.cad_classificado = function() {
  $scope.limpaAnuncio();
  $scope.menuClassificado.show();
  $scope.pegaCategoria();
  $scope.pegaLocal();
};


$ionicModal.fromTemplateUrl('templates/tab-meusanuncios.html', {
  scope: $scope
}).then(function(meusanuncios) {
  $scope.tab_meusanuncios = meusanuncios;
});

// Triggered in the login modal to close it
$scope.close_meusanuncios = function() {
  $scope.tab_meusanuncios.hide();
};

// Open the login modal
$scope.meusanuncios = function() {

  $scope.pegaMeusClassificado();
  $scope.tab_meusanuncios.show();
};

$ionicModal.fromTemplateUrl('templates/tab-editaranuncio.html', {
  scope: $scope
}).then(function(editaranuncio) {
  $scope.tab_editaranuncio = editaranuncio;
});

// Triggered in the login modal to close it
$scope.close_editaranuncio = function() {
  $scope.tab_editaranuncio.hide();
};

// Open the login modal
$scope.editaranuncio = function() {
  $scope.classefoto="foto-perfil";
  $scope.pegaCategoria();
  $scope.tab_editaranuncio.show();
};


$ionicModal.fromTemplateUrl('templates/tab-anuncio.html', {
  scope: $scope
}).then(function(anuncio) {
  $scope.menuAnuncio = anuncio;
});

// Triggered in the login modal to close it
$scope.close_anuncio = function() {
  $scope.menuAnuncio.hide();
};
// Open the login modal
$scope.mostra_anuncio = function() {
  $scope.menuAnuncio.show();

};
$ionicModal.fromTemplateUrl('templates/tab-anuncio-finaliza.html', {
  scope: $scope
}).then(function(anunciofinaliza) {
  $scope.menuAnunciofinaliza = anunciofinaliza;
});

// Triggered in the login modal to close it
$scope.close_anuncio_finaliza = function() {
  $scope.menuAnunciofinaliza.hide();
};
// Open the login modal
$scope.mostra_anuncio_finaliza = function() {
  $scope.menuAnunciofinaliza.show();

};

$ionicModal.fromTemplateUrl('templates/tab-confirma-finalizacao.html', {
  scope: $scope
}).then(function(confirmafinalizacao) {
  $scope.confirmafinalizacao = confirmafinalizacao
});

// Triggered in the login modal to close it
$scope.close_confirma_finalizacao = function() {
  $scope.confirmafinalizacao.hide();
};
// Open the login modal
$scope.mostra_confirma_finalizacao = function() {
  $scope.confirmafinalizacao.show();

};


  $ionicModal.fromTemplateUrl('templates/menu-msg.html', {
    scope: $scope
  }).then(function(menu) {
    $scope.menu = menu;
  });

  $scope.closemenu_msg = function() {
    $scope.msgTexto=false;
    $scope.msgVideo=false;
    $scope.msgFoto=false;
    $scope.btnMsg=true;

    $scope.menu.hide();
  };
  // Open the login modal
  $scope.menu_msg = function() {
    $scope.pegaCategoria();
    $scope.pegaLocal();
    $scope.menu.show();
  };

  $ionicModal.fromTemplateUrl('templates/menu-coleta.html', {
    scope: $scope
  }).then(function(coleta) {
    $scope.menucoleta = coleta;
  });

  // Triggered in the login modal to close it
  $scope.closemenu_coleta = function() {
  //  $scope.msgTexto=false;
  //  $scope.btnMsg=true;

    $scope.menucoleta.hide();
  };
  // Open the login modal
  $scope.menu_coleta = function() {
    $scope.pegaLocal();
    $scope.menucoleta.show();
  };


  $ionicModal.fromTemplateUrl('templates/cad-agendamento.html', {
    scope: $scope
  }).then(function(menu) {
    $scope.menuAgenda = menu;
  });

  // Triggered in the login modal to close it
  $scope.closecad_agendamento = function() {
    $scope.btnMsg=true;

    $scope.menuAgenda.hide();
  };
  // Open the login modal
  $scope.cad_agendamento = function() {
    $scope.menuAgenda.show();
    $scope.pegaCategoria();
  };


  $ionicModal.fromTemplateUrl('templates/tab-tv.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modaltv = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeTv = function() {
    $scope.modaltv.hide();
  };

  // Open the login modal
  $scope.tv = function() {

    $scope.modaltv.show();
  };

  // Abre tela de cadastro
  $ionicModal.fromTemplateUrl('templates/tab-radio.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalradio = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRadio = function() {
    $scope.modalradio.hide();
  };

  // Open the login modal
  $scope.radio = function() {

    $scope.modalradio.show();
  };
//   abre tema
  $ionicModal.fromTemplateUrl('templates/tab-tema.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modaltema = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeTema = function() {
    $scope.modaltema.hide();
  };

  // Open the login modal
  $scope.abreTema = function() {

    $scope.modaltema.show();
  };

  // Abre tela de cadastro
  $ionicModal.fromTemplateUrl('templates/tab-comentar.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalcomentar = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeComentar = function() {
//    $scope.pegaStatus();
    $scope.modalcomentar.hide();
  };

  // Open the login modal
  $scope.comentar = function(idmensagem, qtd, index) {
    $scope.idmensagem=idmensagem;
    $scope.qtdComentario=qtd;
    $scope.index=index;
    $scope.video= $scope.lista[index].video;
    $scope.foto=$scope.lista[index].foto;
    $scope.descricao=$scope.lista[index].descricao;
    $scope.data_hora=$scope.lista[index].data_hora;
    $scope.endereco=$scope.lista[index].endereco;
    $scope.assunto=$scope.lista[index].assunto;
    $scope.curtir=$scope.lista[index].curtir;
    $scope.comentario=$scope.lista[index].comentario;
    $scope.compartilhamento=$scope.lista[index].compartilhamento;
    $scope.lista[index].status_label='{"background":"#F8F5FC"}';
    $scope.pegaComentario();
    $scope.modalcomentar.show();
  };

  $scope.compartilha = function(titulo,descricao,foto, preco){

     var mensagem =   titulo +" - " +descricao;


     $cordovaSocialSharing
      .share(mensagem, titulo, foto, "Preço R$ "+ preco)
      .then(function(result) {

      }, function(err) {
        // An error occured. Show a message to the user
      });


  }





  $scope.comentarNotificacao = function(idmensagem, qtd, index) {
    $scope.idmensagem=idmensagem;
    $scope.qtdComentario=qtd;
    $scope.index=index;
    $scope.video= $scope.listaNotificacao[index].video;
    $scope.foto=$scope.listaNotificacao[index].foto;
    $scope.descricao=$scope.listaNotificacao[index].descricao;
    $scope.data_hora=$scope.listaNotificacao[index].data_hora;
    $scope.endereco=$scope.listaNotificacao[index].endereco;
    $scope.assunto=$scope.listaNotificacao[index].assunto;
    $scope.curtir=$scope.listaNotificacao[index].curtir;
    $scope.comentario=$scope.listaNotificacao[index].comentario;
    $scope.compartilhamento=$scope.listaNotificacao[index].compartilhamento;
   // $scope.listaNotificacao[index].status_label='{"background":"#F4FFF9"}';
    $scope.pegaComentario();
    $scope.modalcomentar.show();
  };

$scope.carregaMapaDesconto = function(mylatitude, mylongitude) {
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



        mymap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

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
// menu lateral chamadas
$ionicModal.fromTemplateUrl('templates/tab-duvida.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalduvida = modal;
});

$scope.closeDuvida = function() {
    $scope.modalduvida.hide();
};

$scope.duvida = function() {
   $scope.pegaDuvida();
   $scope.modalduvida.show();
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

$ionicModal.fromTemplateUrl('templates/tab-coletaregular.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalcoletaregular = modal;
});

$scope.closeColetaregular = function() {
    $scope.modalcoletaregular.hide();
};

$scope.coletaregular = function() {
   $scope.pegaBairro();
   $scope.modalcoletaregular.show();
};


$ionicModal.fromTemplateUrl('templates/tab-pontoentrega.html', {
    scope: $scope,
    controller: 'MapCtrl'
    }).then(function(modal) {
    $scope.modalpontoentrega = modal;
});

$scope.closePontoentrega = function() {
    $scope.modalpontoentrega.hide();
};

$scope.pontoentrega = function() {

   $scope.modalpontoentrega.show();

};




// fim
$ionicModal.fromTemplateUrl('templates/tab-social.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalsocial = modal;
});

$scope.closeSocial = function() {
    $scope.modalsocial.hide();
};

$scope.social = function() {
   $scope.pegaSocial();
   $scope.modalsocial.show();
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

$ionicModal.fromTemplateUrl('templates/tab-chatonLive.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalchatonLive = modal;
});

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

$ionicModal.fromTemplateUrl('templates/tab-chatonLive.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalchatonLive = modal;
});

$scope.closechatonLive = function() {
    $scope.modalchatonLive.hide();
};

$scope.chatonLive = function() {
   $scope.pegaLocal();
   $scope.pegaCategoria();
   $scope.modalchatonLive.show();
};


$ionicModal.fromTemplateUrl('templates/tab-curtir.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalpegacurtir = modal;
});

  // Triggered in the login modal to close it
$scope.closepegaCurtir = function() {
//    $scope.pegaStatus();
    $scope.modalpegacurtir.hide();
};

  // Open the login modal
$scope.pegaCurtir = function(idmensagem, qtd) {
    $scope.idmensagem=idmensagem;
    $scope.qtdCurtir=qtd;

    $scope.carregarCurtir();

    $scope.modalpegacurtir.show();
};



})  // fim mensgaemCtrl



.controller('TemaCtrl', function($scope) {
$scope.tema=localStorage.getItem('tema');
$scope.tab_tema=localStorage.getItem('tab_tema');
$scope.btn_tema=localStorage.getItem('btn_tema');
})

.controller('EntreternimentoCtrl', function($scope) {
$scope.tema=localStorage.getItem('tema');
$scope.tab_tema=localStorage.getItem('tab_tema');
$scope.btn_tema=localStorage.getItem('btn_tema');
})

.controller('EnqueteCtrl', function($scope) {
  $scope.tema=localStorage.getItem('tema');
  $scope.tab_tema=localStorage.getItem('tab_tema');
  $scope.btn_tema=localStorage.getItem('btn_tema');
})





.controller('MapCtrl', function($scope, $state, $http, $cordovaGeolocation, $ionicLoading) {
//$scope.listaMap=[];

// teste de funcao mapa

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
