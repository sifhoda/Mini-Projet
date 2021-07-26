import Autre from "./autre/autre";
import Info from "./info/info";
import './random_events.css'
import React, { useState,useEffect }  from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";


function Evenement(props) {

    const [infos,setInfos]=useState([]);
    let random_events=[];
    let { id } = useParams();
    useEffect( () => {
        const getEventInfos = async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('id',id);
            axios({
                method: 'post',
                url: 'http://localhost/api/event.php',
                data : bodyFormData,
                config: { headers: {'Content-Type': 'application/json' }}

            })
            .then(function (response) {
                console.log(response.data)
                setInfos(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }

        
        getEventInfos();
    },[])

    infos.map( (elem) => (
        elem.id_event!=id ? random_events.push(elem) :""
    ))
    return (
        <>
           {infos.map( (elem) => (
               elem.id_event!=id ? "" : <Info key={id} event={elem} />
           ))}

        <div className="bottom">
            <div className="bottom-header">
                <div>
                    Autre événements
                </div>
            </div>
            <div className="bottom-body">
                {random_events.map( (elem) => (
                    <Autre key={elem.id_event} event={elem} />
                ))}
           </div>
        </div>
            

        </>
    )
}

export default Evenement;