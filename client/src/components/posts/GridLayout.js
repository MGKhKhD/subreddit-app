import React from 'react';
import { Grid, Card, Icon, Image} from 'semantic-ui-react';
import _ from 'lodash';

import CustomaryModal from '../../containers/CustomaryModal';

const GridElement = ({post, subreddit}) => {
    const imageUrl =  post.preview ? post.preview.images[0].source.url : 
    'https://i.redd.it/4qezgmi0x87z.png';
    return(
        <Card>
            <Image src={imageUrl} />
        <Card.Content header={post.title} />
        {post.selftext && <Card.Content description={post.selftext.substring(0, 100)} />}
        <Card.Content extra>
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>#Comments: {post.num_comments}</Grid.Column>
                    <Grid.Column>Score: {post.score}</Grid.Column>
                    <Grid.Column textAlign='right'>
                        <CustomaryModal post={post} 
                        subreddit={subreddit}  />
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
            <GridElement key={post.id} color={color}
            post={post} subreddit={subreddit} />)}
        </Card.Group>
    );
}

export default GridLayout


