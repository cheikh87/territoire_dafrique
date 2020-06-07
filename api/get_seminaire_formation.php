<?php
error_reporting(0);
include_once('../administration/api/config.php');
header("Access-Control-Allow-Origin: *");//this allows coors
header('Content-Type: application/json');
// fichier de config où se trouve le mot de passe et les paramètres de connexion à la bdd


$type_doc=$_GET[type_doc];

	$sql = "select *from seminaire_formation";
	$req = $conn->prepare($sql);
    $req->execute();



 $result = $req->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($result);
?>
