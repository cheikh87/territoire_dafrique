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
        "url": 'api/get_donne.php?statut_user='+statut_user+'&pays='+pays
    },
    buttons: [ 'excel', 'pdf', 'colvis' ],
    columns: [
        {
            "data": "",
            "render": function (data) {
                var bouton_modifier = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="modifier" class="btn-warning modifier"><i class="fa fa-edit"></i></button>';
                var bouton_supprimer = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="supprimer" class="btn-danger supprimer"><i class="fa fa-trash"></i></button>';
               // var bouton_zone_interv = '&nbsp;<button data-toggle="tooltip" data-placement="left" title="Zone d\'intervention" class="btn-success intervention"><i class="fa fa-map"></i></button>'; 
                    return '<div style="font-size:10px;" align="center">'+
                       bouton_modifier+bouton_supprimer
                    +'</div>';
               
            }
        },
        {"data": "intitule"},
       {"data": "date_publication"},
        {"data": "description"},
        {
            "data": "revu",
            "render": function (data) {
                var img = '<iframe src="../documents/donnees_suivi/'+data+'" width="100%" height="150px"> </iframe>';
               
                    return '<div style="font-size:10px;padding:-20px" align="center">'+
                       img
                    +'</div>';
               
            }
        }

    ],
    
  } );

  //table.ajax.reload();


//Fonction qui déclenche le popup d'ajout de nouvelles valeurs

$('#new_s_').on('click', function (e) {

    $("#import_file").show();
    var mesTypes=get_types_don();
   $('#type_doc').empty();
   $('#type_doc').append(mesTypes);
   
   

    $('.title_activity').text('Ajout de nouvelles données');
    $('#edit_').hide();
    $('#add_').show(); 
    $('#new_s').modal('show');   
});

$('#add_').on('click', function (e) {
    e.preventDefault();

    var file = _("nom_fichier").files[0];
        // alert(file.name+" | "+file.size+" | "+file.type);
        nom_fichier=file.name;
       //var description=$("#description").val();
       var type_doc="donnees_suivi";
        var formdata = new FormData();
        formdata.append("file1", file);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
      
        
        
        ajax.open("POST", "api/upload2.php?description="+type_doc+"&type_doc="+type_doc); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
        //use file_upload_parser.php from above url
        ajax.send(formdata);
       
        
        function progressHandler(event) {
            _("loaded_n_total").innerHTML = "Chargement du fichier effectué";
            var percent = (event.loaded / event.total) * 100;
            _("progressBar").value = Math.round(percent);
            _("status").innerHTML = Math.round(percent) + "% chargement... veuillez attendre";
          }
          
          function completeHandler(event) {
            _("status").innerHTML =  event.target.responseText;
            _("progressBar").value = 0; //wil clear progress bar after successful upload
            
            var s = $('#form_add').serializeFormJSON();
            s.table='revus';
			s.pays=pays;
            s.revu=nom_fichier;
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
    
    
          }
          
          function errorHandler(event) {
            _("status").innerHTML = "Upload Failed";
          }
          
          function abortHandler(event) {
            _("status").innerHTML = "Upload Aborted";
          }
    
    
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
    $("#import_file").hide();
    var mesTypes=get_types_don();
    $('#type_doc').empty();
    $('#type_doc').append(mesTypes);
  
    $('.title_activity').text('Modifier une valeur');
   
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
    $('#intitule').val(data.intitule);
    $('#type_doc').val(data.type_doc);
	
	$('.description').each(function( index ) {
  $(this).summernote('destroy');
});
	
    $('#description').val(data.description);
	
   $('.description').summernote({
            height: 200,
            tabsize: 2
        });
	 $('#date_publication').val(data.date_publication);
    $('#gid').val(data.gid);

    $('#new_s').modal('show');
});  


$('#edit_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#form_add').serializeFormJSON();

    var s = $('#form_add').serializeFormJSON();
    s.table='revus';
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
    $('.title2').html('<span style="color:blue">Suppression de la revue </span> '+data.intitule);
    $('.confirm_action').html("supprimer la revue :<span style='color:red'>"+data.intitule);
    $('#gid_sup').val(data.gid);
    $('#confirm_modal').modal('show');
});      



$('#delete_').on('click', function (e) {
    e.preventDefault();
//	var s = $('#indicator_infos_form').serialize();

var s_json=$('#sup_element').serializeFormJSON();

    var s = $('#sup_element').serializeFormJSON();
    s.table='revus';
   
    
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



// Zone d'intervention
$('#table_activites tbody').on('click', '.intervention', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr')).data();
    
    $('.title3').html('<span style="color:blue">Zone d\'intervention du projet</span> '+data.nom_du_projet);
    $('#zone_inter_modal').data('id_projet', data.gid);
    $('#zone_inter_modal').modal('show');
    var mesUnites=get_entites("regions","regions");
    $('#regions').empty();
    $('#regions').append(mesUnites);

    var mesUnites=get_entites("departements","departements");
    $('#departements').empty();
    $('#departements').append(mesUnites);

    var mesUnites=get_entites("communes","communes");
    $('#communes').empty();
    $('#communes').append(mesUnites);

    zone_de_projets(data.gid,"*");
    
});  

$('#zone_inter_modal').on('show.bs.modal', function(){
    setTimeout(function() {
      map.invalidateSize();
    }, 5);
   });



        });


        function charger_map(){

        var mapCenter = [22, 87];
        var map = L.map('map', {center : mapCenter, zoom : 3});
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i875mjb7',
            noWrap : true
        }).addTo(map);
        
        
        var marker = L.marker(mapCenter).addTo(map);
        var updateMarker = function(lat, lng) {
            marker
                .setLatLng([lat, lng])
                .bindPopup("Your location :  " + marker.getLatLng().toString())
                .openPopup();
            return false;
        };
        
        map.on('click', function(e) {
            $('#latInput').val(e.latlng.lat);
            $('#lngInput').val(e.latlng.lng);
            updateMarker(e.latlng.lat, e.latlng.lng);
        });
        
        var updateMarkerByInputs = function() {
            return updateMarker( $('#latInput').val() , $('#lngInput').val());
        }
        $('#latInput').on('input', updateMarkerByInputs);
        $('#lngInput').on('input', updateMarkerByInputs);

    }


    var nom_fichier;
    function _(el) {
      return document.getElementById(el);
    }

    