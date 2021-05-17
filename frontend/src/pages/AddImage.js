import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentAccount } from '../reducers/accountsSlice'
import { addCell } from '../reducers/gridSlice'
import { useHistory } from 'react-router-dom'

const AddImage = () => {
    const [imgUrl, setImgUrl] = useState("")
    const currentAccount = useSelector(selectCurrentAccount)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = e => {

        e.preventDefault()
        console.log("New Image")
        console.log(imgUrl)

        const payload = {
            account: currentAccount.username,
            image: imgUrl
        }

        fetch('/api/post/add', {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then( response => response.json())
        .then( response => {
            console.log("response")
            console.log(response)
            const post = {
                image: response.image,
                postId: parseInt(response.id)
            }
            dispatch(addCell(post))

            history.push("/edit/" + response.id)

        })
    }

    return (
        <div>
            <h1>Add Image</h1>

            <form onSubmit={handleSubmit}>
                <input type="url" placeholder="https://" name="img-url" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                <input type="submit" value="Upload" />
            </form>

        </div>
    )
}

export default AddImage