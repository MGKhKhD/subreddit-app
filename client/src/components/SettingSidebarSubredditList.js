
import React,  { Component } from 'react';
import { connect } from 'react-redux';
import SettingSideBarSubredditsPerCategory from './SettingSideBarSubredditsPerCategory';
import {fetchCategories} from '../actions/index';

import { Menu } from 'semantic-ui-react';




class SettingSidebarSubredditList extends Component{
    constructor(props){
        super(props);
        this.state={errors: {}};

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
        const { categories } = this.props;
        return(<Menu vertical>
            {categories.map(category => <Menu.Item key={category._id}>
                <Menu.Header>{category.category}</Menu.Header>
                {!!category.subreddits && <SettingSideBarSubredditsPerCategory 
                todos={category.subreddits}/>}
            </Menu.Item>
        )
        }
        </Menu>);
}
}


function mapStateToProps(state){
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, 
    { fetchCategories })(SettingSidebarSubredditList);
