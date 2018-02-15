import React, { Component } from 'react';
import _ from 'lodash';
import {List} from 'semantic-ui-react';
 
class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }
 
    componentWillMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
 
    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }
 
    setPage(page, pageSize) {
        const {items} = this.props;
        const { pager } = this.state;
 
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        let newPager = this.getPager(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: newPager });
        this.props.onChangePage(pageOfItems);
    }
 
    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;
        const totalPages = Math.ceil(totalItems / pageSize);
 
        let startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        const pages = _.range(startPage, endPage + 1);
 

        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }
 
    render() {
        const { pager } = this.state;
        const { pageSize } = this.props;
 
        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }
 
        return (
            <List horizontal>
                <List.Item className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <List.Content onClick={() => this.setPage(1, pageSize)}>First</List.Content>
                </List.Item>
                <List.Item className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <List.Content onClick={() => this.setPage(pager.currentPage - 1, pageSize)}>Previous</List.Content>
                </List.Item>
                {pager.pages.map((page, index) =>
                    <List.Item key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <List.Content onClick={() => this.setPage(page, pageSize)}>{page}</List.Content>
                    </List.Item>
                )}
                <List.Item className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <List.Content onClick={() => this.setPage(pager.currentPage + 1, pageSize)}>Next</List.Content>
                </List.Item>
                <List.Item className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <List.Content onClick={() => this.setPage(pager.totalPages, pageSize)}>Last</List.Content>
                </List.Item>
            </List>
        );
    }
}

export default PaginationComponent;