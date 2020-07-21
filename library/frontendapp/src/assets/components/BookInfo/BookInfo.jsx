// external imports
import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import store from 'store';

// internal imports
import CONFIG from '../../config'

export default class BorrowingInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            book: {
                id: '',
                title: '',
                author: '',
                description: '',
                category: '',
                available: null, 
                release_date: null, 
                },
            token : store.get('token'), 
            history: null, 
        }
    }

    componentDidMount() {
        const token = this.state.token;
        const { match : { params }, history } = this.props;
        fetch(`${CONFIG.server}/library/book/0/1/${params.bookId}/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token},
        })
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            console.log(data)
            this.setState(
            { book :
                {
                    title : data.content.title,
                    author: data.content.author,
                    description: data.content.description,
                    category: data.content.category,
                    photo: data.content.photo,
                    available: data.content.available,
                    release_date: data.content.release_date,
                    
                },

                history: history, 
            }
        )
        }); 
    }

    render() {
        const { book, history } = this.state; 
        return (
            <Modal open dimmer='blurring' >

              <Modal.Header>{book.title}</Modal.Header>
              <Modal.Content image>
                <Image wrapped size="small" src={`${CONFIG.server}${book.photo}`} />
                <Modal.Description>
                  <p>Author: {book.author}</p>
                  <p>Description: {book.description}</p>
                  <p>Category: {book.category}</p>
                  <p>Available: {book.available}</p>
                  <p>Release date: {book.release_date}</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
          <Button onClick={() => history.goBack()}>Close</Button>
          <Button color="blue">Borrow</Button>
        </Modal.Actions>
            </Modal>
          );
    }
}

