import React, { Component } from 'react';
import {Pagination, Icon} from 'semantic-ui-react';

const FirstItem = () => (
    <Icon name='angle double left' onClick={()=>console.log('first')}/>
);

class NotesPage extends Component{
    constructor(props){
        super(props);
        this.state = {minIndex: 1, maxIndex: 10, activepage: 1}
    }

    handleClick = (event, data) => {
        let minIndex;
        let maxIndex;
        console.log(data);
        console.log(event.target);
        switch(data.content){
            case "<":
                if(data.activePage !== 1 ) {
                    maxIndex = minIndex;
                    minIndex = ( data.activePage - 1 ) * 10;
                    this.setState({activePage: minIndex, minIndex: minIndex, maxIndex: maxIndex});
                }
                
            case ">":
                if(data.activePage !== data.totalPages ) {
                    minIndex = maxIndex;
                    maxIndex = ( data.activePage + 1 ) * 10;
                    this.setState({activePage: minIndex, minIndex: minIndex, maxIndex: maxIndex});
                }  
        }
        console.log(this.state);
    }


    render(){
        const {activePage} = this.state;
        return(
          <Pagination
            onPageChange={this.handleClick}
            activePage={activePage}
            defaultActivePage={1}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={<FirstItem />}
            lastItem={{ content: <Icon name='angle double right' />, icon: true, name: "last" }}
            prevItem={{ content: <Icon name='angle left' />, icon: true, name: 'prev' }}
            nextItem={{ content: <Icon name='angle right' />, 
            icon: true, name: 'next' }}
            totalPages={Math.ceil(10)}
        />
        );
    }
}

export default NotesPage;