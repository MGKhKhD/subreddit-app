import api from '../apiCalls';


let idx = 0;

export function addTodo(text) {
    return {
        type: "ADD_TODO",
        payload: text,
        id: idx++,
        saved: false
    };
}

export const checkIfSubredditExist = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => {
    if(jsonData){
        dispatch(addTodo(subreddit))
    }
});

export function todoClick(todo){
    return {
        type: "TODO_CLICK",
        payload: todo
    };
}