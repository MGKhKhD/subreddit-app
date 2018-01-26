import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../actions/authentication';

import { Button} from 'semantic-ui-react';


const LogoutButton = ({ history, logout }) => (
    <Button secondary 
        onClick={()=>{
            logout();
            history.push('/homepage');
        }}>
        Logout
    </Button>
  );

  function mapDispatchToProps(dispatch){
      return{
          logout: () => dispatch(logout())
      };
  }

  export default connect(null, mapDispatchToProps)(LogoutButton);