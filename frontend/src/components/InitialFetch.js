import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts, selectAccountsStatus, selectCurrentAccount } from '../reducers/accountsSlice'

const InitialFetch = ({children}) => {
    const dispatch = useDispatch()
    const accountsStatus = useSelector(selectAccountsStatus)

    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, [accountsStatus, dispatch])

    return children

}

export default InitialFetch