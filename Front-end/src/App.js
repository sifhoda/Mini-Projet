import './App.css';
import React,{useState,useEffect} from 'react';

import { loadReCaptcha } from 'react-recaptcha-google'
import GuardRoute from './guards/GuardRoute';
import Menubar from './components/menu-bar/menu-bar';
import Evenement from './components/event/evenement';
import Conteneur from './components/page1/conteneur';
import Login from './components/login/login';
import Signin from './components/signin/singnin';
import Email_verfication from './components/signin/email_verfication/email_verfication';
import { BrowserRouter as Router ,Route} from 'react-router-dom';



function App() {
  const [isAuthentified,setIsAuthentified] = useState(false);

  useEffect( () => {
    const isAuth = async () => {
        if(localStorage.getItem('token')) setIsAuthentified(true);
    }
    isAuth();
  });

  function componentDidMount() {
    loadReCaptcha();
  }
  
  return (
    <Router>
    <>
        <Menubar auth={isAuthentified} />
        <Route path="/evenement/:id" component={Evenement} auth={isAuthentified} />
        <Route path="/evenements" component={Conteneur} auth={isAuthentified} />
        <GuardRoute path="/inscription" component={Signin} auth={isAuthentified} />
        <GuardRoute path="/authentification" component={Login} auth={isAuthentified} />
        <Route path="/verification" component={Email_verfication} />

    </>
    </Router>
  );
}

export default App;
