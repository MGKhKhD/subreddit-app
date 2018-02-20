import axios from 'axios';
import 'abortcontroller-polyfill';
import setTokenHeader from './utils/setTokenHeader';

const AbortController = window.AbortController;

export default {
    fetchFromInternet :{
        fetchData: (subject, sort) => {
            return fetch(`https://www.reddit.com/search.json?q=${subject}&sort=${sort}&limit=100`)
            .then(response => response.json())
        },
        fetchSubredditData: (subject, sort, abort) => {
            let controller = new AbortController();
            let signal = controller.signal;
            if(abort){
                controller.abort();
                return fetch(`https://www.reddit.com/search.json?q=${subject}&sort=${sort}&limit=100`, {signal});
            }else{
                return fetch(`https://www.reddit.com/search.json?q=${subject}&sort=${sort}&limit=100`)
                .then(response => response.json());
            }
        }
    },
    categoryAPI: {
        addCategory: category => axios.post('/api/categories', {category}), 
        fetchCategories: () => axios.get('/api/categories')
    },

    subredditAPI: {
        postData: data =>  axios.post(`/api/subreddits`, data),
        fetchData: () =>  axios.get(`/api/subreddits`),
        deleteData: subredditId => axios.delete(`/api/subreddits/${subredditId}`)
    },

    bookmarkAPI:{
        saveBookmark: data => axios.post('/api/bookmarks', data),
        deleteBookmark: title => axios.delete(`/api/bookmarks/${title}`),
        fetchBookmarks: () => axios.get('/api/bookmarks')
    },

    user: {
        signup: user => axios.post('/api/users', { user }).then(response => response.data.user),
        login: credentials => axios.post('/api/auth', {credentials}).then(response => response.data.user),
        confirmation: token =>axios.post('/api/auth/confirmation', {token})
        .then(response=> response.data.user)
    }
}