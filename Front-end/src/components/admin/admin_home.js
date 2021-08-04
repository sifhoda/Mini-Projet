import "./admin_home.css";
import React,{useEffect,useState} from 'react';
import Pagination from "react-js-pagination";
import axios from 'axios';
import Form from 'react-bootstrap/Form'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useAuth } from '../../contexts/user_auth_context';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Admin_home() {

  const { currentUser } = useAuth();

  
  const classes = useStyles();
  const [rows,setRows] =useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [userPerPage,setuserPerPage] =useState(3);
  const [users_number,setusers_number]=useState(0);

  const [filtre,setfiltre] =useState('');


//////////////////////////////
//////////////////////////////

  useEffect(()=>{
    ///////////////////////////////////////////////////

    const getuserPerPage = async () => {
        var formData = new FormData();
        formData.append('users_infos',true);
        const headers = { 
            'Content-Type': 'application/json',
            'Authorization' : "Bearer "+currentUser
            };
        axios.post('http://localhost/api/Admin/verify_accounts.php', formData, { headers })
            .then(response =>  {
               setusers_number(response.data.count);
               console.log(response.data)
            }).catch(response => console.log(response));
    }

    
    ////////////////////////////////////////////////////
    const load_data = async () => {
       ////get url params
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if(urlParams.get('filtre')){
        setfiltre(urlParams.get('filtre'));
        console.log(filtre);
      }else setfiltre("recent");
       ///////

      let formData = new FormData();
      formData.append('page',0);
      formData.append('filtre',urlParams.get('filtre'));
      const headers = { 
          'Content-Type': 'application/json',
          'Authorization' : "Bearer "+currentUser
      };
      axios.post('http://localhost/api/Admin/verify_accounts.php', formData,{ headers })
          .then(response =>  {
              //console.log(response.data);
              setRows(response.data);
          }).catch(response => console.log(response));
    } 

    getuserPerPage();
    load_data();

  },[])



 ///////////////////////////
 //////////////////////on page change 
  function change(page){
    setCurrentPage(page);
    let formData = new FormData();
    formData.append('page',page-1);
    formData.append('filtre',filtre);
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization' : "Bearer "+currentUser
    };
    axios.post('http://localhost/api/Admin/verify_accounts.php', formData,{ headers })
        .then(response =>  {
            setRows(response.data);
        }).catch(response => console.log(response));
    }


/////////////////////////////////////////////
//////////////////////////////////checkbox
    function change_compte_status(elem){
        const user_id = elem.target.id;
        const state = elem.target.checked? 1 : 0;
        console.log(state +" "+user_id);
        let updatedList = rows.map(row => {
                if (row.Citizen_Id == user_id){
                    return {...row, Valid_account: state};
                }
                return row; 
            });
        setRows(updatedList); 

        let formData = new FormData();
        formData.append('user_id',user_id);
        formData.append('account_state',state);
        const headers = { 
            'Content-Type': 'application/json',
            'Authorization' : "Bearer "+currentUser
        };
        axios.post('http://localhost/api/Admin/verify_accounts.php', formData,{ headers })
            .then(response =>  {
                console.log(response.data);
            }).catch(response => console.log(response));

    }

  
////////////////////////////////////////
/////////////////////////////onchange select options
    function filtre_type(event){
      setfiltre(event.target.value);
      window.location.href = 'http:////' + window.location.host + window.location.pathname +"?filtre="+event.target.value;
    }


///////////////////////////////////
////////////////////////////
    function logout(){
      localStorage.clear();
      window.location.href="/";
    }


/////////////////////////////////////
  return (
  <div className="admin_home">
    <header >
      <div className="admin_home_header">  
        <div>
          <Form.Select
              required
              value={filtre}
              onChange={filtre_type.bind(this)}
          >
              <option value='recent'>Inscription Récent</option>
              <option value='ancien'>Inscription Ancien</option>
              <option value='email'>Email vérifier</option>     
          </Form.Select>
        </div>
        <button type="button" className="btn mb-2 mb-md-0 btn-outline-primary" onClick={logout.bind()}>Se déconnecter</button>
      </div>
    </header>
   <div className="table_container">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Prénom</TableCell>
            <TableCell align="right">CIN</TableCell>
            <TableCell align="right">Téléphone</TableCell>
            <TableCell align="right">Status Email</TableCell>
            <TableCell align="right">Status Compte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table_body">
          {rows.map((row) => (
            <TableRow key={row.Citizen_Id} id={row.Citizen_Id}>
              <TableCell component="th" scope="row">
              {row.Citizen_Email}
              </TableCell>
              <TableCell align="right">{row.Citizen_Last_Name}</TableCell>
              <TableCell align="right">{row.Citizen_First_Name}</TableCell>
              <TableCell align="right">{"vide" || row.Citizen_Cne}</TableCell>
              <TableCell align="right">{"vide" || row.Citizen_Tel}</TableCell>
              <TableCell align="right" className={row.Email_verified!=0? "email_verified":"email_not_verified"}>{row.Email_verified!=0? "Verifié":"Non Vérifié"}</TableCell>
              <TableCell align="right">
                    <div className='d-flex w-100'>
                        <Form.Check 
                            type={'checkbox'}
                            id={row.Citizen_Id}
                            checked={row.Valid_account!=0? true : false}
                            onChange={change_compte_status.bind(this)}
                            style={{ fontSize: 20 }}
                        />
                    </div>
               </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="page1_bottom">
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={userPerPage}
            totalItemsCount={Number(users_number)}
            pageRangeDisplayed={3}
            onChange={change.bind(this)}
        />
    </div>
   </div>
  </div>
  );
}


