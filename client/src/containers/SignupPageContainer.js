import React, { Component } from 'react';
import SignupPageComponent from '../components/SignupPageComponent';
import { connect } from 'react-redux';
import { signupUser } from '../actions/authentication';

class SignupPageContainer extends Component{

    handleSignupForm (credentials){
        return this.props.signup(credentials);
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

function mapStateToProps(state){
    return{
        responseToSignUpFromServer: state.signupEmailPassword
    };
}

export default connect(null,mapDispatchToProps)(SignupPageContainer);