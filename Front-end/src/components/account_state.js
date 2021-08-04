import React,{useEffect} from 'react'

function Account_state(props) {

    useEffect(()=>{
        if(props.location.state == undefined){
            window.location.href="/"
        }
        
    },[]);

    return (
        <div className="validation_msg">
                <h2>Votre compte a était bien créer et vérifier.  </h2>
            Dans quelques heures, votre compte sera vu et validé par l'administrateur.
        </div>
    )
}

export default Account_state ;
