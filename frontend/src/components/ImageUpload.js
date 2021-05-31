import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentAccount } from '../reducers/accountsSlice'
import { addCell } from '../reducers/gridSlice'
import { useHistory } from 'react-router-dom'

import styles from '../styles/bottommenu.module.css'

const ImageUpload = () => {

    const currentAccount = useSelector(selectCurrentAccount)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (e) => {
        console.log(e.target.files[0].size)

        if(e.target.files[0] ){
            if(e.target.files[0].size < 5000000){
                let formData = new FormData()
                formData.append('image', e.target.files[0])
                formData.append('account', currentAccount.username)

                fetch('/api/post/add', {
                    method: 'POST',
                    body: formData
                }).then( response => response.json())
                .then( response => {
                    console.log("response")
                    console.log(response)
                    const post = {
                        image: response.image,
                        postId: parseInt(response.id)
                    }
                    dispatch(addCell(post))

                    history.push("/")
                })
            }
        }
    }

    return(
        <div>
            <input id="image-upload" type="file" accept="image/*" onChange={handleChange} name="image" />
                <label for="image-upload" >
                    <div className={styles.menuItem} >
                            <FontAwesomeIcon icon={faFileImage} size="2x" className={ styles.icon } />
                            <sub className={styles.menuText}>add image</sub>
                    </div>
                </label>
        </div>
    )
}

export default ImageUpload