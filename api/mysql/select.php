<?php 

    include dirname(__DIR__)."/mysql/update.php";
    
   function verifie_admin_infos(&$user,$con){
    $sql = "select * from admin where Admin_Email='".$user->get_email()."';";
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else {
      $infos = json_encode(mysqli_fetch_object($result));
      $res = json_decode($infos, true);
      if(strpos($infos, 'Admin_Id') !== false) {
        if(!($user->verifie_mdp($res["Admin_Password"]))){
            $msg = array('error_mdp' => "mot de passe incorrect !");
            return $msg;
        }else{
          $user->set_nom($res["Admin_Last_Name"]);
          $user->set_prenom($res["Admin_First_Name"]);
          $user->set_id($res["Admin_Id"]);
        }
      }else{
        return false;
      }
      return true;
    } 
   }






   function verifie_user_infos($user,$con){
      $sql = "select * from citizen where Citizen_Email='".$user->get_email()."';";
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }else {
        $infos = json_encode(mysqli_fetch_object($result));
        $res = json_decode($infos, true);
        if (strpos($infos, 'Citizen_Id') !== false) {
          if(!($user->verifie_mdp($res["Citizen_password"]))){
              $msg = array('error_mdp' => "mot de passe incorrect !");
              echo json_encode($msg);
              return false;
          }else{
            $user->set_nom($res["Citizen_Last_Name"]);
            $user->set_prenom($res["Citizen_First_Name"]);
            $user->set_id($res["Citizen_Id"]);
          }
        }else{
          $msg = array('error_email' => "email incorrect !");
          echo json_encode($msg);
          return false;
        }

        $msg = array('email_verified' => $res["Email_verified"],"account_valid" => $res["Valid_account"] );
        return $msg;
      } 
   }




   
   function get_users_number($con){
    $sql = "select count(*) as count from citizen;";
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else {
      $infos = json_encode(mysqli_fetch_object($result));
      echo $infos;
    } 

   }


   

   function get_users_infos_pagination($con,$current_page,$filtre){
    switch($filtre){
      case "recent":
        $sql = "select * from citizen ORDER BY Citizen_Id DESC LIMIT ".($current_page*3).", 3"; 
        break;
      case "ancien":
        $sql = "select * from citizen ORDER BY Citizen_Id ASC LIMIT ".($current_page*3).", 3"; 
        break;
      case "email":
        $sql = "select * from citizen ORDER BY Email_verified DESC LIMIT ".($current_page*3).", 3"; 
        break;
      default :
        $sql = "select * from citizen ORDER BY Citizen_Id DESC LIMIT ".($current_page*3).", 3"; 
    }
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else {
      echo '[';
      for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
        echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
      }
      echo ']'; 
    } 

   }





    function get_schools($con){
      $sql = "select * from schools";
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }
      echo '[';
        for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
          echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
        }
      echo ']';
    }





   function verifie_validation_key($user_email,$key,$con){
      $sql = "select * from citizen where Citizen_Email='".$user_email."' && Email_verifie_key=".$key;
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }else {
        $infos = json_encode(mysqli_fetch_object($result));
        if (strpos($infos, 'Citizen_Id') !== false) {
          user_email_verified($user_email,$con);
        }
        echo $infos;
        return true;
      } 
   }






   function is_email_verified($user_email,$con){
    $sql = "select * from citizen where Citizen_Email='".$user_email."' && Email_verified=1";
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else {
      $infos = json_encode(mysqli_fetch_object($result));
      if (strpos($infos, 'Citizen_Id') !== false) {
        $msg = array('is_verified' => true);
        echo json_encode($msg);
      }else{
        $msg = array('is_verified' => false);
        echo json_encode($msg);
      }
      return true;
    } 
 }


   
?>