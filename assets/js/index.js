(function ($) {
	$.fn.serializeFormJSON = function () {

			var o = {};
			var a = this.serializeArray();
			$.each(a, function () {
					if (o[this.name]) {
							if (!o[this.name].push) {
									o[this.name] = [o[this.name]];
							}
							o[this.name].push(this.value || '');
					} else {
							o[this.name] = this.value || '';
					}
			});
			return o;
	};
})(jQuery);	

function get_videos(url)
	{
	  $("#Videos").html('<p><iframe width="100%" height="240" src="https://www.youtube.com/embed/videoseries?list=PLjBSAPIRWqmQsMRikTQoTjJJXXXLxwjaO" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>');
	}
	get_videos('https://www.youtube.com/embed/WLSArmrKbY8');


	function get_list_videos(){

 $.ajax({
           type: "POST",
            url: "api/get_list_videos.php",
			data:{type: "a"},
            success: result11,
            dataType: "json"
            });

			function result11(data){




			 $('#List_videos').empty();
			  var toAppend='<option value="">Selectionner une vidéo</option>';
			 for (var k = 0; k<data.length;k++)

			    	 toAppend += '<option value="'+data[k].url+'">'+data[k].description+'</option>';

				 $('#List_videos').append(toAppend);

			 }//fin de la boucle

			 }get_list_videos();



var prec_class="acc";
function charger_contenu(url,id)
{

	$('#all_cont').load('contenus/'+url, function() {
     });
	  $('#'+prec_class).removeClass("active");
      $('#'+id).addClass("active");
      prec_class=id;


}

var titre=["INFORMATIONS UP","INFORMATIONS GENERALES","SUIVI CAMPAGNE TABASKI","INFORMATIONS PRATIQUES"];
var contenu=["Cette rubrique présente toutes les informations portant sur les unités Pastorales (UP) encadrées par AVSF dans la zone sylvopastorale et dans la moyenne vallée du fleuve Sénégal, notamment les régions administratives de Louga et Matam. Elle permet d’avoir la cartographie de l’ensemble de ces UP et de leurs entités (localités, infrastructures, etc..), mais celle des activités d’accompagnement réalisées par AVSF et d’autres partenaires techniques. Cette rubrique dispose d’un système de requêtes qui permet de faire le choix des données à présenter, tout autant qu’il est possible de confectionner et imprimer des cartes, en combinant : des UP, des localités, des infrastructures, des données environnementales, des activités, etc.","Cette rubrique présente la cartographie des informations générales intégrant quatre (04) principales composantes, à savoir les maladies animales, le vol de bétail, le suivi infrastructure, les feux de brousse. Dans chaque thématique, il est possible de faire une cartographie dynamique et les entités sont géolocalisées et visualisables sur un support cartographique pour rendre plus fine la recherche d’information.","Le module de suivi des opérations de commercialisation des moutons de Tabaski permet de cartographier les différents marchés, qui sont classés en deux catégories (marchés hebdomadaires et quotidiens). Cette rubrique dispose de fonctionnalités de consultation des données (nombre de têtes, prix moyens, mini et maxi), des outils d&#39;analyses statistiques (tableau et graphique) et des requêtes pour personnaliser l’affichage et faciliter la recherche (affichage par date, par thématique, etc.).","La rubrique Informations pratiques présente des articles, des fiches de synthèse, des bulletins d’information, des bulletins de suivi de la campagne, des textes juridiques, et tout autre document abordant les questions liées au pastoralisme."];


function charger_rubrique(rubrique){
$(".demo-cont__credits-heading").html(titre[rubrique]);
$("#presentation_rubrique").html(contenu[rubrique]);		
}
