import React from 'react'

import styles from '../styles/share.module.css'

const Share = () => {
    return (
        <div className={styles.sharePage} >
            <h2>share this link to preview and comment</h2>
            {/* put a copy to clipboard by clicking */}
            <p className={styles.shareLink}>https://gridxplan.social/asdiopdk</p>
        </div>
    )
}

export default Share