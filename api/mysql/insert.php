<?php 

   function insert_user_infos($infos,$con){
    $sql = "insert into citizen".
    "(Citizen_Last_Name, Citizen_First_Name,Citizen_Email,Citizen_password, school_id,Email_verified, Valid_account, Email_verifie_key)".
    " VALUES ".$infos;
    $result = mysqli_query($con,$sql);
    if (!$result) {
      $msg = array('error' => mysqli_error($con)); //etc
      echo json_encode($msg);
      return false;
    }else {
      return true;
    } 

   }

   
?>