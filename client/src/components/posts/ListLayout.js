import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';
import CustomaryModal from '../../containers/CustomaryModal';

class ListLayout extends Component{
    render(){
        const rows = [];
        const { posts, subreddit, color } = this.props;

        posts.forEach(post => rows.push(
            <Table.Row key={post.id} >
              <Table.Cell>{post.title}</Table.Cell>
              <Table.Cell>{post.score}</Table.Cell>
              <Table.Cell> {post.num_comments}</Table.Cell>
              <Table.Cell> {post.author}</Table.Cell>
              <Table.Cell> {post.created}</Table.Cell>
              <Table.Cell textAlign="center">
                <CustomaryModal post={post} 
                subreddit={subreddit} 
                color={color} />
              </Table.Cell>
            </Table.Row>));
            return(
            <Table celled selectable color={color}>
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell width={6}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Score</Table.HeaderCell>
                        <Table.HeaderCell width={2}>#Comments</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Author</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Created At</Table.HeaderCell>
                        <Table.HeaderCell width={1}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }
} 

export default ListLayout;

