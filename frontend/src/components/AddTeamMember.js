import React, { useState } from 'react'

import styles from '../styles/settings.module.css'

const AddTeamMember = () => {

    const [newTeammate, setNewTeammate] = useState("")

    const handleNewTeammate = e => {
        e.preventDefault()
        console.log("New Teammate")
    }

    return (
        <div>
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
        </div>
    )
}

export default AddTeamMember