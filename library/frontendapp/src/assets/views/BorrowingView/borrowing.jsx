import React, { useState } from 'react';

import CONFIG from '../../config';
import './borrowing.scss'

export default function BorrowingView({author, title, photo, borrowing_id, history}) {

    const [data, setData] = useState({
                                    author: author,
                                    title: title,
                                    photo: `${CONFIG.server}${photo}`,
                                    });
    
    return(
        
        <div className="borrowing-view" onClick={() => history.push(`/home/borrowings/${borrowing_id}`)}>

            <img src={data.photo} alt="book image" className="borrowing-img"/>

            <div className="title-author">
                {data.title} by {data.author}
            </div>
        </div>
    )
}
