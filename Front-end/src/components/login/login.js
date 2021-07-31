import './login.css'
import React,{useState,useEffect} from 'react'
import { Row,InputGroup,Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { faEnvelope,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ReCaptcha } from 'react-recaptcha-google'



function Login(){
    
    const [validated, setValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [wait_submitting,setWait_submitting] = useState(false);

    const [errmail,setErrmail]=useState('');
    const [errmdp,setErrmdp]=useState('');
    const [email,setEmail]=useState('');

    const [mdp,setMdp] = useState('');
    const [verification_recaptcha,setverification_recaptcha]=useState('');
    const [recaptcha_token,setRecaptcha_token] = useState('');
    const [show_mdp,setShow_mdp]=useState(false);


    useEffect(()=>{
        if (window.grecaptcha ==undefined || window.grecaptcha.render==undefined) {
            window.location.reload();
        }else{
            if(window.grecaptcha.ready) window.grecaptcha.reset();
        }
    },[]);

//////////////////////////////
/////////////email validation
    function invalid_email_pattern(email){
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(email!=""){
            if (!pattern.test(email)) {
                setErrmail("Email invalid !!!");
                return true ;
              }else{
                return false ;
              }
        }return true;
    }
    function validation_email(){
        return submitted && (errmail || !email || invalid_email_pattern(email));
    }
/////////////////////////

///////////////////////////
/////////////////////////recaptcha functions
    function onloadCallback() {
        window.grecaptcha.reset();
    };
    function called(response) {
       if(response){
           console.log('Done!!!!');
           setRecaptcha_token(response);
           setverification_recaptcha("");
       }
    };
////////////////////////////

/////////////////////////////
/////////////////////////////Submit
    function Submit( event ) {
        setSubmitted(true);
        setValidated(true);
        setWait_submitting(true);
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === true && recaptcha_token && !invalid_email_pattern(email)){
            let formData = new FormData();
            formData.append('email',email);
            formData.append('mdp', mdp);
            formData.append('recaptcha_token',recaptcha_token);
            formData.append('RECAPTCHA_SECRET_KEY',process.env.REACT_APP_RECAPTCHA_SECRET_KEY);
            axios({
                method: 'post',
                url: 'http://localhost/api/login.php',
                data: formData,
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                setWait_submitting(false);
                if(response.data.error_email){
                    setErrmail(response.data.error_email);
                }else{
                    if(response.data.error_mdp){
                        setErrmdp(response.data.error_mdp);
                    }else{
                        if(response.data.error){
                            setverification_recaptcha(response.data.error);
                            window.grecaptcha.reset();
                        }else{
                            localStorage.setItem('token',response.data.trim());
                            window.location.href="http://localhost:3000";
                        }
                    } 
                }
                console.log(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }
        setWait_submitting(false);
        
    }

///////////////////////////////////////

    return (
      <div className="login_form">
        <Form noValidate validated={validated} onSubmit={Submit.bind(this)} className="form">
          <h2>Authentification</h2>
            <Row className="mb-12">
                
                <Form.Group className="col-md-10">
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            type="text"
                            placeholder="E-mail *"
                            value={email}
                            onChange={ e =>  {setEmail(e.target.value);setErrmail('')}}
                            className={validation_email() || errmail ? "is-invalid":""}
                        />
                        <InputGroup.Text  className={ validation_email() ? "invalid-inputgroup" : ""}> 
                            <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text> 

                   </InputGroup>
                    <div className={validation_email() || errmail ? "invalid-champ" : "valid-champ"}>
                        { !email ? "Champ vide !!!" : ""}
                        { errmail ? errmail : ""}
                    </div>  
                </Form.Group>



                <Form.Group className="col-md-10">
                  <InputGroup hasValidation>
                        <Form.Control
                                required
                                type={show_mdp ? "text" :"password"}
                                value={mdp}
                                onChange={ e => { setMdp(e.target.value);setErrmdp('')}}
                                className={errmdp ? "is-invalid":""}
                                placeholder="Mot de passe"
                        />
                        <InputGroup.Text style={{cursor: "pointer"}} 
                            className={ submitted && (!mdp || errmdp) ? "invalid-inputgroup" : ""}
                            onClick= { e => {setShow_mdp(!show_mdp)}} > 
                            <FontAwesomeIcon icon={show_mdp ? faEyeSlash :faEye} />
                        </InputGroup.Text> 
                               
                   </InputGroup>
                   <div className={submitted ? "invalid-champ" : "valid-champ"}>
                        {mdp ? "" : "Champ vide !!!"}
                        { errmdp ? errmdp : ""}
                    </div>  
                 </Form.Group>




                <div className="col-md-10 recaptchu_login">
                    <ReCaptcha
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onloadCallback={onloadCallback.bind()}
                        verifyCallback={called.bind()}
                    />
                     <div className={submitted && (!recaptcha_token || verification_recaptcha) ? "invalid-champ" : "valid-champ"}>
                        {verification_recaptcha ? verification_recaptcha : "Néccessaire !!!"}
                    </div> 
                </div>
                
            </Row> 

            <input type="submit" value="Authentifier" className={wait_submitting ? "col-md-8 submit_but disabled_button":"col-md-8 submit_but"}/>
            {
                wait_submitting ? 
                <>
                    <Spinner animation="border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </> : <></>
            }
            <div className="col-md-11 under_submit">
                    <a href='/#'>Mot de passe oublié</a>
                    <a href='/inscription'>S'inscrire</a>
            </div>

        </Form>
      </div>
    );
    
}

export default Login
