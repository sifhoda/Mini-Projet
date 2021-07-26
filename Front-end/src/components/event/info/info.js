import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import React  from 'react';
import './info.css';

import Cal from '../../calendar';

var iconStyle = {
    marginRight: ".5rem",
    width: "18px",
    height: "18px"
}

function Info({event}){
    return (
        <div className="top">
            <div className="top-body">
                <div className="top-content">
                    <div style={{backgroundImage : `url('${event.Image_event}')`}}
                    className="top-content-img">
                    </div>
                    <nav className="top-content-description">
                        {event.Event_Description}
                    </nav>
                </div>
                <InfoRight event={event} />
            </div>
        </div>
    )
}

function InfoRight(props){
    const event = props.event;
    const dateRange = [ String(event.Start_event), String(event.End_event) ];
    return (

        <div className="top-info">
            <div className="top-info-DandP">
                <p style={{fontWeight: 700}}>Date de disponibilité</p>
                <Cal range={dateRange} />

                <p>
                    <FontAwesomeIcon style={iconStyle} icon={faMapMarkerAlt} />
                    {event.Place_event}
                </p>
            </div>
            <div className="top-info-F">
                <a href={event.File1_event}>
                    <FontAwesomeIcon style={iconStyle} icon={faArrowAltCircleDown} /> Fichier 1
                </a>
                <a href={event.File2_event}>
                    <FontAwesomeIcon style={iconStyle} icon={faArrowAltCircleDown} /> Fichier 2
                </a>
                <a href={event.File3_event}>
                    <FontAwesomeIcon style={iconStyle} icon={faArrowAltCircleDown} /> Fichier 3
                </a>
            </div>
        </div>
    )
}

export default Info;