import React from 'react';
import { Item, Grid } from 'semantic-ui-react';

import CustomaryModal from '../../containers/CustomaryModal';

const ItemElement = ({post, subreddit, color}) =>{
    const imageUrl =  post.preview ? post.preview.images[0].source.url : 
    'https://i.redd.it/4qezgmi0x87z.png';
    return(
    <Item>
        <Item.Image size='tiny' src={imageUrl} />
    <Item.Content>
        <Item.Header>{post.title}</Item.Header>
        <Item.Description>{post.selftext}</Item.Description>
        <Item.Extra>
            <Grid columns={5}>
                <Grid.Row>
                    <Grid.Column>#Comments: {post.num_comments}</Grid.Column>
                    <Grid.Column>Score: {post.score}</Grid.Column>
                    <Grid.Column>Author: {post.author}</Grid.Column>
                    <Grid.Column>Areated: {post.created}</Grid.Column>
                    <Grid.Column textAlign='right'><CustomaryModal post={post} 
                subreddit={subreddit} 
                color={color} /></Grid.Column>
                </Grid.Row>
            </Grid>
        </Item.Extra>
      </Item.Content>
    </Item>
    );
}

const BlockLayout = (props) => {
const {posts, subreddit, color} = props;
  return(
    <Item.Group link>
    {posts.map(post => 
              <ItemElement key={post.title} color={color}
              post={post} subreddit={subreddit}/>)}
    </Item.Group>
  );
}

export default BlockLayout