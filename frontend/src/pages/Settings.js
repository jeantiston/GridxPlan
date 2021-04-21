import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import AddAccount from '../components/AddAccount'
import AddTeamMember from '../components/AddTeamMember'

import styles from '../styles/settings.module.css'

const Settings = () => {

    return (
        <div className={styles.settings}>
            < AddTeamMember />

            < AddAccount />

            <div className={styles.logoutButton}>
                <FontAwesomeIcon icon={faPowerOff} size="2x" />
                <sub className={styles.sub}>logout</sub>
            </div>
        </div>
    )
}

export default Settings