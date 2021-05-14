import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PostBar from '../components/PostBar'
import EditPostForm from '../components/EditPostForm'
import PostPreview from '../components/PostPreview'

const EditPost = () => {

    const [editSection, setEditSection] = useState(true)

    let { postId } = useParams()
    
    const [postDetails, setPostDetails] = useState({
        id: postId,
        image: '',
        caption: '',
        status: 'backlog',
        schedule: '',
        hashtags: [],
        comments: [
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
        ]
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
            console.log("res")
            console.log(res)

            let hashtags = []
            if (typeof res.hashtags === 'string' ){
                hashtags = res.hashtags.split(" ")
            }

            let schedule = ''
            if(res.schedule) {
                const date = new Date(res.schedule)
                schedule = getLocalDate(date)
            }

            setPostDetails({
                hashtags: hashtags,
                image: res.image,
                caption: res.caption,
                status: res.status,
                schedule: schedule
            })
            
        })

    }, [])

    const handleSubmit = () => {
        console.log(postDetails)
    }


    return (
        <div>
            <PostBar handleSubmit={handleSubmit} editSection={editSection} setEditSection={setEditSection} >
                { editSection ?
                    <EditPostForm postDetails={postDetails} setPostDetails={setPostDetails} />
                    : <PostPreview postDetails={postDetails} />
                }
                
                
            </PostBar>

        </div>
    )
}

export default EditPost