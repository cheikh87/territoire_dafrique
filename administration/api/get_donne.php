<?php
error_reporting(0);
include_once('config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd



$statut_user=$_GET[statut_user];
$pays=$_GET[pays];

if($statut_user==6)
    $sql = 'select *from revus';
else
	$sql = 'select *from revus where pays='.$pays;
	
    $req = $conn->prepare($sql);
    $req->execute();



  $data = array();
      while($row=$req->fetch(PDO::FETCH_ASSOC)){

        $data['data'][] = $row;

  }


  echo json_encode($data);

?>
