export  function todos(state=[], action){
    switch(action.type){
        case "ADD_TODO":
            return [...state, {
                id: action.id,
                todo: action.payload,
                saved: action.saved
            }];
        default: 
            return state;
    }
}

export function todoClick(state={}, action){
    switch(action.type){
        case "TODO_CLICK":
             return action.payload;
        default: 
            return state;
    }
}