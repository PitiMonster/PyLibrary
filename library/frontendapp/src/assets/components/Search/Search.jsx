// external imports
import React from 'react';
import store from 'store';
import _ from 'lodash';
import { Redirect, Route, Link } from 'react-router-dom';
import { Table, Icon, Menu,  Sidebar, Header, Select, Form } from 'semantic-ui-react'

// internal imports
import './Search.scss';
import CONFIG from '../../config';
import BookInfo from '../BookInfo/BookInfo';

const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'title', text: 'Titles', value: 'title' },
    { key: 'author', text: 'Authors', value: 'author' },
  ]

export default class Search extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            books: [],
            token: store.get('token'),
            history: null,
            key: '',
            type: 'all',
            column: null,
            direction: null,
            start: 0,   // beginning of the number of books range
            end: 10,     // end of the number of books range, e.g.: <start, end)
        }
    }

    compareBy(key) {
       
        return function(a, b) {
            if (a[key].toLowerCase()<(b[key].toLowerCase())) return -1;
            if (a[key].toLowerCase()>(b[key].toLowerCase())) return 1;
            return 0;
        }
        ;}
        

    handleSort = (clickedColumn) => () => {
        const { column, books, direction } = this.state
        if (column !== clickedColumn) {
        let arrayCopy = books;
        arrayCopy.sort(this.compareBy(clickedColumn));
          this.setState({
            column: clickedColumn,
            books: arrayCopy,
            direction: 'ascending',
          });
    
          return
        }
    
        this.setState({
            books: books.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const { history } = this.props;
        this.setState({history: history, key: query.get('key'), type: query.get('type')},  this.handleSearch);
    }

    
    
    handleSearch = () => {
        console.log(this.state.key);
        const { type, key, start, end } = this.state;

        fetch(`${CONFIG.server}/library/search/${start}/${end}/${type}/${key}/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then( data => {
            if(!data.ok) {throw data}
            return data.json();
        })
        .then( data => {
            this.setState({books: data.content});
            console.log(data.content);
        })
        .catch( error => console.log(error))
    }

    handleInputChange = (e) => {
        this.setState({
            key: e.target.value
        });
    }

    render() {
        const { books, column, direction, history, key, type} = this.state;
        return (
            <div className="base-container">
                <Form onSubmit={() => {history.push(`/search?type=${type}&key=${key}`); this.handleSearch()}}>
                    <Form.Input type="text"
                        icon={{name: 'search', color:'blue', circular: true, link: true }}>
                        <input placeholder='Search...'
                                value={key}
                                onChange={this.handleInputChange}
                                />
                        <Select options={options} defaultValue={type} onChange={(e, { value }) => {this.setState({type: value})}} />

                    </Form.Input>
                </Form>
                <div className="table-container">
                    <Table compact sortable selectable celled size='large' color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell 
                                sorted={column === 'title' ? direction : null}
                                onClick={this.handleSort('title')}
                                >
                                    Title
                                </Table.HeaderCell>
                                <Table.HeaderCell 
                                sorted={column === 'author' ? direction : null}
                                onClick={this.handleSort('author')}
                                >
                                    Author
                                </Table.HeaderCell>

                                <Table.HeaderCell 
                                sorted={column === 'category' ? direction : null}
                                onClick={this.handleSort('category')}
                                >
                                    Category
                                </Table.HeaderCell>

                                <Table.HeaderCell>Details</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {books.map((book, index) => 
                            (
                                <Table.Row  key={index}>
                                    
                                    <Table.Cell> {book.title}</Table.Cell>
                                    <Table.Cell >{book.author}</Table.Cell>
                                    <Table.Cell >{book.category}</Table.Cell>
                                    <Table.Cell selectable textAlign='center'> <a href={`/search/book/${book.id}`}> {/* TODO change href to /home/books/ */}
                                        <Icon name="info circle" color="blue"/>
                                    </a></Table.Cell>
                                </Table.Row>
                            ), 
                            )}
                        </Table.Body>
                    </Table>
                </div>
               <Route path="/search/book/:bookId" component={BookInfo} />
            </div>
            
        )
    }
}