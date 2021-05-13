import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { addAccount } from '../reducers/accountsSlice'

import styles from '../styles/settings.module.css'

const AddAccount = () => {

    const [newAccount, setNewAccount] = useState("")
    const dispatch = useDispatch()


    const handleNewAccount = e => {
        e.preventDefault()
        dispatch(addAccount(newAccount))
    }

    return (
            <form onSubmit={handleNewAccount} className={styles.form}>
                <input type="text" placeholder="instagram username" name="account" value={newAccount} onChange={e => setNewAccount(e.target.value)} />
            </form>
    )
}

export default AddAccount