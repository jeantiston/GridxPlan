import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../data/client'

export const fetchAccounts = createAsyncThunk('account/fetchAccounts', async () => {
    const response = await client.get('/api/accounts')
    return response
})

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: [],
        currentAccount: '',
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchAccounts.pending]: (state, action) => {
            console.log("account:loading")
            state.status = 'loading'
        },
        [fetchAccounts.fulfilled]: (state, action) => {
            console.log("account:succeeded")
            state.status = 'succeeded'
            state.accounts = state.accounts.concat(action.payload)
            state.currentAccount = state.accounts[0]
        },
        [fetchAccounts.rejected]: (state, action) => {
            console.log("account:failed")
            state.status = 'failed'
            state.error = action.error.message
        }

    }
})

export default accountsSlice.reducer

export const selectAccounts = state => state.accounts.accounts
export const selectAccountsStatus = state => state.accounts.status
export const selectCurrentAccount = state => state.accounts.currentAccount