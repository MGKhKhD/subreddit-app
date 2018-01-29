import React, { Component } from 'react';
import SignupPageComponent from '../components/SignupPageComponent';
import { connect } from 'react-redux';
import { signupUser } from '../actions/authentication';

class SignupPage extends Component{

    handleSignupForm(credentials){
        return this.props.signup(credentials)
        .then(() => this.props.history.push('/dashboard'));
    }        

    render(){
        return(
            <SignupPageComponent submit={this.handleSignupForm.bind(this)}/>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        signup: credentials => dispatch(signupUser(credentials))
    };
}


export default connect(null,mapDispatchToProps)(SignupPage);