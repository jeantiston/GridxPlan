import React from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, switchAccount, selectCurrentAccount } from '../reducers/accountsSlice'
import { fetchPosts } from '../reducers/gridSlice'

import { useHistory } from 'react-router-dom'

import styles from '../styles/settings.module.css'

const Settings = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

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
        console.log("renderAcc")
        console.log(account.username)
        console.log(currentAccount)
        console.log("endrender")
        if (account.username === currentAccount.username ) {
            return ( <b key={i}  onClick={ () => handleSwitch(account) } >@{ account.username }</b> )
        }
        return (
            <p key={i}  onClick={ () => handleSwitch(account) } >@{ account.username }</p>
        )
    })

    return (
        <div className={styles.settings}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.editPost}>
            {/* <h1>Settings</h1> */}
                <div className={styles.form}>
                    <div className={styles.list}>
                        <h2> Team </h2>
                        <p>jack (jack@socialmedia.agency)</p>
                        <p>molly (molly@socialmedia.agecy)</p>
                        <p>mike (mike@socialmedia.agency)</p>
                    </div>
                    <input type="email" placeholder="email" name="teammate" ref={register} />
                </div>
            </form>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.editPost}>
                <div className={styles.form}>
                    <div className={styles.list}>
                        <h2> Accounts </h2>
                        { renderAccounts }
                    </div>
                    <input type="text" placeholder="instagram username" name="account" ref={register} />
                    <button type="submit">Add</button>
                </div>
            </form>
            <div className={styles.logoutButton}>
                <FontAwesomeIcon icon={faPowerOff} size="2x" />
                <sub className={styles.sub}>logout</sub>
            </div>
        </div>
    )
}

export default Settings