<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd






    $sql = 'select *from seminaire_formation where date_fin>=now()';
    $req = $conn->prepare($sql);
    $req->execute();




  $data = array();
 
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;
	

  }


  echo json_encode($data);

?>