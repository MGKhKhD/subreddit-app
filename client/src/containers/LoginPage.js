import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginFormComponent from '../components/LoginFormComponent';
import { connect } from 'react-redux';
import OAuthForm from '../components/OAuthPage';
import { login } from '../actions/authentication';

class LoginPageContainer extends Component{

    submit(credentials){
        return this.props.login(credentials).then(()=>this.props.history.push('/dashboard'));
    }

    render(){
        return(
            <div>
                <LoginFormComponent submit={this.submit.bind(this)}/>               
                <Link to='/forget_password'>Forget Password?</Link>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        login: credentials => dispatch(login(credentials))
    };
}

export default connect(null,mapDispatchToProps)(LoginPageContainer);
