<?php
   //set_time_limit(0);
   $arquivo = $_GET["arquivo"];

  
      switch(strtolower(substr(strrchr(basename($arquivo),"."),1))){ // verifica a extensão do arquivo para pegar o tipo
         case "pdf": $tipo="application/pdf"; break;
         case "exe": $tipo="application/octet-stream"; break;
         case "zip": $tipo="application/zip"; break;
         case "doc": $tipo="application/msword"; break;
         case "xls": $tipo="application/vnd.ms-excel"; break;
         case "ppt": $tipo="application/vnd.ms-powerpoint"; break;
         case "gif": $tipo="image/gif"; break;
         case "png": $tipo="image/png"; break;
         case "jpg": $tipo="image/jpeg"; break;
         case "mp3": $tipo="audio/mpeg"; break;
         case "php": // deixar vazio por seurança
         case "htm": // deixar vazio por seurança
         case "html": // deixar vazio por seurança

      }



      header("Content-Disposition: attachment; filename=" . basename($arquivo));   
      header("Content-Type: application/force-download");
      header("Content-Type: application/octet-stream");
      header("Content-Type: application/download");
      header("Content-Type: ".$tipo); 
      header("Content-Description: File Transfer");            
      header("Content-Length: " . filesize($arquivo));
      header("Cache-Control: no-cache");
      header("Pragma: no-cache");
      flush(); // this doesn't really matter.

      $fp = fopen($arquivo, "r");
      while (!feof($fp))
      {
          echo fread($fp, 65536);
          flush(); // this is essential for large downloads
      } 
      fclose($fp); 

/*
     
    //  header('Content-Description: File Transfer');
      header("Content-Disposition: attachment; filename=".basename($arquivo)); 
      header("Content-Type: ".$tipo); 
      header('Content-Transfer-Encoding: binary');
      header("Content-Length: ".filesize($arquivo)); 
 //     header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
 //     header('Pragma: public');
 //     header('Expires: 0');
      readfile($arquivo);  
      print file_get_contents($arquivo);
     
      //exit; // aborta pós-ações

      //header("Content-Type: ".$tipo); // informa o tipo do arquivo ao navegador
/*     
      header('Content-Description: File Transfer');
      header('Content-Disposition: attachment; filename='.basename($arquivo)); 
      header('Content-Type: image/jpg');
      header('Content-Transfer-Encoding: binary');
      header('Content-Length: '.filesize($arquivo)); // informa o tamanho do arquivo ao navegador
      header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
      header('Pragma: public');
      header('Expires: 0');
      readfile($arquivo); // lê o arquivo
 
/*
      header('Content-Description: File Transfer');
      header('Content-Disposition: attachment; filename='.basename($arquivo));
      header('Content-Type: image/jpg');
      header('Content-Transfer-Encoding: binary');
      header('Content-Length: ' . filesize($aquivo));
      header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
      header('Pragma: public');
      header('Expires: 0');
      readfile($aquivo);
      */
?>