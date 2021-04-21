// import { createStore, compose } from 'redux'
// import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore } from '@reduxjs/toolkit'
import gridReducer from '../reducers/gridSlice'
import accountsReducer from '../reducers/accountsSlice'
import teamReducer from '../reducers/teamSlice'

export default configureStore({
    reducer: {
        grid: gridReducer,
        accounts: accountsReducer,
        team: teamReducer
    }
})