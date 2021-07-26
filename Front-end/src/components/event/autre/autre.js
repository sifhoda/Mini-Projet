import React  from 'react';
import './autre.css';



function Autre({event}) {
    
    function lire_plus(){
        window.location.href = "http://"+window.location.host+"/evenement/"+event.id_event;
    }

    const img = event.Image_event;
    return (
        <div onClick={lire_plus.bind()}>
            <img src={img} className="bottom-body-img"/>

            <div className="bottom-body-titre">
                {event.Event_Designation}
            </div>
        </div>
    )
}

export default Autre;