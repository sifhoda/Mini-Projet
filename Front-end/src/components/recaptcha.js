import React from 'react';
import { ReCaptcha } from 'react-recaptcha-google';


function Showing_Recaptcha({recaptcha_loaded,called}){

  function onloadCallback() {
      window.grecaptcha.reset();
  };


  if(recaptcha_loaded){
      return  <ReCaptcha
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onloadCallback={onloadCallback.bind()}
                  verifyCallback={called.bind()}
              />
  }else return <></>;
}
export default Showing_Recaptcha; 