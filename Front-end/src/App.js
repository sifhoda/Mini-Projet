import './App.css';
import React,{useState,useEffect} from 'react';

import { loadReCaptcha } from 'react-recaptcha-google'
import GuardRoute from './guards/GuardRoute';
import Menubar from './components/menu-bar/menu-bar';
import Evenement from './components/event/evenement';
import Conteneur from './components/page1/conteneur';
import Login from './components/login/login';
import Signin from './components/signin/singnin';
import Email_verfication from './components/email_verfication/email_verfication';
import { BrowserRouter as Router ,Route} from 'react-router-dom';
import ExampleComponent from './components/recaptcha'
import Admin_home from './components/admin/admin_home';
import Account_state from './components/account_state';
import { Auth_provider } from './contexts/user_auth_context';




function App() {

  const [user_connected,setUser_connected] = useState(false);
  const [admin_connected,setAdmin_connected] = useState(false);
  const [apache,setapache] = useState(false);

  useEffect( () => {
    const isAuth = async () => {
        if(localStorage.getItem('user_connected')) setUser_connected(true);
        if(localStorage.getItem('admin_token')) setAdmin_connected(true);
    }
    
    isAuth();

  });

  return (
    <Auth_provider>
      <Router>

          <Route
            path='/*'
            component={() => admin_connected ? <Admin_home /> : <Menubar auth={user_connected}/>}
          />
          <Route path="/evenement/:id" component={Evenement} auth={user_connected} />
          <Route path="/evenements" component={Conteneur} auth={user_connected} />
          <GuardRoute path="/inscription" component={Signin} auth={user_connected || admin_connected} />
          <GuardRoute path="/authentification" component={Login} auth={user_connected || admin_connected} />
          <Route path="/verification" render={(props) => <Email_verfication {...props}/>}/>
          <GuardRoute path="/account_status" component={Account_state} auth={user_connected || admin_connected} />

      </Router>
    </Auth_provider>
  );
}

export default App;
