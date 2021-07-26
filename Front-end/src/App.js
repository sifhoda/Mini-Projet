import './App.css';
import React, { useState }  from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Menubar from './components/menu-bar/menu-bar';
import Evenement from './components/event/evenement';
import Conteneur from './components/page1/conteneur';


function App() {
  const [tasks,setTasks] = useState([
    {
        nom : "linkin" ,
        prenom : "park"
    },
    {
        nom : "soad" ,
        prenom : "arials"
    },
])
  return (
    <Router>
    <>
        <Route path="/*" component={Menubar} />
        <Route path="/evenement/:id" component={Evenement} />
        <Route path="/evenements" component={Conteneur} />

    </>
    </Router>
  );
}

export default App;
