<?php 
    header('Access-Control-Allow-Origin: *');

    $host = "localhost"; 
    $user = "root"; 
    $password = ""; 
    $dbname = "miniprojet"; 
    @$current_page=!(int)$_POST["page"];


    $con = mysqli_connect($host, $user, $password,$dbname);

    if (!$con) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
          $sql = "select COUNT(*) as count from events"; 
          break;
        case 'POST':
          $sql = "SELECT * FROM events LIMIT ".($current_page*4).", 4"; 
          break;
    }
    
  $result = mysqli_query($con,$sql);
  if (!$result) {
    http_response_code(404);
    die(mysqli_error($con));
  }


  if ($method == 'POST') {
   echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
  echo ']';
  } elseif ($method == 'GET') {
    echo json_encode(mysqli_fetch_object($result));
  } else {
    echo mysqli_affected_rows($con);
  }
  

   
 
  $con->close();

?>