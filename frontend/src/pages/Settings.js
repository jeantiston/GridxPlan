import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts, selectAccountsStatus } from '../reducers/accountsSlice'
import { fetchTeamMembers, selectTeamStatus } from '../reducers/teamSlice'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import AddAccount from '../components/AddAccount'
import AddTeamMember from '../components/AddTeamMember'

import styles from '../styles/settings.module.css'

const Settings = () => {

    const dispatch = useDispatch()

    const accountsStatus = useSelector(selectAccountsStatus)

    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, [accountsStatus, dispatch])

    const teamStatus = useSelector(selectTeamStatus)

    useEffect(() => {
        if (teamStatus === 'idle') {
            dispatch(fetchTeamMembers())
        }
    }, [teamStatus, dispatch])

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