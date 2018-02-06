import axios from 'axios';
import setTokenHeader from './utils/setTokenHeader';

export default {
    fetchFromInternet :{
        fetchData: subject => {
            delete axios.defaults.headers.common.authorisedtoken;
            return axios.get(`https://www.reddit.com/r/${subject}.json`)
            .then(response => {
                setTokenHeader(localStorage.subredditToken);
                return response.data;
            });
        }
    },
    categoryAPI: {
        addCategory: category => axios.post('/api/categories', {category})
    },

    postToDB :{
        postData: data =>  axios.post(`/api/subreddits`, data)
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