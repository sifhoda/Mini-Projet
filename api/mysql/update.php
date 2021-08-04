<?php 

   function user_email_verified($user_email,$con){
      $sql = "UPDATE citizen SET Email_verified=1 WHERE Citizen_Email='".$user_email."'";
      $result = mysqli_query($con,$sql);
      if (!$result) {
          http_response_code(404);
          die(mysqli_error($con));
      } 
   }


   function valide_user_account($user_id,$account_state,$con){
    $sql = "UPDATE citizen SET Valid_account=".$account_state." WHERE Citizen_Id=".$user_id."";
    $result = mysqli_query($con,$sql);
    if (!$result) {
        http_response_code(404);
        die(mysqli_error($con));
    }
    echo $user_id." : ".$account_state;
 }

   
?>