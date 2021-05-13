import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addAccount, selectAccounts } from '../reducers/accountsSlice'

import styles from '../styles/settings.module.css'

const AddAccount = () => {

    const [newAccount, setNewAccount] = useState("")
    const dispatch = useDispatch()

    const accounts = useSelector(selectAccounts)
    const [errorMsg, setErrorMsg] = useState("")

    const isInAccounts = username => {
        let account
        for( account of accounts ){
            if (account.username === username){
                setErrorMsg("Account already added")
                return true
            }
        }
        return false
    }

    const handleNewAccount = e => {
        e.preventDefault()

        if(!isInAccounts(newAccount)){
            dispatch(addAccount(newAccount))
            setErrorMsg('')
        }
        setNewAccount('')
    }

    return (
            <form onSubmit={handleNewAccount} className={styles.form}>
                <input type="text" placeholder="instagram username" name="account" value={newAccount} onChange={e => setNewAccount(e.target.value)} />
                { errorMsg && <p class="errorText">{ errorMsg }</p> }
            </form>
    )
}

export default AddAccount