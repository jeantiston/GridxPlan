import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import AddAccount from '../components/AddAccount'
import ListAccounts from '../components/ListAccounts'
import AddTeamMember from '../components/AddTeamMember'
import ListTeam from '../components/ListTeam'

import styles from '../styles/settings.module.css'

const Settings = () => {

    return (
        <div className={styles.settings}>
            <ListAccounts />
            < AddAccount />

            < ListTeam />
            < AddTeamMember />

            <div className={styles.logoutButton}>
                <FontAwesomeIcon icon={faPowerOff} size="2x" />
                <sub className={styles.sub}>logout</sub>
            </div>
        </div>
    )
}

export default Settings