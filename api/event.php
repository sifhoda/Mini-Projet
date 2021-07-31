<?php 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include dirname(__DIR__)."/api/mysql/DBconnexion.php" ;

    @$id_event = (int)$_POST["id"];
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch ($method) {
        case 'GET':
          break;
        case 'POST':
        $sql = "select * from events ".
            "where (id_event!=".$id_event.") or (id_event=".$id_event.
            ") ORDER BY rand() ".
            " LIMIT 5 ;";
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
      echo json_encode($result);
    } else {
      echo mysqli_affected_rows($con);
    }
    
  
     
   
    $con->close();
?>