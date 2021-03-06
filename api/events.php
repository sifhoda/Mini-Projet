<?php 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
 
    include dirname(__DIR__)."/api/mysql/DBconnexion.php" ;

    @$current_page=!(int)$_POST["page"];
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
          $sql = "select COUNT(*) as count from events"; 
          break;
        case 'POST':
          $sql = "select * from events LIMIT ".($current_page*4).", 4"; 
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