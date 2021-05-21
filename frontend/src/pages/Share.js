import React from 'react'

import { useSelector } from 'react-redux'
import { selectCurrentAccount } from '../reducers/accountsSlice'

import styles from '../styles/share.module.css'

const Share = () => {

    const currentAccount = useSelector(selectCurrentAccount)

    return (
        <div className={styles.sharePage} onClick={() => {navigator.clipboard.writeText(`https://gridxplan.social/planner/preview/${currentAccount.username}`)}}>
            <h2>share this link to preview and comment</h2>
            <p>click the link to copy it to your clipboard</p>
            <p className={styles.shareLink}>https://gridxplan.social/planner/preview/{currentAccount.username} </p>
        </div>
    )
}

export default Share