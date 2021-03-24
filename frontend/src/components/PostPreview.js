import React, { useState } from 'react';

import styles from '../styles/editpost.module.css'

const EditPostForm = ({ imgDetails }) => {

    const [msg, setMsg] = useState('')
    const onSubmit = data => console.log(data);

    const comments = imgDetails.comments.map( comment => {
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
                        <img className={styles.img} src={ imgDetails.imgUrl } alt="for social media" />
                    </div>
                    <div className={styles.postDetails}>
                        <h2>status</h2>
                        <p>{ imgDetails.status }</p>
                        
                        <h2>schedule</h2>
                        <p>{ imgDetails.schedule }</p>
                    </div>
                </div>
                <div className={styles.captionDetails}>
                    <p>{ imgDetails.caption }</p>

                    <p>{ imgDetails.hashtags.join(" ") }</p>
                    
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