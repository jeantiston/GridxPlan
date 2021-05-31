import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts, selectAccountsStatus } from '../reducers/accountsSlice'

import NewUserPrompt from './NewUserPrompt'

const InitialFetch = ({children}) => {
    const dispatch = useDispatch()
    const accountsStatus = useSelector(selectAccountsStatus)

    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, [accountsStatus, dispatch])

    return ( 
        <div>
            <NewUserPrompt />
            { children }
        </div>
    )

}

export default InitialFetch