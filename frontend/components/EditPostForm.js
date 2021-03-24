import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '../styles/editpost.module.css'

const EditPostForm = ({imgDetails, setImgDetails}) => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log("Sub");
    console.log(errors);

    const [captionSubStyle, setCaptionSubStyle ] = useState(styles.sub)
    const [hashtagSubStyle, setHashtagSubStyle ] = useState(styles.sub)
    const [err, setErr] = useState(false)

    const handleCaption = (maxCount, input) => {

        setImgDetails({...imgDetails, caption: input})

        if (input.length > maxCount) {
            setCaptionSubStyle(`${styles.sub} ${styles.subErr}`)
        }
        else {
            setCaptionSubStyle(styles.sub)
        }
    }

    const [hashtagCount, setHashtagCount] = useState(imgDetails.hashtags.length)

    const handleHashtags = (maxCount, input) => {
        const hashtags = input.split(" ")
        const pattern = /#\w*/i

        let filtered = hashtags.filter( el => {
            return el !== "";
        });

        setErr(false)

        for (let hashtag of filtered) {
            if (!pattern.test(hashtag) && hashtag) {
                setErr(true)
                break
            }
        }

        

        setImgDetails({...imgDetails, hashtags: hashtags})

        const count = input.split("#").length - 1
        setHashtagCount(count)

        if (filtered.length > maxCount) {
            setHashtagSubStyle(`${styles.sub} ${styles.subErr}`)
        }
        else {
            setHashtagSubStyle(styles.sub)
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.editPost}>
                <div className={styles.postPhotoDetails} >
                    <div>
                        <img className={styles.img} src={ imgDetails.imgUrl } alt="for social media" />
                    </div>
                    <div className={styles.postDetails}>
                        <h2>status</h2>
                        <select value={ imgDetails.status } onChange={ e => setImgDetails({...imgDetails, status: e.target.value}) } name="status" ref={register}>
                            <option value="need captions">need captions</option>
                            <option value="need hashtags"> need hashtags</option>
                            <option value="revise"> revise</option>
                            <option value="approved"> approved</option>
                            <option value="scheduled"> scheduled</option>
                            <option value="posted"> posted</option>
                        </select>
                        <h2>schedule</h2>
                        <input type="datetime-local" placeholder="schedule" name="schedule" ref={register} />
                    </div>
                </div>
                <div className={styles.captionDetails}>
                    <textarea 
                        name="caption"
                        value={ imgDetails.caption }
                        onChange={ e => handleCaption(2100, e.target.value) }
                        ref={register({maxLength: 2100})} 
                    />
                    <sub className={captionSubStyle}>{ imgDetails.caption.length }/2100</sub>
                    {/* {errors.caption && "caption error"} */}

                    <textarea 
                        name="hashtags" 
                        value={ imgDetails.hashtags.join(" ") }
                        onChange={ e => handleHashtags(30, e.target.value) }
                        ref={register({maxLength: 2000, pattern: /#\w+/i})} 
                    />
                    <sub className={hashtagSubStyle}>{ hashtagCount }/30</sub>
                    { err && <sub className={styles.subErr}>Wrong hashtag format</sub> }

                    <button type="submit" value="Submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditPostForm