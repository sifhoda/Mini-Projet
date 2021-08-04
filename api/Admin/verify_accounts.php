<?php 

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include dirname(__DIR__)."/mysql/DBconnexion.php";
    include dirname(__DIR__)."/mysql/insert.php";
    include dirname(__DIR__)."/mysql/select.php";

    require dirname(__DIR__)."/Models/Jwt.php";
    require dirname(__DIR__)."/verify_token.php";
    $jwt = new Jwt_handler();

    $infos_user = verify_token(apache_request_headers(),$jwt);


    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
          break;
        case 'POST':
            if(isset($_POST["page"])){
                get_users_infos_pagination($con,$_POST["page"],$_POST["filtre"]);
            }
            if(isset($_POST["users_infos"])){
                get_users_number($con);
            }
            if(isset($_POST["account_state"])){
                valide_user_account($_POST["user_id"],$_POST["account_state"],$con);
            }
        break;
    }  
   
?>