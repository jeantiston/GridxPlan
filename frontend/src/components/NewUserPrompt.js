import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAccountsStatus, selectAccounts, switchAccount } from '../reducers/accountsSlice'

import AddAccount from './AddAccount'

import styles from '../styles/modal.module.css'

const NewUserPrompt = () => {
    const accountsStatus = useSelector(selectAccountsStatus)
    const accounts = useSelector(selectAccounts)

    const [showPrompt, setShowPrompt] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (accountsStatus === 'succeeded') {
            if (!accounts.length) {
                setShowPrompt(true)
            }
            else {
                setShowPrompt(false)
                dispatch(switchAccount(accounts[0]))
            }
        }
    }, [accountsStatus, accounts])

    return ( 
        <div>
            { showPrompt && 
                <div class={styles.modal}>
                    <div class={styles.modalContent}>
                        <p>Seems like you have not added any Instagram account yet. Add one now.</p>
                        <AddAccount />
                    </div>
                </div>
            }
        </div>
    )

}

export default NewUserPrompt