<?php
    
    include dirname(__DIR__).'../php-jwt/src/JWT.php';
    use \Firebase\JWT\JWT;

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
                    "Citizen_Id" => $user->get_id(), 
                    "Citizen_Last_Name" => $user->get_nom(),
                    "Citizen_First_Name" => $user->get_prenom()
                )
            );

            $this->jwt = JWT::encode($this->token, $this->jwt_secrect);
            return $this->jwt;

        }
    
        public function jwt_decode_data($jwt_token){
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            return get_object_vars($decode->data);
        }

    }
    
?>