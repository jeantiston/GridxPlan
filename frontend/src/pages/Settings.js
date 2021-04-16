import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import AddAccount from '../components/AddAccount'

import styles from '../styles/settings.module.css'

const Settings = () => {

    const [newTeammate, setNewTeammate] = useState("")

    const handleNewTeammate = e => {
        e.preventDefault()
        console.log("New Teammate")
    }

    return (
        <div className={styles.settings}>
            <form onSubmit={handleNewTeammate} className={styles.editPost}>
                <div className={styles.form}>
                    <div className={styles.list}>
                        <h2> Team </h2>
                        <p>jack (jack@socialmedia.agency)</p>
                        <p>molly (molly@socialmedia.agecy)</p>
                        <p>mike (mike@socialmedia.agency)</p>
                    </div>
                    <input type="email" placeholder="email" name="teammate" value={newTeammate} onChange={e => setNewTeammate(e.target.value)} />
                </div>
            </form>

            < AddAccount />

            <div className={styles.logoutButton}>
                <FontAwesomeIcon icon={faPowerOff} size="2x" />
                <sub className={styles.sub}>logout</sub>
            </div>
        </div>
    )
}

export default Settings