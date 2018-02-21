import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCancellationOfSubredditInSaveOrDismissTodo } from '../actions/index';
import { saveTodoDB, fetchCategories } from '../actions/index.js';



import { Card, Icon, Button, Dropdown } from 'semantic-ui-react';


class CardSaveButton extends Component{
    render(){
        return(
        <Dropdown text='Save' icon='filter' 
        floating labeled button className='icon' 
        color='green'>
            <Dropdown.Menu>
              <Dropdown.Header content='Categories' />
              {this.props.categories.map(category => 
              <Dropdown.Item key={category.category} onClick={()=>this.props.selectCategory(category.category)}>{category.category}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
        );
    }
}

class SubredditCardItem extends Component{
    constructor(props){
        super(props);
        this.state= {errors:{}};

    }

    componentWillMount(){

        this.props.fetchCategories()
        .catch(err => {
            if(err.response){
                this.setState({errors: err.response.data.errors});
            }}
        );
    }



    render(){
        const {todo, onSave, onDismiss, categories } = this.props;
        const post = todo.post;
        return(
            <Card >
            <Card.Content>           
                <Card.Header style={{color: todo.saved? "green": "red"}}>
                  {todo.todo}
                </Card.Header>
                <Card.Meta>
                {!!post? post.domain: ''}
                </Card.Meta>
                <Card.Description>
                  {!!post? post.title: ''}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                    <CardSaveButton categories={categories} 
                    selectCategory={(category)=>{
                        this.props.onSaveClick(todo.todo, category);
                        onSave();
                        this.props.cancelSubredditFetch(todo.todo);
                    }}/>
                    <Button basic color='red' onClick={() => {
                        this.props.cancelSubredditFetch(todo.todo);
                        onDismiss();
                    }}>Dismiss</Button>
                </div>
              </Card.Content>       
            </Card>
        );
    }
}

function mapStateToProps(state){
    return{
        categories: state.categories,
    };
}

function mapDispatchToProps(dispatch){
    return{
        onSaveClick: (todo, category) => dispatch(saveTodoDB(todo, category)),
        fetchCategories: () => dispatch(fetchCategories()),
        cancelSubredditFetch: subreddit => dispatch(fetchCancellationOfSubredditInSaveOrDismissTodo(subreddit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditCardItem);