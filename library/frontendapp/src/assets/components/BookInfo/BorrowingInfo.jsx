import React from 'react';
import { Button, Image, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CONFIG from '../../config'
import store from 'store'; 

export default class BorrowingInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            book: {
                title: '',
                author: '',
                description: '',
                category: ''
                },
            expiration_date: null,
            token : store.get('token'), 
            borrowingId: null, 
            history: null, 
        }
        this.extendBorrowing = this.extendBorrowing.bind(this);
    }

    componentDidMount() {
        const token = this.state.token;
        const { match : { params }, history } = this.props;
        fetch(`${CONFIG.server}/library/borrowing/${params.borrwingId}/`, {
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
                    title : data.content.book.title,
                    author: data.content.book.author,
                    description: data.content.book.description,
                    category: data.content.book.category,
                },
                expiration_date: data.content.returning_date,
                borrowingId: data.content.id, 
                history: history, 
            }
        )
        }); 
    }

    extendBorrowing(e){
        const { borrowingId, token } = this.state; 
        const { history } = this.props; 

        fetch(`${CONFIG.server}/library/borrow/`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token,
                },
                body: JSON.stringify({"type": 'extend_termin',
                    'borrowing_id': `${borrowingId}`, 
                    'days_num': '7', 
            })
        })
        .then( () => {
            history.push('/home');
        });

    }

    render() {
        const { book } = this.state; 
        const { expiration_date } = this.state; 
        return (
            <Modal open dimmer="blurring">

              <Modal.Header>{book.title}</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <p>Author: {book.author}</p>
                  <p>Description: {book.description}</p>
                  <p>Category: {book.category}</p>
                  <p>Valid until: {expiration_date}</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
          <Link to="/home"><Button>Close</Button></Link>
          <Button positive onClick={this.extendBorrowing}>Extend for one week</Button>
        </Modal.Actions>
            </Modal>
          );
    }



}

