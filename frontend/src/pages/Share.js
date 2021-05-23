import React from 'react'

import { useSelector } from 'react-redux'
import { selectCurrentAccount } from '../reducers/accountsSlice'

import styles from '../styles/share.module.css'

const Share = () => {

    const currentAccount = useSelector(selectCurrentAccount)
    const shareUrl = `http://127.0.0.1:8000/planner/preview/${currentAccount.username}`

    return (
        <div className={styles.sharePage} onClick={() => {navigator.clipboard.writeText(shareUrl)}}>
            <h2>share this link to preview and comment</h2>
            <p>click the link to copy it to your clipboard</p>
            <p className={styles.shareLink}>{shareUrl}</p>
        </div>
    )
}

export default Share