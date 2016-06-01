<?php
// Geolocation Device Locator PHP Script
// Writing to a text file on a web server
if(isset($_GET['get']))
{
	$filename = $_GET['get'].".txt";
	if(file_exists($filename))
	{
	    $file = file_get_contents($filename);
		echo $file;
	} else
		echo "ERROR! Path not found for " . $_GET['get'];
}
//if the request is an update,we dump the lights into a file
// named after the device making the request
else if(isset($_GET['update']) && isset($_GET['direction']))
{
	$fh =fopen($_GET['update'].".txt", "a");
	if($fh == FALSE)
	{
		echo "ERROR. Cannot open file on server.";
		echo "{'status':1}";
		return;
	}
	if(fwrite($fh, $_GET['direction']."\n") == FALSE)
		echo "ERROR. Writing to file.";
	if(fclose($fh) == FALSE)
		echo "ERROR. Closing file,";

    header("Access-Control-Allow-Origin: *");
	echo '{"status":0}';

}
?>