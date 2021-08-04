import React, { useState, useContext, useEffect } from 'react'

const Context = React.createContext();

export function useAuth(){
    return useContext(Context);
}

export function Auth_provider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if(localStorage.getItem('user_connected')) setCurrentUser(JSON.parse(localStorage.getItem('user_connected')));
        else setCurrentUser(localStorage.getItem('admin_token'));
        setLoading(false);
    }, [])

    const value = {
        currentUser
    }

    return (
        <Context.Provider value={value}>
            { !loading && children }
        </Context.Provider>
    )
}
