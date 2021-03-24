import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import PostBar from '../components/PostBar'
import EditPostForm from '../components/EditPostForm'
import PostPreview from '../components/PostPreview'


const EditPost = () => {

    const [editSection, setEditSection] = useState(true)

    let { postId } = useParams()
    
    const [imgDetails, setImgDetails] = useState({
        id: postId,
        imgUrl: "https://picsum.photos/300?random=" + postId.toString(),
        caption: 'lorem ipsum dolor',
        status: 'revise',
        schedule: 'Jan 1, 2021 - 8:00pm',
        hashtags: ['#planner', '#planning', '#lovingit'],
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

    return (
        <div>
            <PostBar editSection={editSection} setEditSection={setEditSection} >
                { editSection ?
                    <EditPostForm imgDetails={imgDetails} setImgDetails={setImgDetails} />
                    : <PostPreview imgDetails={imgDetails} />
                }
                
                
            </PostBar>

        </div>
    )
}

export default EditPost