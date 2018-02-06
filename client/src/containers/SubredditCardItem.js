import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSubreddit } from '../actions/fetching_subreddit';
import { saveTodoDB } from '../actions/index.js';



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
              <Dropdown.Item key={category} onClick={()=>this.props.selectCategory(category)}>{category}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
        );
    }
}

class SubredditCardItem extends Component{
    constructor(props){
        super(props);
        this.state= {posts: []};

    }

    componentWillMount(){
        this.props.fetchSubreddit(this.props.todo.todo)
        .then(response => 
            this.setState({posts: response.payload}));
    }


    render(){
        const {todo, onSave, onDismiss } = this.props;
        const { posts } = this.state;
        const post = _.sample(posts);
        const options = ['untitled','war', 'news'];
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
                    <CardSaveButton categories={options} 
                    selectCategory={(category)=>{
                        this.props.onSaveClick(todo.todo,category);
                        onSave();
                    }}/>
                    <Button basic color='red' onClick={() => onDismiss()}>Dismiss</Button>
                </div>
              </Card.Content>       
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        onSaveClick: (todo, category) => dispatch(saveTodoDB(todo, category)),
        fetchSubreddit: text => dispatch(fetchSubreddit(text))
    }
}

export default connect(null, mapDispatchToProps)(SubredditCardItem);