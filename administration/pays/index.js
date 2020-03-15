$(document).ready(function() {

var table = $('#table_activites').DataTable( {
    lengthChange: false,
     responsive: true,
     language: {
                "url": "assets/i18n/datatable.json"
        },
dom: 'Bfrtip',
   buttons: [ 'copy', 'excel', 'pdf', 'print', 'colvis' ],
   
   ajax: {
        "url": 'api/get_pays.php'
    },
    buttons: [ 'excel', 'pdf', 'colvis' ],
    columns: [
        {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
                var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                       bouton_modifier+bouton_supprimer
                    +'</div>';
               
            }
        },
        {"data": "nom"},
        {"data": "description"}

    ],
    
  } );

  //table.ajax.reload();


//Fonction qui déclenche le popup d'ajout de nouvelles valeurs

$('#new_s_').on('click', function (e) {
  

    $('.title_activity').text('Ajout d\'un nouveau pays');
    $('#edit_').hide();
    $('#add_').show(); 
    $('#new_s').modal('show');   
});

$('#add_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table='pays';
    //s.utilisateur=id_user;
    console.log(s);
    
    
    $.ajax({
            url:'api/ajouter.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                    $("#form_add")[0].reset();
                    $('#new_s').modal('hide');
                    table.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });



//Modifier une valeur
$('#table_activites tbody').on('click', '.modifier', function (e) {
    e.preventDefault();
   
  
    $('.title_activity').text('Modifier les informations d\'un pays');
   
    $('#edit_').show();
    $('#add_').hide();


    $('#libelle_valeur_modif').on('change', function (e) {
        e.preventDefault();
        if ($('#libelle_valeur_modif').val() === 'autre') {
            $('#autre_libelle_modif').show();
        } else {
            $('#autre_libelle_modif').hide();
        }
    });

    var data = table.row($(this).parents('tr')).data();
    $('#maladie').val(data.maladie);
    $('#description').val(data.description);
    $('#gid').val(data.gid);

    $('#new_s').modal('show');
});  


$('#edit_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table='pays';
    //s.utilisateur=id_user;
    console.log(s);
    
    
    $.ajax({
            url:'api/modifier.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {   
                    notification('success',result.message, 'fa fa-check-circle');
         
                    $("#form_add")[0].reset();
                    $('#new_s').modal('hide');
                    table.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });



// supprimer une valeur
$('#table_activites tbody').on('click', '.supprimer', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    $('.title2').html('<span style="color:blue">Suppression de</span> '+data.nom);
    $('.confirm_action').html("supprimer <span style='color:red'>"+data.nom);
    $('#gid_sup').val(data.gid);
    $('#confirm_modal').modal('show');
});      



$('#delete_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#sup_element').serializeFormJSON();

    var s = $('#sup_element').serializeFormJSON();
    s.table='pays';
   
    
    $.ajax({
            url:'api/supprimer.php',
            type: 'POST',
            "content-type": "application/json",
            "cache-control": "no-cache",
            data: s,
            success: function (result) {
                    
                    
                    notification('success',result.message, 'fa fa-check-circle');
         
                    $("#sup_element")[0].reset();
                    $('#confirm_modal').modal('hide');
                    table.ajax.reload();

            },
            error: function (result) {
            console.log(result);
                    notification('error', result.responseJSON.message, 'fa fa-times-circle');
                    $("#loader_").html("");
            }
    });

           });




        });

        