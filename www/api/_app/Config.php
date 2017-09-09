<?php
// Configuração da conexao
define('HOST', 'portalexata.com.br');
define('USER', 'porta268_root');
define('PASS', '314159');
define('DBSA', 'porta268_jefferson');

function __autoload($Class){

        include_once ('Conn/'.$Class . '.class.php');
}
