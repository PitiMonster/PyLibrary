import React, { Component } from 'react';
import './Table.scss';
import { Link } from 'react-router-dom'

export default class Table extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {

        }
    }

    renderTableData = () => {
        const history  = this.props.history;
        return this.props.books.map((book, index) => {
            return (
            <tr key={ index } onClick={() => {history.push('book/'+book.book.id)}}>
                        <td>{book.book.title}</td>
                        <td>{book.book.author}</td>
                        <td>{book.returning_date}</td>
                </tr>
            )
        })
    }

    renderTableHeader = () => {
        console.log(this.props.headers)
        return this.props.headers.map((header, index) => {
            return <th key={index}>{header.toUpperCase()}</th>
        })
    }

    render() {
        return(
            <div className="table">
                <table className="books">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}