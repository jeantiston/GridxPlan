import React, { useState, useEffect } from 'react';

import styles from '../styles/editpost.module.css'

const EditPostForm = ({ postDetails }) => {

    const [datePreview, setDatePreview] = useState()
    const [timePreview, setTimePreview] = useState()

    useEffect(() => {
        let datePreviewStr = (new Date(postDetails.schedule)).toDateString()
        if (datePreviewStr === "Invalid Date"){
            setDatePreview("No Schedule")
        }
        else {
            setDatePreview(datePreviewStr)
        }
    
        let timePreviewStr = new Date(postDetails.schedule).toLocaleTimeString()
        if (timePreviewStr === "Invalid Date"){
            setTimePreview("")
        }
        else {
            setTimePreview(timePreviewStr)
        }
    },[postDetails])


    const [comment, setComment] = useState('')
    const [username, setUsername] = useState('')
    const [postComments, setPostComments] = useState([])

    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            username: username,
            comment: comment
        }

        fetch(`/api/comments/${postDetails.id}`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then( res => res.json())
        .then( res => {
            setPostComments([res.comment, ...postComments])
            setUsername('')
            setComment('')
        })
    }

    useEffect(() => {
        fetch(`/api/comments/${postDetails.id}`)
        .then(res => res.json())
        .then( res => {
            setPostComments(res)
        })
    },[])

    const comments = postComments.map( comment => {
        return (
            <div key={ comment.id }>
                <p><b>{ comment.username }</b></p>
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
                        <p>{ datePreview } { timePreview }</p>
                    </div>
                </div>
                <div className={styles.captionDetails}>
                    <p>{ postDetails.caption }</p>

                    <p>{ postDetails.hashtags }</p>
                    
                </div>

                <div>
                    <h2>Comments</h2>
                    <form onSubmit={handleSubmit} className={styles.editPost}>
                        <div className={styles.captionDetails}>
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                name="username" 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                                required
                            />

                            <textarea 
                                name="comment"
                                value={ comment }
                                onChange={ e => setComment(e.target.value) }
                                placeholder="Type your comment here"
                                required
                            />
                            <input type="submit" value="Post Comment" />
                        </div>
                    </form>
                    { comments }
                </div>

        </div>
    )
}

export default EditPostForm