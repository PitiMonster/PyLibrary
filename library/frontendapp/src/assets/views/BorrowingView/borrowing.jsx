import React, { useState } from 'react';

import CONFIG from '../../config';
import './borrowing.scss'

export default function BorrowingView({author, title, photo, borrowing_id, return_date, history}) {


    
    return(
        
        <div className="borrowing-view" onClick={() => history.push(`/borrowed/borrowings/${borrowing_id}`)}>

            <img src={`${CONFIG.server}${photo}`} alt="book image"/>
            <div class="overlay">
                <div class="text">
                    <h2>{title} </h2>
                    <h3>{author}</h3>
                    <h3> Return until: {return_date}</h3>
                </div>
            </div>
            <div className="title-author">
                <h2>{title} </h2>
            </div>
        </div>
    )
}
