import './page1.css'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Event from './event';
import Pagination from "react-js-pagination";

function Conteneur() {
    const [events,setEvents]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [eventsPerPage,setEventsPerPage] =useState(4);
    const [events_number,setEvents_number]=useState(0);

    useEffect( () => {
        const geteventsPerPage = async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('page',1);
            axios({
                method: 'post',
                url: 'http://localhost/api/events.php',
                data:bodyFormData,
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                setEvents(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }

        const getEvents = async () => {
            axios({
                method: 'get',
                url: 'http://localhost/api/events.php',
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                setEvents_number(response.data.count)
            })
            .catch(function (response) {
                console.log(response)
            });
        }
        getEvents();
        geteventsPerPage();
    },[])


    function change(page){
        setCurrentPage(page);
        const geteventsPerPage = async () => {
            var bodyFormData = new FormData();
            bodyFormData.append('page',currentPage-1);
            axios({
                method: 'post',
                url: 'http://localhost/api/events.php',
                data:bodyFormData,
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(function (response) {
                setEvents(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }
        geteventsPerPage();
    }

    return (
        <div className="page1_conteneur">
              <div className="page1_title">Evenements<p></p></div>
              <div id="page1_events">
                  {
                    events.map( (event)=> (<Event key={event.id_event} infos={event} />)) 
                  }  
                  
              </div>
              <div className="page1_bottom">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={eventsPerPage}
                        totalItemsCount={Number(events_number)}
                        pageRangeDisplayed={5}
                        onChange={change.bind(this)}
                    />
              </div>

        </div>
    )
}

export default Conteneur
