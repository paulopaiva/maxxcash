<?php
$data = json_decode(file_get_contents("php://input"));
$filter = $_SERVER['REQUEST_METHOD'];
require ('./_app/Config.php');

if($filter === 'POST'){
    switch ($data->parametros) {
      case "pegaDuvida":
           $read = new Read;
           //$read->ExeRead('user');
           $read->FullRead("SELECT * FROM duvida  order by titulo");
           echo json_encode($read->getResult());
      break;
      case "pegaDica":
           $read = new Read;
           //$read->ExeRead('user');
           $read->FullRead("SELECT * FROM dica  order by titulo");
           echo json_encode($read->getResult());
      break;
       case "carregaCategorias":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM imagem  order by id desc LIMIT {$data->pagina} ,6");
            echo json_encode($read->getResult());
       break;
       case "pegaColetor":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM coletor  order by nome");
            echo json_encode($read->getResult());
       break;


       case "pegaStatusAgenda":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM agenda order by data desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaStatusServicos":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM servicos order by titulo desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "excluirAgenda":
            $delete = new Delete;
            $delete->ExeDelete("agenda",'where idagenda='.$data->idagenda,"");
            echo json_encode($delete->getResult());
       break;
       case "pegaStatusColaborador":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM colaborador order by titulo desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "excluirColaborador":
            $delete = new Delete;
            $delete->ExeDelete("colaborador",'where idcolaborador='.$data->idcolaborador,"");
            echo json_encode($delete->getResult());
       break;
       case "gravarColaborador":
           $Dados=array(

                'status' => $data->status,
                'descricao' => $data->descricao,
                'link' => $data->link,
                'link_imagem' => $data->link_imagem,
                'titulo' => $data->titulo

               );

            $cadastra = new Create();
            $cadastra->ExeCreate('colaborador', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * from colaborador ORDER BY titulo LIMIT {$data->pagina},1");
            echo json_encode($read->getResult());

            break;
            case "gravarColeta":
                $Dados=array(

                     'idbairro' => $data->idbairro,
                     'idcoletor' => $data->idcoletor,
                     'data_hora' => $data->data_hora,
                     'endereco' => $data->endereco,
                     'localizacao' => $data->localizacao,
                     'latitude' => $data->latitude,
                     'longitude' => $data->longitude,
                     'idusuario' => $data->idusuario,
                     'obs' => $data->obs,
                     'qtd_informada' => $data->qtd_informada,
                     'status' => $data->status

                    );

                 $cadastra = new Create();
                 $cadastra->ExeCreate('coleta', $Dados);
                 //Leitura no Banco
                 $read = new Read;
                 $read->FullRead("SELECT * from coleta ORDER BY idcoleta LIMIT {$data->pagina},1");
                 echo json_encode($read->getResult());

         break;

       case "excluirProposta":
            $delete = new Delete;
            $delete->ExeDelete("proposta",'where idproposta='.$data->idproposta,"");
            echo json_encode($delete->getResult());
       break;

       case "validaUsuario":
            $read = new Read;
            $read->FullRead("SELECT * FROM usuario where (idusuario='{$data->idusuario}')");
            echo json_encode($read->getResult());
       break;

      case "pegaVideo":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM video where status='ATIVO' order by prioridade desc, idvideo desc LIMIT {$data->pagina} ,130");
            echo json_encode($read->getResult());
       break;
      case "pegaEntreternimento":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM entreternimento where status='ATIVO' order by identreternimento desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaProposta":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM proposta where status='ATIVO' order by idproposta desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
      case "pegaAgenda":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM agenda where status='ATIVO' order by data desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
      case "pegaIndicacao":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM indicacao where status='ATIVO' order by nome");
            echo json_encode($read->getResult());
       break;
       case "pegaBairro":
             $read = new Read;
             //$read->ExeRead('user');
             $read->FullRead("SELECT * FROM bairro  order by nome");
             echo json_encode($read->getResult());
        break;
      case "pegaCategoria":
            $read = new Read;
            //$read->ExeRead('user');
            $read->FullRead("SELECT * FROM categoria order by nome");
            echo json_encode($read->getResult());
       break;

       case "pegaStatusAll":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario ORDER BY mensagem.idmensagem desc LIMIT {$data->pagina},999999999 ");
            echo json_encode($read->getResult());
       break;

       case "pegaStatus":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON mensagem.idusuario = usuario.idusuario where (mensagem.status<>'{$data->status}') ORDER BY mensagem.idmensagem desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaMensagemSorteio":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario WHERE assunto='Produção do Programa' and idmensagem > '567' ORDER BY mensagem.idmensagem ");
            echo json_encode($read->getResult());
       break;

       case "pegaAgendamento":
            $read = new Read;
            $read->FullRead("SELECT * FROM agendamento where (agendamento.idusuario = '{$data->idusuario}') order by idagendamento");
            echo json_encode($read->getResult());
       break;
       case "pegaAgendamentoAll":
            $read = new Read;
            $read->FullRead("SELECT * FROM agendamento order by idagendamento");
            echo json_encode($read->getResult());
       break;
       case "pegaStatusMapa_OLD":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario where (status<>'{$data->status}' and data_hora BETWEEN CURRENT_DATE()-7 AND CURRENT_DATE()) ORDER BY mensagem.idmensagem desc LIMIT {$data->pagina} ,500");
            echo json_encode($read->getResult());
       break;
       case "pegaStatusMapa":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario where (mensagem.status<>'{$data->status}') ORDER BY mensagem.idmensagem desc");
            echo json_encode($read->getResult());
       break;
       case "pegaStatusMapaPonto":
            $read = new Read;
            $read->FullRead("SELECT * FROM usuario where (tipo='Ponto') ORDER BY idusuario");
            echo json_encode($read->getResult());
       break;
       case "paginaStatusMapa":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario where (status<>'{$data->status}' and (idmensagem>'{$data->idmensagem}')) ORDER BY mensagem.idmensagem desc ");
            echo json_encode($read->getResult());
       break;

       case "pegaStatusCount":
            $read = new Read;
            $read->FullRead("SELECT idmensagem FROM mensagem where (status<>'{$data->status}') ORDER BY idmensagem desc LIMIT {$data->pagina},0");
            echo json_encode($read->getResult());
       break;

       case "pegaComentario":
            $read = new Read;
            $read->FullRead("SELECT comentario.*,usuario.nome, (usuario.foto) as perfil FROM comentario  INNER JOIN usuario ON comentario.idusuario =usuario.idusuario  where (idmensagem='{$data->idmensagem}') ORDER BY comentario.idcomentario desc");
            echo json_encode($read->getResult());
       break;
       case "pegaColeta":
            $read = new Read;
            $read->FullRead("SELECT * FROM coleta where (idusuario='{$data->idusuario}') ORDER BY idcoleta desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaCurtir":
            $read = new Read;
            $read->FullRead("SELECT curtir.*,usuario.nome, (usuario.foto) as perfil FROM curtir  INNER JOIN usuario ON curtir.idusuario =usuario.idusuario  where (idmensagem='{$data->idmensagem}') ORDER BY curtir.idcurtir desc");
            echo json_encode($read->getResult());
       break;
       case "pegaNotificacao":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario where ((mensagem.idusuario = '{$data->idusuario}') and ((comentario>'0') or (curtir>'0'))) ORDER BY mensagem.idmensagem desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaNotificacaoServidor":
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".
                            "usuario.idusuario where ((assunto= '{$data->assunto}') and (status='Privada') )ORDER BY mensagem.idmensagem desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaClassificado":
             $read = new Read;
             //$read->ExeRead('user');
             $read->FullRead("SELECT classificado.*,usuario.nome, usuario.telefone FROM classificado INNER JOIN usuario ON classificado.idusuario =".
                             "usuario.idusuario where (classificado.status = 'NOVO') ORDER BY classificado.idclassificado desc LIMIT {$data->pagina},30");
             echo json_encode($read->getResult());
        break;
        case "pegaMeusClassificado":
              $read = new Read;
              //$read->ExeRead('user');
              $read->FullRead("SELECT classificado.*,usuario.nome, usuario.telefone FROM classificado INNER JOIN usuario ON classificado.idusuario =".
                              "usuario.idusuario where ((classificado.idusuario = '{$data->idusuario}') and (classificado.status = 'NOVO')) ORDER BY classificado.idclassificado desc LIMIT {$data->pagina},30");
              echo json_encode($read->getResult());
         break;
        case "pegaCashBack":
              $read = new Read;
              //$read->ExeRead('user');
              $read->FullRead("SELECT cashback.*,lojista.nome, lojista.telefone, lojista.endereco, lojista.categoria, lojista.latitude, lojista.longitude  FROM cashback INNER JOIN lojista ON cashback.idlojista =".
                              "lojista.idlojista ORDER BY cashback.titulo LIMIT {$data->pagina},99999");
              echo json_encode($read->getResult());
         break;
         case "pegaDesconto":
               $read = new Read;
               //$read->ExeRead('user');
               $read->FullRead("SELECT desconto.*,lojista.nome, lojista.telefone, lojista.endereco, lojista.categoria, lojista.latitude, lojista.longitude FROM desconto INNER JOIN lojista ON desconto.idlojista =".
                               "lojista.idlojista ORDER BY desconto.titulo LIMIT {$data->pagina},99999");
               echo json_encode($read->getResult());
          break;
      case "pegaTransacao":
                $read = new Read;
                //$read->ExeRead('user');
                $read->FullRead("SELECT transacao.*,lojista.nome as razao, lojista.foto, lojista.localizacao, lojista.categoria,usuario.nome, usuario.idusuario FROM transacao ".
                                " INNER JOIN lojista  ON transacao.idestabelecimento = lojista.idestabelecimento ".
                                " INNER JOIN usuario  ON transacao.idcliente = usuario.idcliente WHERE usuario.idusuario = '{$data->idusuario}' ORDER BY transacao.data_hora DESC");
                echo json_encode($read->getResult());
       break;
       case "pegaStatusUsuario":
            $read = new Read;
            $read->FullRead("SELECT * FROM mensagem where (idusuario='{$data->idusuario}') ORDER BY idmensagem desc LIMIT {$data->pagina} ,30");
            echo json_encode($read->getResult());
       break;
       case "pegaUsuario":
            $read = new Read;
            $read->FullRead("SELECT * FROM usuario order by idusuario desc");
            echo json_encode($read->getResult());
       break;
       case "verificaUsuario":

              $read = new Read;
              $read->FullRead("SELECT * FROM usuario where (telefone='{$data->telefone}')  ORDER BY idusuario desc");
              echo json_encode($read->getResult());
       break;

       case "pegaSocial":
            $read = new Read;
            $read->FullRead("SELECT * FROM social order by idsocial");
            echo json_encode($read->getResult());
       break;
       case "pegaCountUsuario":
            $read = new Read;
            $read->FullRead("SELECT COUNT(idusuario) as qtdusuario FROM usuario");
            echo json_encode($read->getResult());
       break;

       case "validaLogin":
            $read = new Read;
            $read->FullRead("SELECT * FROM login where (email='{$data->email}') and (senha='{$data->senha}')");
            echo json_encode($read->getResult());
       break;
       case "excluirMensagem":
            $delete = new Delete;
            $delete->ExeDelete("curtir",'where idmensagem='.$data->idmensagem,"");
            $delete = new Delete;
            $delete->ExeDelete("comentario",'where idmensagem='.$data->idmensagem,"");
            $delete = new Delete;
            $delete->ExeDelete('mensagem','where idmensagem='.$data->idmensagem,"");
            echo json_encode($delete->getResult());
       break;
       case "gravarAgenda":
           $Dados=array(

                'status' => $data->status,
                'descricao' => $data->descricao,
                'link' => $data->link,
                'data' => $data->data_hora,
                'link_imagem' => $data->link_imagem,
                'titulo' => $data->titulo

               );

            $cadastra = new Create();
            $cadastra->ExeCreate('agenda', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * from agenda ORDER BY data desc LIMIT {$data->pagina},1");
            echo json_encode($read->getResult());

            break;
       default:


        case "gravarAgendamento":
           $Dados=array(

                'idusuario' => $data->idusuario,
                'nome' => $data->nome,
                'endereco' => $data->endereco,
                'data_hora' => $data->data_hora,
                'bairro' => $data->bairro,
                'telefone' => $data->telefone,
                'rg' => $data->rg,
                'cep' => $data->cep,
                'data_nascimento' => $data->data_nascimento,
                'indicacao' => $data->indicacao,
                'assunto' => $data->assunto,
                'descricao' => $data->descricao
               );

            $cadastra = new Create();
            $cadastra->ExeCreate('agendamento', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * FROM agendamento where (agendamento.idusuario = '{$data->idusuario}') order by idagendamento");
            echo json_encode($read->getResult());

            break;
       default:

       case "gravarAnuncio":
          $Dados=array(

               'status' => $data->status,
               'idusuario' => $data->idusuario,
               'titulo' => $data->titulo,
               'descricao' => $data->descricao,
               'latitude' => $data->latitude,
               'longitude' => $data->longitude,
               'localizacao' => $data->localizacao,
               'data_hora' => $data->data_hora,
               'bairro' => $data->bairro,
               'preco' => $data->preco,
               'categoria' => $data->categoria,
               'foto' => $data->foto
              );

           $cadastra = new Create();
           $cadastra->ExeCreate('classificado', $Dados);
           //Leitura no Banco
           $read = new Read;
           $read->FullRead("SELECT * from classificado ORDER BY classificado.idclassificado desc LIMIT {$data->pagina},1");
           echo json_encode($read->getResult());

           break;
      default:
      case "atualizarAnuncio":
         $Dados=array(

              'titulo' => $data->titulo,
              'descricao' => $data->descricao,
              'preco' => $data->preco,
              'categoria' => $data->categoria
             );

          $atualizaDados = new Update();
          $atualizaDados->ExeUpdate('classificado', $Dados,'where idclassificado='.$data->idclassificado,"");
          //Leitura no Banco
          $read = new Read;
          $read->FullRead("SELECT * from classificado ORDER BY classificado.idclassificado desc LIMIT {$data->pagina},1");
          echo json_encode($read->getResult());

          break;
     default:
     case "salvarFinalizar":
        $Dados=array(
             'status' => $data->status,
             'status_finaliza' => $data->status_finaliza,
             'data_finalizado' =>$data->data_finalizado
            );

         $atualizaDados = new Update();
         $atualizaDados->ExeUpdate('classificado', $Dados,'where idclassificado='.$data->idclassificado,"");

         //Leitura no Banco
         $read = new Read;
         $read->FullRead("SELECT * from classificado ORDER BY classificado.idclassificado desc LIMIT {$data->pagina},1");
         echo json_encode($read->getResult());

         break;
    default:
    case "gerarCupom_desconto":
       $Dados=array(

            'status' => $data->status,
            'idusuario' => $data->idusuario,
            'idlojista' => $data->idlojista,
            'data' => $data->data,
            'data_validade' => $data->data_validade,
            'valor_normal' => $data->valor_normal,
            'valor_desconto' => $data->valor_desconto,
            'data_hora' => $data->data_hora,
            'numero_cupom' => $data->numero_cupom,
            'iddesconto' => $data->iddesconto
           );

        $cadastra = new Create();
        $cadastra->ExeCreate('cupom_desconto', $Dados);
        //Leitura no Banco
        $read = new Read;
        $read->FullRead("SELECT idcupom_desconto from cupom_desconto ORDER BY idcupom_desconto desc LIMIT {$data->pagina},1");
        echo json_encode($read->getResult());

        break;
   default:

    case "gerarCupom_cash":
       $Dados=array(

            'status' => $data->status,
            'idusuario' => $data->idusuario,
            'idlojista' => $data->idlojista,
            'data' => $data->data,
            'data_validade' => $data->data_validade,
            'percentual_cliente' => $data->percentual_cliente,
            'percentual_rede' => $data->percentual_rede,
            'percentual_total' => $data->percentual_total,
            'data_hora' => $data->data_hora,
            'numero_cupom' => $data->numero_cupom,
            'idcashback' => $data->idcashback
           );

        $cadastra = new Create();
        $cadastra->ExeCreate('cupom_cashback', $Dados);
        //Leitura no Banco
        $read = new Read;
        $read->FullRead("SELECT idcupom_cashback from cupom_cashback ORDER BY idcupom_cashback desc LIMIT {$data->pagina},1");
        echo json_encode($read->getResult());

        break;
   default:

   case "pegaqtd_cupom":
       //Leitura no Banco
       $read = new Read;
       $read->FullRead("SELECT iddesconto, qtd_disponivel from desconto  where (iddesconto='{$data->iddesconto}') LIMIT {$data->pagina},1");
       echo json_encode($read->getResult());

       break;
  default:

   case "atualizaqtd_cupom":
      $Dados=array(
           'qtd_disponivel' => $data->qtd_disponivel

        );
       $atualizaDados = new Update();
       $atualizaDados->ExeUpdate('desconto', $Dados,'where iddesconto='.$data->iddesconto,"");

       //Leitura no Banco
  //     $read = new Read;
  //     $read->FullRead("SELECT iddesconto, qtd_disponivel from desconto  where (iddesconto='{$data->iddesconto}') desc LIMIT {$data->pagina},1");
  //     echo json_encode($read->getResult());

       break;
  default:

        case "gravarMensagem":
			     $Dados=array(

                'status' => $data->status,
                'idusuario' => $data->idusuario,
                'idorgao' => $data->idorgao,
                'assunto' => $data->assunto,
                'descricao' => $data->descricao,
                'latitude' => $data->latitude,
                'longitude' => $data->longitude,
                'localizacao' => $data->localizacao,
                'endereco' => $data->endereco,
                'data_hora' => $data->data_hora,
                'bairro' => $data->bairro,
                'tipo' => $data->tipo,
                'foto' => $data->foto,
                'video' => $data->video
               );

            $cadastra = new Create();
            $cadastra->ExeCreate('mensagem', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON ".
                            "mensagem.idusuario = usuario.idusuario ORDER BY mensagem.idmensagem desc LIMIT {$data->pagina},1");
            echo json_encode($read->getResult());

            break;
       default:
        case "gravarChat":
           $Dados=array(

                'idusuario' => $data->idusuario,
                'assunto' => $data->assunto,
                'descricao' => $data->descricao,
                'latitude' => $data->latitude,
                'longitude' => $data->longitude,
                'localizacao' => $data->localizacao,
                'data_hora' => $data->data_hora,
                'bairro' => $data->bairro
               );

            $cadastra = new Create();
            $cadastra->ExeCreate('chat', $Dados);
            echo ("Ok");
            break;
       default:

       break;
        case "gravarUsuario":
           $Dados=array(

                'nome' => $data->nome,
                'telefone' => $data->telefone,
                'email' => $data->email,
                'endereco' => $data->endereco,
                'localizacao' => $data->localizacao,
                'latitude' => $data->latitude,
                'longitude' => $data->longitude,
                'telefone' => $data->telefone,
                'data_nascimento' => $data->data_nascimento,
                'rg' => $data->rg,
                'data_cadastro' => $data->data_cadastro,
                'foto' => $data->foto,
                'idpush' => $data->idpush
             );

            $cadastra = new Create();
            $cadastra->ExeCreate('usuario', $Dados);
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT * FROM usuario where (telefone='{$data->telefone}')  ORDER BY idusuario desc");
            echo json_encode($read->getResult());

            break;
       default:
       break;
       case "atualizatokem":
           $Dados=array(

                'idpush' => $data->idpush
               );

            $atualizaDados = new Update();
            $atualizaDados->ExeUpdate('usuario', $Dados,'where idusuario='.$data->idusuario,"");
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT idusuario FROM usuario where (idusuario='{$data->idusuario}')");
            echo json_encode($read->getResult());

            break;
       default:
       break;
       case "usuarioLogado":
           $Dados=array(

                'latitude' => $data->latitude,
                'longitude' => $data->longitude,
                'data_login' => $data->data_login
               );

            $atualizaDados = new Update();
            $atualizaDados->ExeUpdate('usuario', $Dados,'where idusuario='.$data->idusuario,"");
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT idusuario FROM usuario where (idusuario='{$data->idusuario}')");
            echo json_encode($read->getResult());

            break;
       default:
       break;

       case "atualizaAgendamento":
           $Dados=array(

                'data_agendamento' => $data->data_agendamento,
                'retorno' => $data->retorno

               );

            $atualizaDados = new Update();
            $atualizaDados->ExeUpdate('agendamento', $Dados,'where idagendamento='.$data->idagendamento,"");
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT idagendamento FROM agendamento where (idagendamento='{$data->idagendamento}')");
            echo json_encode($read->getResult());

            break;
       default:
       break;

       case "atualizaUsuario":
           $Dados=array(
                 'nome' => $data->nome,
                 'telefone' => $data->telefone,
                 'email' => $data->email,
                 'endereco' => $data->endereco,
                 'localizacao' => $data->localizacao,
                 'latitude' => $data->latitude,
                 'longitude' => $data->longitude,
                 'telefone' => $data->telefone,
                 'data_nascimento' => $data->data_nascimento,
                 'rg' => $data->rg,
                 'data_cadastro' => $data->data_cadastro,
                 'foto' => $data->foto,
                 'idpush' => $data->idpush
               );

            $atualizaDados = new Update();
            $atualizaDados->ExeUpdate('usuario', $Dados,'where idusuario='.$data->idusuario,"");
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT idusuario FROM usuario where (idusuario='{$data->idusuario}')");
            echo json_encode($read->getResult());

            break;
       default:
       break;

        case "atualizaDados":
           $Dados=array(
                'status' => $data->status,
                'acompanhamento'=>$data->acompanhamento
                       );
            $atualizaDados = new Update();
            $atualizaDados->ExeUpdate('mensagem', $Dados,'where idmensagem='.$data->idmensagem,"");
            //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT mensagem.*,usuario.nome, (usuario.foto) as perfil FROM mensagem INNER JOIN usuario ON mensagem.idusuario =".                                         "usuario.idusuario ORDER BY mensagem.idmensagem  LIMIT {$data->pagina} ,6");
            echo json_encode($read->getResult());
            break;
       default:
       break;
       case "gravarCompartilha":
            $Update = new Update();
            $Update->ExeUpdateFree("UPDATE mensagem SET compartilhamento=compartilhamento+1, status_cc='true' where (idagenda='{$data->idagenda}')");             //Leitura no Banco
            $read = new Read;
            $read->FullRead("SELECT compartilhamento FROM agenda where (idagenda='{$data->idagenda}')");
            echo json_encode($read->getResult());
            break;
       default:
       break;
       case "gravarCompartilhaAgenda":
            $Update = new Update();
            $Update->ExeUpdateFree("UPDATE agenda SET compartilhamento=compartilhamento+1, status_cc='true' where (idagenda='{$data->idagenda}')");             //Leitura no Banco

            $Dados=array(

                'idagenda' => $data->idagenda,
                'idusuario' => $data->idusuario,
                'data' => $data->data
               );
            $cadastra = new Create();
            $cadastra->ExeCreate('compartilhaAgenda', $Dados);


            $read = new Read;
            $read->FullRead("SELECT compartilhamento FROM agenda where (idagenda='{$data->idagenda}')");
            echo json_encode($read->getResult());
            break;
       default:
       break;
       case "gravarCurtir":

            $Update = new Update();
            $Update->ExeUpdateFree("UPDATE mensagem SET curtir=curtir+1, status_cc='true' where (idmensagem='{$data->idmensagem}')");
            //Leitura no Banco

            $Dados=array(

                'idmensagem' => $data->idmensagem,
                'idusuario' => $data->idusuario,
                'data' => $data->data
               );
            $cadastra = new Create();
            $cadastra->ExeCreate('curtir', $Dados);

            $read = new Read;
            $read->FullRead("SELECT curtir FROM mensagem where (idmensagem='{$data->idmensagem}')");
            echo json_encode($read->getResult());
            break;

            break;
       default:
       break;
       case "gravarComentario":
            $Update = new Update();
            $Update->ExeUpdateFree("UPDATE mensagem SET comentario=comentario+1 where (idmensagem='{$data->idmensagem}')");            //Leitura no Banco
            $Dados=array(

                'idmensagem' => $data->idmensagem,
                'idusuario' => $data->idusuario,
                'data' => $data->data,
                'comentario' => $data->comentario
               );
            $cadastra = new Create();
            $cadastra->ExeCreate('comentario', $Dados);
            $read = new Read;
            $read->FullRead("SELECT comentario FROM mensagem where (idmensagem='{$data->idmensagem}')");
            echo json_encode($read->getResult());
            break;
       default:
       break;

       }
}else{

}

?>
