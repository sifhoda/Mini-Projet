<?php
    
   require_once dirname(__DIR__).'../php-jwt/src/JWT.php';
    use \Firebase\JWT\JWT;
    use Firebase\JWT\SignatureInvalidException;

class Jwt_handler {
        protected $jwt_secrect;
        protected $token;
        protected $issuedAt;
        protected $expire;
        protected $jwt;

        public function __construct()
        {
            $this->issuedAt = time();
            $this->expire = $this->issuedAt + 6400;
            $this->jwt_secrect = "motdepasse";  
        }

        public function jwt_encode_data($user){

            $this->token = array(
                "iss" => "http://localhost/api/",
                "aud" => "http://localhost/api/",
                "iat" => $this->issuedAt,
                "exp" => $this->expire,
                "data" => array(
                    "User_Id" => $user->get_id(), 
                    "User_Last_Name" => $user->get_nom(),
                    "User_First_Name" => $user->get_prenom()
                )
            );

            $this->jwt = JWT::encode($this->token, $this->jwt_secrect);
            return $this->jwt;

        }
    
        public function jwt_decode_data($jwt_token){
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            if($decode){
                return get_object_vars($decode->data);
            }else{
                return false;
            }
        }

    }
    
?>