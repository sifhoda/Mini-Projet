<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    require dirname(__DIR__)."../mysql/DBconnexion.php" ;
    require dirname(__DIR__)."../mysql/select.php" ;
/* 
    require dirname(__DIR__)."../Models/Jwt.php";
    require dirname(__DIR__)."../verify_token.php";
    $jwt = new Jwt_handler();

    $infos_user = verify_token(apache_request_headers(),$jwt);
    $id_user = $infos_user['Citizen_Id'];
 */
    $key = @$_POST['validation_key'];
    $user_email = @$_POST['user_email'];
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
          break;
        case 'POST':
          if(@$_POST["is_user_email_verified"]){
            is_email_verified($_POST["is_user_email_verified"],$con);
          }else{
            verifie_validation_key($user_email,$key,$con);
          }
        break;
    }  

?>