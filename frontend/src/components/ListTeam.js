import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectTeamMembers, selectTeamStatus, fetchTeamMembers } from '../reducers/teamSlice'
import { selectCurrentAccount } from '../reducers/accountsSlice'

import styles from '../styles/settings.module.css'

const ListTeam = () => {
    const teamStatus = useSelector(selectTeamStatus)
    const currentAccount = useSelector(selectCurrentAccount)
    const dispatch = useDispatch()

    useEffect(() => {
        if (teamStatus === 'idle') {
            dispatch(fetchTeamMembers(currentAccount))
        }
    }, [teamStatus, dispatch])

    const members = useSelector(selectTeamMembers)

    const renderTeam = members.map((member, i) => {
        return (
            <p key={i}>{ member.username } ({ member.email })</p>
        )
    })


    return (
        <div className={styles.list}>
            <h2>Team</h2>
            { renderTeam }
        </div>
    )
}

export default ListTeam