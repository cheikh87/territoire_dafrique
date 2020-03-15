<?php
error_reporting(0);
include_once 'config.php';
$fileName = $_FILES["file1"]["name"]; // The file name
$fileTmpLoc = $_FILES["file1"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file1"]["type"]; // The type of file it is
$fileSize = $_FILES["file1"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file1"]["error"]; // 0 for false... and 1 for true
$description=$_GET[description];
$type_doc=$_GET[type_doc];
if (!$fileTmpLoc) { // if file not chosen
    echo "ERROR: Please browse for a file before clicking the upload button.";
    exit();
}

$dossier_check = $type_doc;
if(!is_dir("../../documents/".$dossier_check)){
   mkdir("../../documents/".$type_doc);
}

if(move_uploaded_file($fileTmpLoc, "../../documents/$type_doc/$fileName")){
	
$description=str_replace("'", "''" ,$description);
     
     
   // $sql = 'insert into documents (nom_document,description,type_doc) values(\''.$fileName.'\',\''.$description.'\',\''.$type_doc.'\')';
   // $req = $conn->prepare($sql);
  //  $req->execute();  
    // // Exemple d'utilisation
    // unzip_file("unzip/".$fileName, 'unzip/');
	
    echo "Le fichier a bien été chargé.";
	
?>	
<?php	
} else {
    echo "Erreur lors de l'importation du document, veuillez réessayer";
}
?>