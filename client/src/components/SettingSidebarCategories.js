import React, { Component } from 'react';
import {Card} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { addCategory } from '../actions/index';

class SettingSidebarCategories extends Component{
    constructor(props){
        super(props);
        this.state={category: '', errors: {}};

    }

    handleAddCategory = (category) => 
        this.props.addCategory(category)
        .catch(err => {
            if(err.response){
                this.setState({errors: err.response.data.errors});
            }
        });

    render(){
        const {errors, category } = this.state;
        return(
            <div>
                <Card>
                    <Card.Content textAlign='left' style={{fontSize: '1erm'}}>
                        <Card.Header>Add Category</Card.Header>
                        <Card.Meta style={{fontSize: '.5erm'}}>
                        <input type="text" placeholder="News, War, ..." 
                        onChange={(e)=>this.setState({...category, category: e.target.value})}
                        value={category}
                        onKeyPress={(e)=>{
                            if(e.key === 'Enter'){
                                this.handleAddCategory(category);
                                this.setState({category: ''});
                            }
                        }}/>
                        </Card.Meta>
                    </Card.Content>
                </Card>
               {!!errors > 0  && <Card >
                <Card.Content>
                        <Card.Description style={{color: 'red'}}>{errors.global}</Card.Description>
                    </Card.Content>
               </Card>} 
            </div>
        );
    }
}

function mapDisptchToProps(dispatch){
    return{
        addCategory: category => dispatch(addCategory(category))
    };
}


export default connect(null, mapDisptchToProps)(SettingSidebarCategories);