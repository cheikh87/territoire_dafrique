<?php
$host = 'localhost';
$dbname = 'avsf';
$dbuser = 'root';
$dbpass = '';

try{
    $conn = new PDO('mysql:host='.$host.';dbname='.$dbname.'',''.$dbuser .'',''.$dbpass.'');
	
}
catch (Exception   $e){echo json_encode(array("retour"=>'Erreur de connexion à la bdd', "e" => $e )); die();}
?>