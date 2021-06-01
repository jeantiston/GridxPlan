import React, { useState } from 'react';

import styles from '../styles/editpost.module.css'

const EditPostForm = ({postDetails, setPostDetails, err, setErr}) => {

    const [captionSubStyle, setCaptionSubStyle ] = useState(styles.sub)
    const [hashtagSubStyle, setHashtagSubStyle ] = useState(styles.sub)

    const handleCaption = (maxCount, input) => {

        setPostDetails({...postDetails, caption: input})

        if (input.length > maxCount) {
            setCaptionSubStyle(`${styles.sub} ${styles.subErr}`)
            setErr({...err, caption: true })
        }
        else {
            setCaptionSubStyle(styles.sub)
            setErr({...err, caption: false })
        }
    }

    const [hashtagCount, setHashtagCount] = useState(postDetails.hashtags.length)

    const handleHashtags = (maxCount, input) => {
        let errHashtags = false
        const hashtags = input.split(" ")
        const pattern = /#\w*/i

        let filtered = hashtags.filter( el => {
            return el !== "";
        });

        for (let hashtag of filtered) {
            if (!pattern.test(hashtag) && hashtag) {
                errHashtags = errHashtags || true
                break
            }
        }

        

        setPostDetails({...postDetails, hashtags: input})

        const count = input.split("#").length - 1
        setHashtagCount(count)

        if (filtered.length > maxCount) {
            setHashtagSubStyle(`${styles.sub} ${styles.subErr}`)
            errHashtags = errHashtags || true
        }
        else {
            setHashtagSubStyle(styles.sub)
            errHashtags = errHashtags || false
        }
        setErr({ ...err, hashtags: errHashtags })
    }

    return (
        <div >
            <form onSubmit={e => e.preventDefault() } className={styles.editPost}>
                <div className={styles.postPhotoDetails} >
                    <div>
                        <img className={styles.img} src={ postDetails.image } alt="for social media" />
                    </div>
                    <div className={styles.postDetails}>
                        <h2>status</h2>
                        <select value={ postDetails.status } onChange={ e => setPostDetails({...postDetails, status: e.target.value}) } name="status">
                            <option value="backlog">backlog</option>
                            <option value="need captions">need captions</option>
                            <option value="need hashtags">need hashtags</option>
                            <option value="revise">revise</option>
                            <option value="review">for review</option>
                            <option value="approved">approved</option>
                            <option value="scheduled">scheduled</option>
                            <option value="posted">posted</option>
                        </select>
                        <h2>schedule</h2>
                        <input 
                            value={ postDetails.schedule }
                            type="datetime-local" 
                            placeholder="schedule" 
                            name="schedule"
                            onChange={ e => setPostDetails({...postDetails, schedule: e.target.value}) }
                            />
                    </div>
                </div>
                <div className={styles.captionDetails}>
                    <textarea 
                        name="caption"
                        value={ postDetails.caption }
                        onChange={ e => handleCaption(2100, e.target.value) }
                    />
                    <sub className={captionSubStyle}>{ postDetails.caption.length }/2100</sub>
                    { err.caption && <sub className={styles.subErr}>Caption should be less than 2100 characters</sub> }

                    <textarea 
                        name="hashtags" 
                        value={ postDetails.hashtags }
                        onChange={ e => handleHashtags(30, e.target.value) }
                    />
                    <sub className={hashtagSubStyle}>{ hashtagCount }/30</sub>
                    { err.hashtags && <sub className={styles.subErr}>Wrong hashtag format</sub> }

                </div>
            </form>
        </div>
    )
}

export default EditPostForm