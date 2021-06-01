import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import PostPreview from '../components/PostPreview'
import PostPreviewBar from '../components/PostPreviewBar'

const ClientPostPreview = () => {
    const { postId } = useParams()


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
            
        })

    }, [])

    return (
        <div>
            <PostPreviewBar >
                <PostPreview postDetails={postDetails} />
                <p>.</p>
            </PostPreviewBar>
        </div>
    )
}

export default ClientPostPreview