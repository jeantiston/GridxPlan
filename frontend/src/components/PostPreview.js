import React, { useState } from 'react';

import styles from '../styles/editpost.module.css'

const EditPostForm = ({ postDetails }) => {

    const [msg, setMsg] = useState('')
    const onSubmit = data => console.log(data);

    const comments = postDetails.comments.map( comment => {
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
                        <p>{ postDetails.schedule }</p>
                    </div>
                </div>
                <div className={styles.captionDetails}>
                    <p>{ postDetails.caption }</p>

                    <p>{ postDetails.hashtags.join(" ") }</p>
                    
                </div>

                {/* Comments Section */}

                <div>
                    <h2>Comments</h2>
                    <form onSubmit={ data => onSubmit(data)} className={styles.editPost}>
                        <div className={styles.captionDetails}>
                            <input type="text" 
                                name="comment"
                                value={ msg }
                                onChange={ e => setMsg(e.target.value) }
                                // ref={register({maxLength: 2100})} 
                            />
                        </div>
                    </form>
                    { comments }
                </div>

        </div>
    )
}

export default EditPostForm