import React from 'react';
import { Grid, Card, Icon} from 'semantic-ui-react';
import _ from 'lodash';

const GridElement = ({post}) => {
    return(
        <Card>
        <Card.Content header={post.title} />
        {post.selftext && <Card.Content description={post.selftext.substring(0, 100)} />}
        <Card.Content extra>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>#Comments: {post.num_comments}</Grid.Column>
                    <Grid.Column>Score: {post.score}</Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>
    );
};

const GridLayout = (props) => {
    const {posts} = props;
    return(
        <Card.Group>
            {posts.map(post => 
            <GridElement key={post.title} post={post}/>)}
        </Card.Group>
    );
}

export default GridLayout


