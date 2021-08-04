import './email_verfication.css'
import React,{useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { Redirect ,useHistory} from 'react-router-dom';


function Email_verfication(props) {

    const history = useHistory();


    const [validated, setValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [user_email,setUser_email] = useState('');

    const [validation_key,setValidation_key]=useState('');
    const [err_validation_key,setErr_validation_key]=useState('');
    const [Valide_key,setValide_key]=useState('');

    useEffect(()=>{
        if(props.location.state != undefined){
            setUser_email(props.location.state.user_email);
        }
        
    },[]);


    function Submit( event ) {
        setSubmitted(true);
        setValidated(true);

        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === true) { 
            console.log(props.location.state.account_valid)
            let formData = new FormData();
            formData.append('validation_key',validation_key);
            formData.append('user_email',user_email);
            const headers = { 
                'Content-Type': 'application/json'
            };
            axios.post('http://localhost/api/verify_email/verfication.php', formData, { headers })
                .then(response =>  {
                    if(!response.data){
                        setErr_validation_key('Clé Incorrect !!');
                    }else{
                        setErr_validation_key('');
                        setValide_key('Email est bien vérifié !');
                        if(props.location.state.account_valid==1){
                            setTimeout( () => window.location.href="/", 1000);
                        }else{
                            setTimeout( () => {
                                history.push({
                                    pathname: '/account_status',
                                    state: { waiting : true }
                                  });
                            }, 1000);
                        }
                    }
                }).catch(response => console.log(response));
           
        }   
    }

    return (
     <div className="validation_email_parent">
        {
           props.location.state==undefined ?  <> <Redirect to="/" /> </>
            : <></>
        }
        <div>
            <h2>Votre compte a était bien créer .  </h2>
        </div>
        <div>
            <div>
            <Form noValidate validated={validated} onSubmit={Submit.bind(this)}>
                <Row>
                    <div> Clé de validation de l'email : </div>
                    <Form.Group className="col-md-5">
                        <Form.Control
                            required
                            className={submitted && (!validation_key || err_validation_key) ? "is-invalid" : "email-valide"}
                            type="number"
                            placeholder="Clé "
                            value={validation_key}
                            onChange={ e =>  {setValidation_key(e.target.value)}}
                        /> 
                        <div className={submitted && Valide_key ? "email-valide" : "invalid-champ"}>
                            {submitted && !validation_key && !err_validation_key ? "Champ vide !!!" : ""}
                            {submitted && err_validation_key ? err_validation_key :  ""}
                            {submitted && Valide_key ? Valide_key :  ""}
                        </div>        
                    </Form.Group>
                </Row>
                <input type="submit" value="Valider" className="col-md-2"/>
            </Form>
            </div>
        </div>
            
     </div>
    )
}


export default Email_verfication
