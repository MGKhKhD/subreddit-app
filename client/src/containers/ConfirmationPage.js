import React, { Component } from 'react';
import {Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {confirmEmail} from '../actions/authentication';

class ConfirmationPage extends Component{
    constructor(props){
        super(props);
        this.state={loading: true, confirmed: false};
    }

    componentDidMount(){
        this.props.confirmEmail(this.props.match.params.token)
        .then(()=> this.setState({loading: false, confirmed: true}))
        .catch(()=> this.setState({loading: false, confirmed: false}));
    }

    render(){
        const { loading, confirmed } = this.state;
        return(
            <div>
                {loading && <Message icon>
                    <Icon name='circle notched' loading/>
                    <Message.Header>
                        Confirmation message is sent. Please  check your email.
                    </Message.Header>
                </Message>}
                {(!loading && confirmed) && <Message success icon>
                    <Icon name='checkmark box' />
                    <Message.Content>
                    <Message.Header>
                        Your Email is confirmed.
                    </Message.Header>
                    <Link to='/dashboard'>Go to your dashboard</Link>
                    </Message.Content>
                </Message>}
                {(!loading && !confirmed) && <Message negative icon>
                    <Icon name='warning sign' />
                    <Message.Content>
                    <Message.Header>
                        Unsuccessful Confirmation. Try again.
                    </Message.Header>
                    </Message.Content>
                </Message>}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        confirmEmail: token => dispatch(confirmEmail(token))
    };
}


export default connect(null,mapDispatchToProps)(ConfirmationPage);