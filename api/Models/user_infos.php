<?php 
    namespace user ;
    class User_infos {
        private $nom,$prenom,$email,$etablissement,$mdp;
        private $hash;
        private $validation_key,$id_user;
       
        function set_nom($nom) {
          $this->nom=$nom;
        }
        function set_email($email) {
            $this->email=$email;
        }
        function set_prenom($prenom) {
            $this->prenom=$prenom;
        }

        function set_etabl($etabl) {
            $this->etablissement=$etabl;
        }
        function set_mdp($mdp) {
            $this->mdp=$mdp;
            $this->hash= password_hash($mdp, PASSWORD_DEFAULT);
        }

        function set_id($id) {
            $this->id_user=$id;
        }


        function set_validation_key($key) {
            $this->validation_key=$key;
        }
        function get_nom() {
          return $this->nom;
        }
        function get_prenom() {
            return $this->prenom;
        }
        function get_email() {
          return $this->email;
        }
        function get_etablissemet() {
            return $this->etablissement;
        }
        function get_mdp_crypter() {
            return $this->hash;
        }
        function get_id() {
            return $this->id_user;
        }

        function verifie_mdp($hash){
            return password_verify($this->mdp,$hash);
        }

        function __toString()
        {
            return "('".$this->nom."','".$this->prenom."','".$this->email."','".$this->hash.
            "',".$this->etablissement.",0,0,".$this->validation_key.")";
        }
      }
      
?>