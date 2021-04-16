import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, switchAccount, selectCurrentAccount, addAccount } from '../reducers/accountsSlice'
import { fetchPosts } from '../reducers/gridSlice'

import { useHistory } from 'react-router-dom'

import styles from '../styles/settings.module.css'


const AddAccount = () => {

    const [newAccount, setNewAccount] = useState("")


    const handleNewAccount = e => {
        e.preventDefault()
        dispatch(addAccount(newAccount))
    }


    const accounts = useSelector(selectAccounts)
    const dispatch = useDispatch()
    const history = useHistory()
    const currentAccount = useSelector(selectCurrentAccount)

    const handleSwitch = account => {
        dispatch(switchAccount(account))
        dispatch(fetchPosts(account.username))
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
        <div>
            <form onSubmit={handleNewAccount} className={styles.editPost}>
                <div className={styles.form}>
                    <div className={styles.list}>
                        <h2> Accounts </h2>
                        { renderAccounts }
                    </div>
                    <input type="text" placeholder="instagram username" name="account" value={newAccount} onChange={e => setNewAccount(e.target.value)} />
                    <button type="submit">Add</button>
                </div>
            </form>

        </div>
    )
}

export default AddAccount