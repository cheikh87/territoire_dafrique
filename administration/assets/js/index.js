var get_entites = function (entite,id_parent) {
        var liste_ent="<option value=''>"+entite+"</option>";
        var parent;
      if(entite==="departements") entite_parent="regions"
      else entite_parent="departements";
      
      id_parent=$("#entite_"+entite_parent).val();
        var obj={
          uniteAdmin:entite,
          parent:id_parent
              }
              obj=JSON.stringify(obj);
            $.ajax({
              url: 'api/get_entites.php?entite='+entite,
              type: 'GET',
              'async': false,
              'global': false,
              contentType : 'application/json; charset=UTF-8',
              data: obj,
                'success': function (result) {
      
                for(var k=0;k<result.length;k++)
                {
              if(parent===result[k].nom_parent && entite!="regions") {
                liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
              }
      else if (entite==="regions") {
        liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
      }
              else {
                liste_ent +=" <optgroup label='"+result[k].nom_parent+"'><option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
              }
      
              parent=result[k].nom_parent;
                }
      
                }
            });
      
            return liste_ent;
        }


        var get_entites2 = function (entite,id_parent) {
          var liste_ent="<option value=''>"+entite+"</option>";
          var parent;
        if(entite==="departements") entite_parent="regions"
        else entite_parent="departements";
        
        
          var obj={
            uniteAdmin:entite,
            parent:id_parent
                }
                obj=JSON.stringify(obj);
              $.ajax({
                url: 'api/get_entites2.php?entite='+entite+'&id_parent='+id_parent,
                type: 'GET',
                'async': false,
                'global': false,
                contentType : 'application/json; charset=UTF-8',
               // data: obj,
                  'success': function (result) {
        
                  for(var k=0;k<result.length;k++)
                  {
                if(parent===result[k].nom_parent && entite!="regions") {
                  liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
                }
        else if (entite==="regions") {
          liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
        }
                else {
                  liste_ent +=" <optgroup label='"+result[k].nom_parent+"'><option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
                }
        
                parent=result[k].nom_parent;
                  }
        
                  }
              });
        
              return liste_ent;
          }


          var get_geom_entites = function (entite,id) {
            var liste_ent;
          
          
                $.ajax({
                  url: 'api/get_geom_entites.php?entite='+entite+'&gid='+id,
                  type: 'GET',
                  'async': false,
                  'global': false,
                  contentType : 'application/json; charset=UTF-8',
                 // data: obj,
                    'success': function (result) {
                      liste_ent=result;
                   
                    }
                });
          
                return liste_ent;
            }


        var get_especes = function () {
          var liste_ent="<option value=''>Sélectionner</option>";
              $.ajax({
                url: 'api/get_especes.php',
                type: 'GET',
                'async': false,
                'global': false,
                contentType : 'application/json; charset=UTF-8',
               // data: obj,
                  'success': function (result) {
        
                  for(var k=0;k<result.length;k++)
                  {
                    liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom_espece+"</option>";
                  }
        
                  }
              });
        
              return liste_ent;
          }


          var get_localites = function () {
            var liste_ent="<option value=''>Sélectionner</option>";
                $.ajax({
                  url: 'api/get_localites.php',
                  type: 'GET',
                  'async': false,
                  'global': false,
                  contentType : 'application/json; charset=UTF-8',
                 // data: obj,
                    'success': function (result) {
          
                    for(var k=0;k<result.length;k++)
                    {
                      liste_ent +="<option value='"+result[k].gid+"'>"+result[k].localite+"</option>";
                    }
          
                    }
                });
          
                return liste_ent;
            }
			
			 var get_pays = function () {
            var liste_ent="<option value=''>Sélectionner</option>";
                $.ajax({
                  url: 'api/get_pays_.php',
                  type: 'GET',
                  'async': false,
                  'global': false,
                  contentType : 'application/json; charset=UTF-8',
                 // data: obj,
                    'success': function (result) {
          
                    for(var k=0;k<result.length;k++)
                    {
                      liste_ent +="<option value='"+result[k].gid+"'>"+result[k].nom+"</option>";
                    }
          
                    }
                });
          
                return liste_ent;
            }


            var get_maladies = function () {
              var liste_ent="<option value=''>Sélectionner</option>";
                  $.ajax({
                    url: 'api/get_list_maladies.php',
                    type: 'GET',
                    'async': false,
                    'global': false,
                    contentType : 'application/json; charset=UTF-8',
                   // data: obj,
                      'success': function (result) {
            
                      for(var k=0;k<result.length;k++)
                      {
                        liste_ent +="<option value='"+result[k].gid+"'>"+result[k].maladie+"</option>";
                      }
            
                      }
                  });
            
                  return liste_ent;
              }

			  
			   var get_marches = function () {
              var liste_ent="<option value=''>Sélectionner</option>";
                  $.ajax({
                    url: 'api/get_list_marches.php',
                    type: 'GET',
                    'async': false,
                    'global': false,
                    contentType : 'application/json; charset=UTF-8',
                   // data: obj,
                      'success': function (result) {
            
                      for(var k=0;k<result.length;k++)
                      {
                        liste_ent +="<option value='"+result[k].gid+"'>"+result[k].marches+"</option>";
                      }
            
                      }
                  });
            
                  return liste_ent;
              }


              


            var get_liste_infras = function (up,type) {
              var liste_ent;
                  $.ajax({
                    url: 'api/get_infrastructures.php?up='+up+'&type='+type,
                    type: 'GET',
                    'async': false,
                    'global': false,
                    contentType : 'application/json; charset=UTF-8',
                      'success': function (result) {
                      liste_ent=result;           
                      }
                  });
            
                  return liste_ent;
              }



              var get_types = function () {
                var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_type_docs.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              
                        for(var k=0;k<result.length;k++)
                        {
                          liste_ent +="<option value='"+result[k].gid+"'>"+result[k].type_doc+"</option>";
                        }
              
                        }
                    });
              
                    return liste_ent;
                }
      
	  
	    var get_types_don = function () {
                var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_type_dons.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              
                        for(var k=0;k<result.length;k++)
                        {
                          liste_ent +="<option value='"+result[k].gid+"'>"+result[k].type_doc+"</option>";
                        }
              
                        }
                    });
              
                    return liste_ent;
                }
				
				 var get_bases = function () {
                var liste_ent="<option value=''>Sélectionner</option>";
                    $.ajax({
                      url: 'api/get_bases.php',
                      type: 'GET',
                      'async': false,
                      'global': false,
                      contentType : 'application/json; charset=UTF-8',
                     // data: obj,
                        'success': function (result) {
              
                        for(var k=0;k<result.length;k++)
                        {
                          liste_ent +="<option value='"+result[k].nom+"'>"+result[k].nom+"</option>";
                        }
              
                        }
                    });
              
                    return liste_ent;
                }
      
    


