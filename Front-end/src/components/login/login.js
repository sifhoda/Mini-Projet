import './login.css'
import Showing_Recaptcha from '../recaptcha';

import React,{useState,useEffect} from 'react'
import { Row,InputGroup,Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { faEnvelope,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useHistory } from 'react-router-dom';





function set_local_storage(data){

    if(data.admin_token){
        localStorage.setItem('admin_token',data.admin_token.trim());
    }else{
        
        let info_user = {
            "token" : data.token.trim(),
            "Citizen_First_Name": data.Citizen_First_Name,
            "Citizen_Id": data.Citizen_Id,
            "Citizen_Last_Name": data.Citizen_Last_Name
        }
        localStorage.setItem('user_connected',JSON.stringify(info_user));
    }
}





function Login(){

    const history = useHistory();
    ////Validation vars
    const [all_user_infos_validated,setAll_user_infos_validated] =useState(false);
    const [validated_form, setvalidated_form] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [wait_submitting,setWait_submitting] = useState(false);

    const [account_valid,setAccount_valid] = useState(1);

    ////Errors vars
    const [errmail,setErrmail]=useState('');
    const [errmdp,setErrmdp]=useState('');

    //////form inputs
    const [email,setEmail]=useState('');
    const [mdp,setMdp] = useState('');
    const [show_mdp,setShow_mdp]=useState(false);

    ///////////////Recaptcha validators
    const [verification_recaptcha,setverification_recaptcha]=useState('');
    const [recaptcha_loaded,setRecaptcha_loaded] = useState(false);
    const [recaptcha_token,setRecaptcha_token] = useState('');


    useEffect(()=>{
       const loading_recaptcha = async () => {
           setTimeout(()=>setRecaptcha_loaded(true),1000);
       }
       loading_recaptcha();
    },[recaptcha_loaded]);

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
    

    function called(response) {
        if(response){
            console.log('Done!!!!');
            setRecaptcha_token(response);
            setverification_recaptcha('');
        }
    };

////////////////////////////

/////////////////////////////
/////////////////////////////Submit
    function Submit( event ) {
        setSubmitted(true);
        setvalidated_form(true);
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
                            if(response.data.admin_token){
                                set_local_storage(response.data);
                                window.location.href="http://localhost:3000/Admin_home";
                            }else{
                                if(response.data.email_verified!=0){
                                    if(response.data.account_valid!=1){
                                        setAccount_valid(response.data.account_valid);
                                        
                                        history.push({
                                            pathname: '/account_status',
                                            state: { waiting : true }
                                          });
                                    }else{
                                        set_local_storage(response.data);
                                        window.location.href="http://localhost:3000";
                                    }
                                }else{
                                    history.push({
                                        pathname: "/verification",
                                        state: { 
                                            user_email : email,
                                            account_valid : response.data.account_valid
                                        }
                                      });
                                }
                            }
                        }
                    } 
                }
                console.log(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }else{
            setWait_submitting(false);
        }
        
    }

///////////////////////////////////////



/////////////////////////////////////////////////

    return (
      <div className="login_form">
        <Form noValidate validated={validated_form} onSubmit={Submit.bind(this)} className="form">
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
                    <Showing_Recaptcha recaptcha_loaded={recaptcha_loaded}  called={called}/>
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
