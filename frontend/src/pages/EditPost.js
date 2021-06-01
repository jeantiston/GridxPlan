import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PostBar from '../components/PostBar'
import EditPostForm from '../components/EditPostForm'
import PostPreview from '../components/PostPreview'

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCell } from '../reducers/gridSlice'

const EditPost = () => {

    const [editSection, setEditSection] = useState(true)

    let { postId } = useParams()
    
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

            setPostDetails({ ...postDetails,
                hashtags: res.hashtags,
                image: res.image,
                caption: res.caption,
                status: res.status,
                schedule: schedule
            })
            
        })

    }, [])

    const history = useHistory()

    const [err, setErr] = useState({
        caption: false,
        hashtags: false
    })

    const handleSubmit = () => {
        if (!err.caption && !err.hashtags) {
            console.log(postDetails)
            const date = new Date(postDetails.schedule)
            
            const payload = {
                hashtags: postDetails.hashtags,
                caption: postDetails.caption,
                status: postDetails.status,
                schedule: date.toJSON()
            }

            fetch('/api/post/edit/' + postId , {
                method: 'PUT',
                body: JSON.stringify(payload)
            }).then(function(response) {
                history.push("/")
            })
        }

    }

    const dispatch = useDispatch()
    const deletePost = () => {

        fetch('/api/post/edit/' + postId , {
            method: 'DELETE'
        }).then(function(response) {
            history.push("/")
            dispatch(deleteCell(postId))
        })

    }


    return (
        <div>
            <PostBar handleSubmit={handleSubmit} editSection={editSection} setEditSection={setEditSection} deletePost={deletePost}>
                { editSection ?
                    <EditPostForm postDetails={postDetails} setPostDetails={setPostDetails} err={err} setErr={setErr} />
                    : <PostPreview postDetails={postDetails} />
                }
                <p>.</p>
                
                
            </PostBar>

        </div>
    )
}

export default EditPost