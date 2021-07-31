import './signin.css'
import React,{useState,useEffect} from 'react'
import { Row,InputGroup,Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { faEnvelope,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ReCaptcha } from 'react-recaptcha-google'

function Signin(){

    const [validated, setValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [wait_submitting,setWait_submitting] = useState(false);

    const [errmail,setErrmail]=useState('');
    const [nom,setNom]=useState('');
    const [prenom,setPrenom]=useState('');
    const [email,setEmail]=useState('');
    const [etabl, setEtabl] = useState('');
    const [mdp,setMdp] = useState('');
    const [cfmdp,setCfmdp] = useState('');

    const [etabls,setEtabls] = useState([]);
    const [recaptcha_token,setRecaptcha_token] = useState('');
    const [verification_recaptcha,setverification_recaptcha]=useState('');
    const [show_mdp,setShow_mdp]=useState(false);
    const [show_cfmdp,setShow_cfmdp]=useState(false);

////////////////////////////
//////////////////////validation mdp / email
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
    function validation_confirm_mdp(){
        return (submitted && mdp!="" && (cfmdp=="" || cfmdp!=mdp))
    }

/////////////////////////////////////////

/////////////////////////////////////
///////////////////////////// initialisation établissements
    useEffect( () => {

        if (window.grecaptcha ==undefined || window.grecaptcha.render==undefined) {
            window.location.reload();
        }else{
            if(window.grecaptcha.ready) window.grecaptcha.reset();
         }
        const getschools= async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('schools',true);
            axios({
                method: 'post',
                url: 'http://localhost/api/signin.php',
                data:bodyFormData,
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                setEtabls(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }
        getschools()

    },[])
///////////////////////////////////

///////////////////////////
/////////////////////////recaptcha functions
    function onloadCallback() {
        window.grecaptcha.reset();
    };
    function called(response) {
        if(response){
            console.log('Done!!!!');
            setRecaptcha_token(response);
        }
     };
//////////////////////////////

//////////////////////////////////////
////////////////////////////////Submit
    function Submit( event ) {
        setSubmitted(true);
        setValidated(true);
        setWait_submitting(true);
        const form = event.currentTarget;
        event.preventDefault();
        
        if ((form.checkValidity() === true && recaptcha_token) && (!invalid_email_pattern(email) && !validation_confirm_mdp() && mdp.length>=8)){
            let formData = new FormData();
            formData.append('nom', nom);
            formData.append('prenom', prenom);
            formData.append('email',email);
            formData.append('etabl', etabl);
            formData.append('mdp', mdp);
            formData.append('recaptcha_token',recaptcha_token);
            formData.append('RECAPTCHA_SECRET_KEY',process.env.REACT_APP_RECAPTCHA_SECRET_KEY);
            axios({
                method: 'post',
                url: 'http://localhost/api/signin.php',
                data: formData,
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                setWait_submitting(false);
                if(response.data.error){
                    let error = String(response.data.error);
                    if(error.includes('email_unique')){
                        setErrmail('Email déja exist !!!');
                    }else{
                        if(error.includes('email')){
                            setErrmail(error);
                        }
                        if(error.includes('robot')){
                            setverification_recaptcha(response.data.error);
                            window.grecaptcha.reset();
                        }
                    }
                
                }else{
                    localStorage.setItem('token',response.data.trim());
                    window.location.href="http://localhost:3000/verification";
                } 

            })
            .catch(function (response) {
                console.log(response)
            });
        }    
        setWait_submitting(false);

    }
//////////////////////////////

    return (
      <div className="Signin_form">
        <Form noValidate validated={validated} className="form" onSubmit={Submit.bind(this)}>
            <h1>S'Inscrire</h1>
            <Row className="mb-12">
              
                <Form.Group className="col-md-10">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nom *"
                        value={nom}
                        onChange={ e =>  {setNom(e.target.value)}}
                    /> 
                    <div className={submitted ? "invalid-champ" : "valid-champ"}>
                        {nom ? "" :  "Champ vide !!!"}
                    </div>        
                </Form.Group>


                <Form.Group className="col-md-10">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Prénom *"
                        value={prenom}
                        onChange={ e =>  {setPrenom(e.target.value)}}

                    />
                     <div className={submitted ? "invalid-champ" : "valid-champ"}>
                        {prenom ? "" : "Champ vide !!!"}
                    </div>           
                </Form.Group>

                
                <Form.Group className="col-md-10">
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            type="text"
                            placeholder="E-mail *"
                            value={email}
                            onChange={ e =>  {setEmail(e.target.value)}}
                            className={validation_email() ? "is-invalid":""}
                        />
                    
                        <InputGroup.Text  className={ validation_email() ? "invalid-inputgroup" : ""}> 
                            <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>        
                   </InputGroup>
                    <div className={validation_email() ? "invalid-champ" : "valid-champ"}>
                        { email ? errmail+"" : "Champ vide !!!"}
                    </div>  
                </Form.Group>


                <Form.Group className="col-md-10">
                    <Form.Select
                        required
                        value={etabl}
                        onChange={e => {
                            setEtabl(e.target.value);
                        }}
                        name="etabl"
                    >
                        <option value='' disabled>Etablissement</option>
                        {
                            etabls.map( (etabl) => (
                                <option key={etabl.id_school} value={etabl.id_school}>{etabl.school_name}</option>
                            ) )
                        }
                    </Form.Select>
                    <div className={submitted ? "invalid-champ" : "valid-champ"}>
                        {etabl ? "" : "Champ vide !!!"}
                    </div>  
                </Form.Group>


                <Form.Group className="col-md-10">
                  <InputGroup hasValidation>
                        <Form.Control
                                required
                                type={show_mdp ? "text" :"password"}
                                value={mdp}
                                onChange={ e => { setMdp(e.target.value)}}
                                placeholder="Mot de passe"
                                className={ submitted && mdp.length<8 ? "is-invalid" : ""}
                        />
                        <InputGroup.Text style={{cursor: "pointer"}} 
                            className={ submitted && (!mdp || mdp.length<8) ? "invalid-inputgroup" : ""}
                            onClick= { e => {setShow_mdp(!show_mdp)}} > 
                            <FontAwesomeIcon icon={show_mdp ? faEyeSlash :faEye} />
                        </InputGroup.Text>        
                   </InputGroup>
                   <div className={submitted ? "invalid-champ" : "valid-champ"}>
                        {mdp ? "" : "Champ vide !!!"}
                        {mdp.length<8 && mdp ? "au moin 8 caractères !!!" :""}
                    </div>  
                 </Form.Group>


                 <Form.Group className="col-md-10">
                   <InputGroup>
                       <Form.Control
                            required
                            type={show_cfmdp ? "text" :"password"}
                            value={cfmdp}
                            onChange={ e => { setCfmdp(e.target.value)}}
                            placeholder="Confirmer Mot de passe"
                            className={validation_confirm_mdp() ? "form-control input-text is-invalid" : "form-control input-text"}
                       />
                       <InputGroup.Text style={{cursor: "pointer"}} 
                            className={validation_confirm_mdp() | (submitted && cfmdp=="") ? "invalid-inputgroup" : ""}
                            onClick= { e => {setShow_cfmdp(!show_cfmdp)}}> 
                            <FontAwesomeIcon icon={show_cfmdp ? faEyeSlash :faEye} />
                        </InputGroup.Text>        
                   </InputGroup>
                   <div className={submitted ? "invalid-champ" : "valid-champ"}>
                        {validation_confirm_mdp() ? "mot de passe de confirmation incorrect !!!" : ""}
                        {!cfmdp & !mdp ? "Champ vide !!!" :""}
                    </div>  
                 </Form.Group>


                 <Form.Group className="col-md-10">
                    <Form.Check
                    required
                    name="terms"
                    label="J'accepte les termes et conditions *"
                    feedbackTooltip
                    />
                </Form.Group>


                <div className="col-md-10 recaptchu">
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
            <input type="submit" value="Inscrire" className={wait_submitting ? "col-md-8 submit_but disabled_button":"col-md-8 submit_but"}/>
            {
                wait_submitting ? 
                <>
                    <Spinner animation="border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </> : <></>
            }
            
        </Form>
      </div>
    );
    
}
export default Signin
