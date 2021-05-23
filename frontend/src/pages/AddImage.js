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

    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        // if (e.target.files[0].size < 1024){
            setImage({image: e.target.files})
        // }
    }

    const handleSubmit = e => {

        e.preventDefault()

        let formData = new FormData()
        formData.append('image', image.image[0])
        formData.append('account', currentAccount.username)

        // console.log("formData")
        // console.log(formData.get('image'))

        fetch('/api/post/add', {
            method: 'POST',
            body: formData
        }).then( response => response.json())
        .then( response => {
            // console.log("response")
            // console.log(response)
            const post = {
                image: response.image,
                postId: parseInt(response.id)
            }
            dispatch(addCell(post))

            history.push("/")
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name="image"
				/>
                <input type="submit" value="Upload" />
            </form>

        </div>
    )
}

export default AddImage