import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../actions/authentication';
import { withRouter } from 'react-router-dom';

import { Button} from 'semantic-ui-react';


const LogoutButton = ({ history, logout }) => (
    <Button secondary 
        onClick={()=>{
            logout();
            //history.push('/login');
        }}>
        Log out
    </Button>
  );

  function mapDispatchToProps(dispatch){
      return{
          logout: () => dispatch(logout())
      };
  }

  export default connect(null, mapDispatchToProps)(LogoutButton);