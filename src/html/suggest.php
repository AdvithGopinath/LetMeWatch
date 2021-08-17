<?php
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMDb Suggest with jQuery Autocomplete
// Author: Abhinay Rathore
// Demo: http://lab.abhinayrathore.com/imdb_suggest/
// Website: http://www.AbhinayRathore.com
// Blog: http://web3o.blogspot.com
// Last Updated: Oct 26, 2011
/////////////////////////////////////////////////////////////////////////////////////////////////////////
try{
    $term = trim(strtolower($_REQUEST['term']));
    $search = str_replace(array(" ", "(", ")"), array("_", "", ""), $term); //format search term
    $firstchar = substr($search,0,1); //get first character
    $url = "http://sg.media-imdb.com/suggests/${firstchar}/${search}.json"; //format IMDb suggest URL
    $jsonp = @file_get_contents($url); //get JSONP data
    preg_match('/^imdb\$.*?\((.*?)\)$/ms', $jsonp, $matches); //convert JSONP to JSON
    $json = $matches[1];
    $arr = json_decode($json, true);
    $s = array(); //New array for jQuery Autocomplete data format
    if(isset($arr['d'])){
        foreach($arr['d'] as $d){
            $img = preg_replace('/_V1_.*?.jpg/ms', "_V1._SY50.jpg", $d['i'][0]);
            $s[] = array('label' => $d['l'], 'value' => $d['id'], 'cast' => $d['s'], 'img' => $img, 'q' => $d['q']);
        }
    }
    header('content-type: application/json; charset=utf-8');
    echo json_encode($s); //Convert it to JSON again
} catch (Exception $e){
    //Do nothing
}
?>