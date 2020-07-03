// external imports
import React from 'react';
import _ from 'lodash';
import { Redirect, Route, Link } from 'react-router-dom';
import { Table, Icon, Menu,  Sidebar, Header } from 'semantic-ui-react'
import store from 'store';

// internal imports
import './Home.scss';
import isLoggedIn from '../../helpers/is_logged_in';
import CONFIG from '../../config';
import BorrowingInfo from '../BookInfo/BorrowingInfo'


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: null,
            history: null,
            column: null,
            direction: null, 
        }
    }
    compareBy(key) {
        if (key === 'book.book.title')
            return function (a, b) {

            if (a.book.title.toLowerCase()<b.book.title.toLowerCase()) return -1;
            if (a.book.title.toLowerCase()>b.book.title.toLowerCase()) return 1;
            return 0;
            }
        else if (key === 'book.book.author')
            return function (a, b) {

                if (a.book.author.toLowerCase()<b.book.author.toLowerCase()) return -1;
                if (a.book.author.toLowerCase()>b.book.author.toLowerCase()) return 1;
                return 0;
            }
        else return function(a, b) {
            if (""+a[key]<(""+b[key])) return -1;
            if (""+a[key]>(""+b[key])) return 1;
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


    componentWillReceiveProps (props) {
        this.getBooks();
    }


    componentDidMount() {
        this.getBooks(); 
      }

    getBooks = () => {
        const token = store.get('token');
        this.setState({token: token});   
        
        const { history } = this.props;
        this.setState({history: history})
        
        fetch(CONFIG.server+'/library/borrowing/all/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token},
        })
        .then(data => {
            if(!data.ok) { throw data } // if got any exception from server 
            return data.json()   
        })
        .then( data => {
            console.log(data);
            
            this.setState({books: data.content})
            console.log(data.content);
            console.log(this.state.books);
            
            

        })
        .catch( error => console.log(error))
    }
    handleLogout = () => {  
        store.remove('loggedIn');
        store.remove('token');
        this.state.history.push('/login');
    };

    setVisible = (visible) => {
        this.setState({visible : visible})
    }


    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        const { books, column, direction } = this.state; 
        return (
        <div className="base-container">
         <Sidebar as={Menu}  compact visible vertical width="thin" icon="labeled" >
            <Link to="/home"> 
            <Menu.Item link name="book">
                <Icon name="book" color="blue"/>
                Books
            </Menu.Item>
            </Link>
            <Route
            path="/home" 
            render={() => (
                <Link to="/home">
                <Menu.Item link name="search" >
                    <Icon name="search" color="blue"/>
                    Search
                </Menu.Item>
                </Link>
            )}
            />
            <Menu.Item name="logout" onClick={this.handleLogout}>
            <Icon name="power" color="blue" />
            Logout
            </Menu.Item>
        </Sidebar>
            <div className="table-container">
                <Header as='h2' icon textAlign='center'>
                    <Icon name='desktop' circular color="blue"/>
                    <Header.Content>Your Library</Header.Content>
                </Header>
                <Table sortable selectable celled size='large' color="blue">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell 
                            sorted={column === 'book.book.title' ? direction : null}
                            onClick={this.handleSort('book.book.title')}
                            >
                                Title
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                            sorted={column === 'book.book.author' ? direction : null}
                            onClick={this.handleSort('book.book.author')}
                            >
                                Author
                            </Table.HeaderCell>
                            <Table.HeaderCell 
                            sorted={column === 'book.returning_date' ? direction : null}
                            onClick={this.handleSort('book.returning_date')}
                            >
                                Return Date
                            </Table.HeaderCell>
                            <Table.HeaderCell>Details</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {books.map((book, index) => 
                         (
                            <Table.Row  key={book.book.title}>
                                
                                <Table.Cell> {book.book.title}</Table.Cell>
                                <Table.Cell >{book.book.author}</Table.Cell>
                                <Table.Cell >{book.returning_date}</Table.Cell>
                                <Table.Cell selectable textAlign='center'> <a href={`/home/borrowings/${book.id}`}>
                                    <Icon name="info circle" color="blue"/>
                                </a></Table.Cell>
                            </Table.Row>
                         ), 
                        )}
                    </Table.Body>
                </Table>
                </div>
                <Route path="/home/borrowings/:borrwingId" component={BorrowingInfo} />
            </div>
        )};

}