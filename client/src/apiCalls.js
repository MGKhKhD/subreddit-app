import axios from 'axios';

export default {
    fetchFromInternet :{
        fetchData: subject => axios.get(`https://www.reddit.com/r/${subject}.json`)
        .then(response => response.data)
    },

    postToDB :{
        postData: subreddit =>  axios.post(`/api/subreddits`, subreddit)
    },

    fetchFromDB :{
        fetchData: subreddit =>  axios.get(`/api/subreddits`)
    },

    user: {
        signup: user => axios.post('/api/users', { user }).then(response => response.data.user),
        login: credentials => axios.post('/api/auth', {credentials}).then(response => response.data.user)
    }
}