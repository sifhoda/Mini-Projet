<?php 

    include dirname(__DIR__)."/mysql/update.php";

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


   function verifie_validation_key($id_user,$key,$con){
      $sql = "select * from citizen where Citizen_Id=".$id_user."&& Email_verifie_key=".$key;
      $result = mysqli_query($con,$sql);
      if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
      }else {
        $infos = json_encode(mysqli_fetch_object($result));
        if (strpos($infos, 'Citizen_Id') !== false) {
          valide_user_compte($id_user,$con);
        }
        echo $infos;
        return true;
      } 
   }


   function get_infos_user_by_email(&$user,$con){
    $sql = "select Citizen_Id from citizen where Citizen_Email ='".$user->get_email()."';";
    $result = mysqli_query($con,$sql);
    if (!$result) {
      http_response_code(404);
      die(mysqli_error($con));
    }else {
      $infos = json_encode(mysqli_fetch_object($result));
      $res = json_decode($infos, true);
      if($infos!=""){
            $user->set_id($res["Citizen_Id"]);
      }
      return true;
    } 

   }


   function verifie_user_infos($user,$con){
      $sql = "select Citizen_Id,Citizen_password from citizen where Citizen_Email='".$user->get_email()."';";
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
            }
        }else{
          $msg = array('error_email' => "email incorrect !");
          echo json_encode($msg);
          return false;
        }
        return true;
      } 
   }

   
?>