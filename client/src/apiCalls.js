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

    deleteFromDB : {
        deleteData: subreddit => axios.delete(`/api/subreddits/${subreddit._id}`)
    },

    user: {
        signup: user => axios.post('/api/users', { user }).then(response => response.data.user),
        login: credentials => axios.post('/api/auth', {credentials}).then(response => response.data.user),
        confirmation: token =>axios.post('/api/auth/confirmation', {token})
        .then(response=> response.data.user)
    }
}