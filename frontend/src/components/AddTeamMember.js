import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember, selectTeamMembers, selectTeamError } from '../reducers/teamSlice'
import { selectCurrentAccount } from '../reducers/accountsSlice'

import styles from '../styles/settings.module.css'

const AddTeamMember = () => {

    const dispatch = useDispatch()

    const [newTeammate, setNewTeammate] = useState("")
    const currentAccount = useSelector(selectCurrentAccount)
    const members = useSelector(selectTeamMembers)

    const [errorMsg, setErrorMsg] = useState("")

    const isInTeam = email => {
        let mem
        for( mem of members ){
            if (mem.email === email){
                setErrorMsg("Member already added")
                return true
            }
        }
        return false
    }

    const handleNewTeammate = e => {
        e.preventDefault()


        if (!isInTeam(newTeammate)){
            dispatch(addTeamMember({ "email": newTeammate, "account": currentAccount}))
            setErrorMsg('')
        }
        setNewTeammate('')
    }

    const newTeammateErrorMsg = useSelector(selectTeamError)

    useEffect(() => {
        setErrorMsg(newTeammateErrorMsg)
    },[newTeammateErrorMsg])

    return (
        <div>
            <form onSubmit={handleNewTeammate} className={styles.form}>
                <input type="email" placeholder="email" name="teammate" value={newTeammate} onChange={e => setNewTeammate(e.target.value)} />
                { errorMsg && <p class="errorText">{ errorMsg }</p> }
            </form>
        </div>
    )
}

export default AddTeamMember