import React, { Component } from 'react';
import {Card, Icon} from 'semantic-ui-react';

class SettingSidebarCategories extends Component{
    render(){
        return(
            <Card>
                <Card.Content textAlign='center' style={{fontSize: '1erm'}}>
                    <Card.Header>Add Category</Card.Header>
                    <Card.Meta style={{fontSize: '.5erm'}}>News, War, ...</Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}

export default SettingSidebarCategories;