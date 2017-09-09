<?php
if( $_SERVER['REQUEST_METHOD']=='POST' )
{
        var_dump( $_FILES );//apenas para debug


        $servidor = 'www.portalexata.com.br';
        $caminho_absoluto = '/app.cartaofelicidade.com.br/video/';
        $arquivo = $_FILES['file'];

        $con_id = ftp_connect($servidor) or die( 'Não conectou em: '.$servidor );
        ftp_login( $con_id, 'porta268', 'pi314159' );

        ftp_put( $con_id, $caminho_absoluto.$arquivo['name'], $arquivo['tmp_name'], FTP_BINARY );
}
?>
