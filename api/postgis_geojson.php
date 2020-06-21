<?php
error_reporting(0);
/*
 * Title:   PostGIS to GeoJSON
 * Notes:   Query a PostGIS table or view and return the results in GeoJSON format, suitable for use in OpenLayers, Leaflet, etc.
 * Author:  Bryan R. McBride, GISP
 * Contact: bryanmcbride.com
 * GitHub:  https://github.com/bmcbride/PHP-Database-GeoJSON
 */

# Connect to PostgreSQL database
include_once('config2.php');


# Build SQL SELECT statement and return the geometry as a GeoJSON element


//if($emprise=='Nationale')
$sql = 'SELECT OGR_FID as gid, ST_AsGeoJSON(SHAPE,2) AS geojson,toponyme01 as localite FROM sn_etablissements_humains LIMIT 0,1000';

/*
else
$sql = "SELECT *, public.ST_AsGeoJSON(public.ST_Transform((".$couche.".geom),4326),6) AS geojson,entite_administratives.nom as nom_unite FROM ".$couche.",entite_administratives 
where St_within(".$couche.".geom,entite_administratives.geom) and entite_administratives.gid in (".$emprise.")";
**/



/*
* If bbox variable is set, only return records that are within the bounding box
* bbox should be a string in the form of 'southwest_lng,southwest_lat,northeast_lng,northeast_lat'
* Leaflet: map.getBounds().toBBoxString()
*/
// if (isset($_GET['bbox'])) {
    // $bbox = explode(',', $_GET['bbox']);
    // $sql = $sql . ' WHERE public.ST_Transform(the_geom, 4326) && public.ST_SetSRID(public.ST_MakeBox2D(public.ST_Point('.$bbox[0].', '.$bbox[1].'), public.ST_Point('.$bbox[2].', '.$bbox[3].')),4326);';
// }

# Try query or error
$req = $conn->prepare($sql);
    $req->execute();


# Build GeoJSON feature collection array
$geojson = array(
   'type'      => 'FeatureCollection',
   'features'  => array()
);

# Loop through rows to build feature arrays
while ($row = $req->fetch(PDO::FETCH_ASSOC)) {
    $properties = $row;
    # Remove geojson and geometry fields from properties
    unset($properties['geojson']);
    unset($properties['SHAPE']);
    $feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($row['geojson'], true),
         'properties' => $properties
    );
    # Add feature arrays to feature collection array
    array_push($geojson['features'], $feature);
}

header('Content-type: application/json');
echo json_encode($geojson, JSON_NUMERIC_CHECK);
$conn = NULL;
?>
