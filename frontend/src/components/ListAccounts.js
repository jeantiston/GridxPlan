import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAccounts, selectAccountsStatus, selectAccounts, switchAccount, selectCurrentAccount } from '../reducers/accountsSlice'
import { fetchPosts } from '../reducers/gridSlice'
import { fetchTeamMembers } from '../reducers/teamSlice'

import { useHistory } from 'react-router-dom'

import styles from '../styles/settings.module.css'

const ListAccounts = () => {

    const dispatch = useDispatch()

    const accountsStatus = useSelector(selectAccountsStatus)

    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, [accountsStatus, dispatch])

    const accounts = useSelector(selectAccounts)
    const history = useHistory()
    const currentAccount = useSelector(selectCurrentAccount)

    const handleSwitch = account => {
        dispatch(switchAccount(account))
        dispatch(fetchPosts(account.username))
        dispatch(fetchTeamMembers(account))
        history.push("/")
    }

    const renderAccounts = accounts.map((account, i) => {
        if (account.username === currentAccount.username ) {
            return ( <b key={i}  onClick={ () => handleSwitch(account) } >@{ account.username }</b> )
        }
        return (
            <p key={i}  onClick={ () => handleSwitch(account) } >@{ account.username }</p>
        )
    })

    return (
            <div className={styles.list}>
                <h2> Accounts </h2>
                { renderAccounts }
            </div>
    )
}

export default ListAccounts