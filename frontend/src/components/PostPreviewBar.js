import React from 'react'
import { useHistory } from "react-router-dom"

import styles from '../styles/postbar.module.css'

const PostPreviewBar = ({children}) => {
    const history = useHistory()

    const back = () => {
        history.goBack()
    }

    return(
        <div>
            <div className={styles.flex}>
                <div onClick={back}><p>Back</p></div>
            </div>
            { children }
            <div className={styles.flexBottom}> </div>
        </div>
    )
}

export default PostPreviewBar