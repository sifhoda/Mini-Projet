<?php
 include dirname(__DIR__).'../phpmailer/src/Exception.php';
 include dirname(__DIR__).'../phpmailer/src/PHPMailer.php';
 include dirname(__DIR__).'../phpmailer/src/SMTP.php';

 use PHPMailer\PHPMailer\PHPMailer as PHPMailer;
 use PHPMailer\PHPMailer\Exception;

 function send_verf($email,$val_key){
    $mail = new PHPMailer();
    try{           
        $mail->IsSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "ssl";
        $mail->Username   = 'elaich.test@gmail.com';       
        $mail->Password = 'SU3QiUyMmlkZW50a';  
        $mail->Port = "465";       
        
        $mail->setFrom('elaich.houssam@gmail.com');

        $mail->isHTML(true);                                 
        $mail->Subject = 'Valdition';
        $mail->Body    = '<b>Clés de validation : </b>'.$val_key;

        $mail->addAddress($email); 


        $mail->send();
    } catch (Exception $e) {
        http_response_code(500);
    }
  }

?>