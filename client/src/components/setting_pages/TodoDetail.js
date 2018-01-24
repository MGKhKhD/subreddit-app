import React from 'react';
import { connect } from 'react-redux';

const TodoDetail = ({text}) => {
    if (!text.todo) {
        return <h3>No data</h3>
    }else{
        if(text.saved){
            return <h3>{text.todo}</h3>;
        }else{
        return (<div>
            <h3>{text.todo}</h3>
            </div>);
        }
    }
};

function mapStateToProps(state){
    return {
        text: state.todoClick
    };
}

export default connect(mapStateToProps)(TodoDetail);