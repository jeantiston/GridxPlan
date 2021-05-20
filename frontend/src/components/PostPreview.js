import React, { useState, useEffect } from 'react';

import styles from '../styles/editpost.module.css'

const EditPostForm = ({ postDetails }) => {

    const [msg, setMsg] = useState('')
    const onSubmit = data => console.log(data);

    const [datePreview, setDatePreview] = useState(new Date(postDetails.schedule))

    const [postComments, setPostComments] = useState([
        {
            id: 0,
            user: 'Jack',
            comment: 'Can you make that photo a bit brighter'
        },
        {
            id: 1,
            user: 'Jack',
            comment: 'Fantastic! Thanks. It’s good to go.'
        },
        {
            id: 2,
            user: 'Molly',
            comment: 'Add some more emojis in the caption.'
        }
    ])

    const comments = postComments.map( comment => {
        return (
            <div key={ comment.id }>
                <p><b>{ comment.user }</b></p>
                <p>{ comment.comment }</p>
            </div>
        )
    })

    return (
        <div >
                <div className={styles.postPhotoDetails} >
                    <div>
                        <img className={styles.img} src={ postDetails.image } alt="for social media" />
                    </div>
                    <div className={styles.postDetails}>
                        <h2>status</h2>
                        <p>{ postDetails.status }</p>
                        
                        <h2>schedule</h2>
                        <p>{ datePreview.toDateString() } { datePreview.toLocaleTimeString() }</p>
                        {/* <p>{ datePreview.toLocaleString() }</p> */}
                    </div>
                </div>
                <div className={styles.captionDetails}>
                    <p>{ postDetails.caption }</p>

                    <p>{ postDetails.hashtags }</p>
                    
                </div>

                <div>
                    <h2>Comments</h2>
                    <form onSubmit={ data => onSubmit(data)} className={styles.editPost}>
                        <div className={styles.captionDetails}>
                            <input type="text" 
                                name="comment"
                                value={ msg }
                                onChange={ e => setMsg(e.target.value) }
                            />
                        </div>
                    </form>
                    { comments }
                </div>

        </div>
    )
}

export default EditPostForm