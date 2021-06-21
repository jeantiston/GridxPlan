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

    // const saveCell = (url)

    const uploadFile = (file, s3Data, url) => {

        let formData = new FormData()
        for(let key in s3Data.fields){
            formData.append(key, s3Data.fields[key]);
        }
        formData.append('file', file)
        formData.append('account', currentAccount.username)

        fetch(url, {
            method: 'PUT',
            body: formData
        }).then( response => {
            if (response.status === 200){
                const post = {
                    image: url,
                    postId: 123 //parseInt(response.id)
                }

                console.log("url-----------------------")
                console.log(url)
                dispatch(addCell(post))
    
                history.push("/")
            }
        })

        // .then( response => {
        //     const post = {
        //         image: response.image,
        //         postId: parseInt(response.id)
        //     }
        //     dispatch(addCell(post))

        //     history.push("/")
        // })

    }

    const getSignedRequest = (file) => {
        fetch(`/sign_s3?file_name=${file.name}&file_type=${file.type}`)
        .then(response => response.json() )
        .then( response => {
            uploadFile(file, response.data, response.url)
        })
    }

    const handleChange = (e) => {

        if(e.target.files[0] ){
            if(e.target.files[0].size < 5000000){

                getSignedRequest(e.target.files[0])

                // let formData = new FormData()
                // formData.append('image', e.target.files[0])
                // formData.append('account', currentAccount.username)

                // fetch('/api/post/add', {
                //     method: 'POST',
                //     body: formData
                // }).then( response => response.json())
                // .then( response => {
                //     const post = {
                //         image: response.image,
                //         postId: parseInt(response.id)
                //     }
                //     dispatch(addCell(post))

                //     history.push("/")
                // })
            }
        }
        else{
            alert("No file selected.");
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