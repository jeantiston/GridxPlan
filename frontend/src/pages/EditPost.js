import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PostBar from '../components/PostBar'
import EditPostForm from '../components/EditPostForm'
import PostPreview from '../components/PostPreview'

import { useHistory } from 'react-router-dom'

const EditPost = () => {

    const [editSection, setEditSection] = useState(true)

    let { postId } = useParams()
    
    const [postDetails, setPostDetails] = useState({
        id: postId,
        image: '',
        caption: '',
        status: 'backlog',
        schedule: '',
        hashtags: '',
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

            let schedule = ''
            if(res.schedule) {
                const date = new Date(res.schedule)
                schedule = getLocalDate(date)
            }

            setPostDetails({
                hashtags: res.hashtags,
                image: res.image,
                caption: res.caption,
                status: res.status,
                schedule: schedule
            })
            
        })

    }, [])

    const history = useHistory()

    const handleSubmit = () => {
        console.log(postDetails)
        const date = new Date(postDetails.schedule)
        
        const payload = {
            hashtags: postDetails.hashtags,
            caption: postDetails.caption,
            status: postDetails.status,
            schedule: date.toJSON()
        }
        console.log("payload")
        console.log(payload)

        fetch('/api/post/edit/' + postId , {
            method: 'PUT',
            body: JSON.stringify(payload)
        }).then(function(response) {
            console.log("response")
            console.log(response)
            history.push("/")
        })

        
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