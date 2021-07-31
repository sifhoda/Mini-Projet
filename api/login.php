<?php
    function email_validation($email){
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg = array('error' => "Invalid email !!!"); //etc
        echo json_encode($msg);
        die();
      }
    }

    $valide_recaptcha=false;
    function validate_recaptcha_token(){
      global $valide_recaptcha;
      $Msg=array("text" => '');
      if (isset($_POST['recaptcha_token']) && !empty(@$_POST['recaptcha_token'])){
        $secret = @$_POST['RECAPTCHA_SECRET_KEY'];
        $verifyResponse = file_get_contents ('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.@$_POST['recaptcha_token']); 
        $responseData = json_decode ($verifyResponse); 
        if ($responseData-> success){
          $valide_recaptcha=true;
        }else {
          $Msg["error"] = 'La vérification du robot a échoué, veuillez réessayer.'; 
          echo json_encode ($Msg);
          die();
        }
      }
    }

?>

<?php 
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    include dirname(__DIR__)."/api/mysql/DBconnexion.php";
    include dirname(__DIR__)."/api/mysql/insert.php";
    include dirname(__DIR__)."/api/mysql/select.php";

    include dirname(__DIR__)."/api/verify_email/send_verification.php";
    include dirname(__DIR__)."/api/Models/Jwt.php";
    include dirname(__DIR__)."/api/Models/user_infos.php" ;

    $jwt = new Jwt_handler();

    use user\User_infos as User_infos;
    $user=new User_infos();
    
    $user->set_email(@$_POST["email"]);
    $user->set_mdp(@$_POST["mdp"]);

    validate_recaptcha_token();
    


    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
          break;
        case 'POST':
          email_validation(@$_POST["email"]); 
          if($valide_recaptcha){
            if(verifie_user_infos($user,$con)){
                get_infos_user_by_email($user,$con);
                echo $jwt->jwt_encode_data($user);
            }
          }
        break;
    }  
   
?>