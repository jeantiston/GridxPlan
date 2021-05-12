import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember, selectTeamMembers } from '../reducers/teamSlice'
import { selectCurrentAccount } from '../reducers/accountsSlice'

import styles from '../styles/settings.module.css'

const AddTeamMember = () => {

    const dispatch = useDispatch()

    const [newTeammate, setNewTeammate] = useState("")
    const currentAccount = useSelector(selectCurrentAccount)
    const members = useSelector(selectTeamMembers)

    const isInTeam = email => {
        let mem
        for( mem of members ){
            if (mem.email === email){
                return true
            }
        }
        return false
    }

    const handleNewTeammate = e => {
        e.preventDefault()


        if (!isInTeam(newTeammate)){
            console.log("New Teammate")
            console.log(currentAccount)
            dispatch(addTeamMember({ "email": newTeammate, "account": currentAccount}))
        }
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