import React, { Component } from 'react';

import { Table } from 'semantic-ui-react';

class DisplayPosts extends Component{
    render(){
        const rows = [];
        const { posts } = this.props;
        posts.forEach(post => rows.push(
            <Table.Row key={post.id}>
              <Table.Cell>{post.title}</Table.Cell>
              <Table.Cell>{post.score}</Table.Cell>
              <Table.Cell> {post.num_comments}</Table.Cell>
              <Table.Cell> {post.author}</Table.Cell>
              <Table.Cell> {post.created}</Table.Cell>
              <Table.Cell> {post.url? "included" : 'none'}</Table.Cell>
            </Table.Row>));
        return(
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={5}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Score</Table.HeaderCell>
                        <Table.HeaderCell width={2}>#Comments</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Author</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Created At</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Media</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        );
    }
} 

export default DisplayPosts;
  
