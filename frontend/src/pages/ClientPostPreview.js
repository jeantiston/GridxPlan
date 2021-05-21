import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import PostPreview from '../components/PostPreview'

const ClientPostPreview = () => {
    const { postId } = useParams()

    console.log(postId)

    const [postDetails, setPostDetails] = useState({
        id: postId,
        image: '',
        caption: '',
        status: 'backlog',
        schedule: '',
        hashtags: ''
    })

    const offset = new Date().getTimezoneOffset() * 1000 * 60
    const getLocalDate = value => {
        const offsetDate = new Date(value).valueOf() - offset
        const date = new Date(offsetDate).toISOString()
        return date.substring(0, 16)
    }

    useEffect(() => {
        console.log("postId")
        console.log(postId)
        console.log(`/api/post/${postId}`)

        fetch(`/api/post/${postId}`)
        .then(res => res.json())
        .then(res => {

            let schedule = ''
            if(res.schedule) {
                const date = new Date(res.schedule)
                schedule = getLocalDate(date)
            }

            setPostDetails({...postDetails,
                hashtags: res.hashtags,
                image: res.image,
                caption: res.caption,
                status: res.status,
                schedule: schedule
            })

            console.log(postDetails)
            console.log(postDetails)
            
        })

    }, [])

    return (
        <div>
            {/* <h3>Post Preview</h3> */}
            <PostPreview postDetails={postDetails} />
        </div>
    )
}

export default ClientPostPreview