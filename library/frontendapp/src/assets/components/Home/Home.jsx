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
            token: store.get('token'),
            history: null,
            column: null,
            direction: null,
            start: 0,
            end: 10,
            items: [],
            hasMore: true,
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
        const { history } = this.props;
        this.setState({history: history})
        this.getBooks();
    }


    componentDidMount() {


        const { history } = this.props;
        this.setState({history: history})

        this.getBooks(); 
      }

    getBooks = () => {

        const { token } = this.state;
        
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
            
            this.setState({books: this.state.books.concat(data.content)})
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
        const { books, history, start, end } = this.state;

        const newBooks = books.slice(start, end);

        const newItems = newBooks.map((book, index) =>
            <div key={index+start}>
                <BorrowingView 
                author={book.book.author} 
                title={book.book.title} 
                photo={book.book.photo} 
                borrowing_id={book.id}
                return_date = {book.returning_date}  
                history={history} />
            </div>,
        );
        this.setState({items: this.state.items.concat(newItems)})

        if (newItems.length < end) {
            this.setState({hasMore: false});
        }


    }

    fetchData = () => {
        this.setState({start: this.state.start + 1});
        this.setState({end: this.state.end + 1});
        console.log("NEW DATA FETCHED");
        
        console.log(this.state.start);
        console.log(this.state.end);
        console.log(this.state.hasMore)
        
        
        this.getBooks();

    }

    render() {
        if(!isLoggedIn()) {
            return <Redirect to="/login" />
        }
        const { books, column, direction, items } = this.state;

        return (
        <div className="base-container">

         <Menu size='massive' compact icon="labeled" >
            <Link to="/home"> 
            <Menu.Item link name="book">
                <Icon name="book" color="blue"/>
                Books
            </Menu.Item>
            </Link>
            <Link to="/search?type=all&key=">
            <Menu.Item link name="search" >
                <Icon name="search" color="blue"/>
                Search
            </Menu.Item>
            </Link>

            <Menu.Item name="logout" onClick={this.handleLogout}>
            <Icon name="power" color="blue" />
            Logout
            </Menu.Item>
        </Menu>
            <div className="table-container">
                <Header as='h1' icon textAlign='center'>
                    <Icon.Group size='big'>
                        <Icon size='big' name='desktop' color='blue' circular  />
                    </Icon.Group>
                    <Header.Content>Your Library</Header.Content>
                </Header>
               
                    <InfiniteScroll
                        dataLength={items.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }
                        >
                        {items}
                    </InfiniteScroll>
                    <Route path="/home/borrowings/:borrwingId" component={BorrowingInfo} />
                </div>
            </div>
        )};
}