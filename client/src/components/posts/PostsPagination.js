import React, { Component } from 'react';
import { connect } from 'react-redux';

import PaginationComponent from '../PaginationComponent';

class PostsPagination extends Component{

    handleChangePage(displayablePosts) {
        this.props.displayPosts(displayablePosts);
    }

    render(){
        return(<PaginationComponent 
            items = {this.props.posts} 
            pageSize = {this.props.numPostsPerPage}
            onChangePage={this.handleChangePage.bind(this)} />);
    }
}

function mapStateToProps(state){
    return {
        numPostsPerPage: state.displayScheme.numPostsPerPage
    }
}


export default connect(mapStateToProps)(PostsPagination);