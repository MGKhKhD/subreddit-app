import React from 'react';
import { Grid, Card, Icon} from 'semantic-ui-react';
import _ from 'lodash';

import CustomaryModal from '../../containers/CustomaryModal';

const GridElement = ({post, subreddit, color}) => {
    return(
        <Card>
        <Card.Content header={post.title} />
        {post.selftext && <Card.Content description={post.selftext.substring(0, 100)} />}
        <Card.Content extra>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>#Comments: {post.num_comments}</Grid.Column>
                    <Grid.Column>Score: {post.score}</Grid.Column>
                    <Grid.Column textAlign='right'>
                        <CustomaryModal post={post} 
                        subreddit={subreddit} 
                        color={color} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>
    );
};

const GridLayout = (props) => {
    const {posts, subreddit, color} = props;
    return(
        <Card.Group>
            {posts.map(post => 
            <GridElement key={post.title} color={color}
            post={post} subreddit={subreddit} />)}
        </Card.Group>
    );
}

export default GridLayout


