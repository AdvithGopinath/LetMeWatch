<?php
header("Content-type: image/jpeg");
//URL for IMDb Image.
$url = rawurldecode($_REQUEST['url']);
echo file_get_contents($url);
?>