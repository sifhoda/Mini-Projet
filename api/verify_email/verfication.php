<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    require dirname(__DIR__)."../mysql/DBconnexion.php" ;
    require dirname(__DIR__)."../mysql/select.php" ;

    require dirname(__DIR__)."../Models/Jwt.php";
    require dirname(__DIR__)."../verify_token.php";
    $jwt = new Jwt_handler();

    $infos_user = verify_token(apache_request_headers(),$jwt);
    $id_user = $infos_user['Citizen_Id'];

    $key = @$_POST['validation_key'];
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
          break;
        case 'POST':
            verifie_validation_key($id_user,$key,$con);
        break;
    }  

?>