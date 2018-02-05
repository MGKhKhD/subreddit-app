import axios from 'axios';

export default (token = null) => {
    if(token){
        axios.defaults.headers.common.authorisedtoken = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common.authorisedtoken;
    }
};