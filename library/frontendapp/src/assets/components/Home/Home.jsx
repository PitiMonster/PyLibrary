// external imports
import React from 'react';
import _ from 'lodash';
import { Redirect, Route, Link } from 'react-router-dom';
import { Table, Icon, Menu,  Sidebar, Header } from 'semantic-ui-react'
import store from 'store';
import InfiniteScroll from 'react-infinite-scroll-component';

// internal imports
import './Home.scss';
import isLoggedIn from '../../helpers/is_logged_in';
import CONFIG from '../../config';
import BorrowingInfo from '../BorrowingInfo/BorrowingInfo';
import BorrowingView from '../../views/BorrowingView/borrowing';


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            token: null,
            history: null,
            column: null,
            direction: null,
            start: 0,
            end: 10,
            items: [],
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

        const { start, end } = this.state;
        
        fetch(CONFIG.server+`/library/borrowing/${start}/${end}/all/`, {
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
            this.createItems();
            
            

        })
        .catch( error => console.log(error))
    }
    handleLogout = () => {  
        store.remove('loggedIn');
        store.remove('token');
        this.state.history.push('/login');
    };

    handleSearch = () => {
        this.state.history.push('/search');
    }

    setVisible = (visible) => {
        this.setState({visible : visible})
    }

    createItems = () => {
        const { books, history } = this.state;

        const newItems = books.map((book, index) =>
            <div key={index}>
                <BorrowingView author={book.book.author} title={book.book.title} photo={book.book.photo} borrowing_id={book.id} history={history} />,
            </div>,
            {/* this.setState({items: [...this.state.items, item]}) */}
        );
        console.log("XDDDDDDDDDDDDD");
        this.setState({items: newItems})
        console.log(newItems)
        // this.setState({items: newItems})

    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        const { books, column, direction, items } = this.state;

        // const xd = <BorrowingView author='xddd' title='xddd' photo='/assets/media/library_app/images/Harry%20Potter%20i%20Kamie%C5%84%20Filozoficzny-J.K.Rowling/def_book.jpg' />
        // const items = [xd, xd, xd, xd, xd]
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
                <Link to="/search">
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
                {/* <Table sortable selectable celled size='large' color="blue">
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
                            <Table.Row  key={index}>
                                
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
                </Table> */}
                
                    <InfiniteScroll
                        dataLength={items.length} //This is important field to render the next data
                        next={'xd'}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }
                        // below props only if you need pull down functionality
                        // refreshFunction={this.refresh}
                        // pullDownToRefresh
                        pullDownToRefreshContent={
                            <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                        }>
                        {items}
                    </InfiniteScroll>
                    <Route path="/home/borrowings/:borrwingId" component={BorrowingInfo} />
                </div>
            </div>
        )};

}