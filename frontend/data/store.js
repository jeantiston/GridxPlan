// import { createStore, compose } from 'redux'
// import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore } from '@reduxjs/toolkit'
import gridReducer from '../reducers/gridSlice'

export default configureStore({
    reducer: {
        grid: gridReducer
    }
})