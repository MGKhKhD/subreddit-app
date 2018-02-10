import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchBookmarks} from '../../actions/bookmarks_actios';

import { Table } from 'semantic-ui-react';
import CustomaryModal from '../../containers/CustomaryModal';

class DisplayBookmarks extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        return this.props.fetchBookmarks();
    }
    
    render(){
        const rows = [];
        const { bookmarks } = this.props;

        bookmarks.forEach(bookmark => rows.push(
            <Table.Row key={bookmark._id} >
              <Table.Cell>{bookmark.title}</Table.Cell>
              <Table.Cell>{bookmark.meta.score}</Table.Cell>
              <Table.Cell> {bookmark.meta.num_comments}</Table.Cell>
              <Table.Cell> {bookmark.meta.author}</Table.Cell>
              <Table.Cell> {bookmark.meta.createdAt}</Table.Cell>
            </Table.Row>));
            return(
            <Table celled selectable >
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell width={7}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Score</Table.HeaderCell>
                        <Table.HeaderCell width={2}>#Comments</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Author</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Created At</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }
} 

function mapStateToProps(state){
    return{
        bookmarks: state.bookmarks
    };
}

export default connect(mapStateToProps, { fetchBookmarks })(DisplayBookmarks);

