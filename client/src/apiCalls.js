import axios from 'axios';

export default {
    fetchFromInternet :{
        fetchData: subject => axios.get(`https://www.reddit.com/r/${subject}.json`)
        .then(response => response.data)
    },

    fetchFromDB :{
        fetchData: subreddit =>  axios.post(`/user/subreddits`, {subreddit})
    }
}