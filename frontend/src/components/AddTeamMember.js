import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { addTeamMember } from '../reducers/teamSlice'

import styles from '../styles/settings.module.css'

const AddTeamMember = () => {

    const dispatch = useDispatch()

    const [newTeammate, setNewTeammate] = useState("")

    const handleNewTeammate = e => {
        e.preventDefault()
        console.log("New Teammate")
        dispatch(addTeamMember(newTeammate))
    }

    return (
        <div>
            <form onSubmit={handleNewTeammate} className={styles.form}>
                <input type="email" placeholder="email" name="teammate" value={newTeammate} onChange={e => setNewTeammate(e.target.value)} />
            </form>
        </div>
    )
}

export default AddTeamMember