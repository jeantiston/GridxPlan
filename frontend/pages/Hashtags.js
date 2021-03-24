import React from 'react';

import styles from '../styles/hashtags.module.css'

const Hashtags = () => {
    return (
        <div className={styles.hashtagsPage}>
            {/* <h1>Hashtags </h1> */}
            <div className={styles.hashtags}>
                <div className={styles.hashtag}>
                    <h2>Group 1</h2>
                    <p className={styles.tags}>
                    #socialmediatips #onlinestrategy #socialmediaforbusiness #socialmediaforsmallbusiness #onlinemarketingstrategies
                    </p>
                </div>

                <div className={styles.hashtag}>
                    <h2>Group 2</h2>
                    <p className={styles.tags}>
                    #socialmediatips #onlinestrategy #socialmediaforbusiness #socialmediaforsmallbusiness #onlinemarketingstrategies
                    </p>
                </div>

                <div className={styles.hashtag}>
                    <h2>Group 3</h2>
                    <p className={styles.tags}>
                    #socialmediatips #onlinestrategy #socialmediaforbusiness #socialmediaforsmallbusiness #onlinemarketingstrategies
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default Hashtags