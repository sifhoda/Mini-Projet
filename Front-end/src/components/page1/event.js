import './page1.css'
import React from 'react'

Event = ({infos}) => {
    let img=infos.Image_event;

    function lire_plus(){
        console.log(infos.id_event)
    }
    
    return (
        <div className="event">
            <img src={img} />
            <div className="div1">
               {infos.Event_Description}
            </div>
            <pre className="div2">
                debut : {infos.Start_event} <br />
                fin : {infos.End_event} <br />
                lieu : {infos.Place_event}
            </pre>
            <div className="div22">
                <div className="div3">
                    <div>Documents Jointes :</div>
                    <div>
                        <a href="#">Fichier1</a>
                        <a href="#">Fichier2</a>
                        <a href="#">Fichier3</a>
                    </div>
                </div>
                <a href={`/evenement/${infos.id_event}`} className="lire_plus" >LIRE PLUS</a>
            </div>
        </div>
    )
    
}



export default Event
