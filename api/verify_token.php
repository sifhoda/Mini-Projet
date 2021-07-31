<?php


    function verify_token($headers,$jwt){
        $token='';
        foreach ($headers as $name => $value) {
            if($name=="Authorization"){
            if($value){
                $token=explode(" ", $value)[1];
            }
            break;
            } 
        }
        if(gettype($jwt->jwt_decode_data($token)) !== "array"){
            http_response_code(404);
        }else{
            return ($jwt->jwt_decode_data($token));
        }
         
    }


?>