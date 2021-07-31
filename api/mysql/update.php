<?php 

   function valide_user_compte($id_user,$con){
    $sql = "UPDATE citizen SET Email_verified=1 WHERE Citizen_Id=".$id_user."";
    $result = mysqli_query($con,$sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }else {
      return true;
    } 

   }

   
?>