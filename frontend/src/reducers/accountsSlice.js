import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../data/client'

export const fetchAccounts = createAsyncThunk('accounts/fetchAccounts', async () => {
    const response = await client.get('/api/accounts')
    return response
})

export const addAccount = createAsyncThunk('account/addAccount', async ( newAccount ) => {
    const response = await client.post('/api/accounts', { account: newAccount })
    return response
})

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        accounts: [],
        currentAccount: { username: '' },
        status: 'idle',
        error: null
    },
    reducers: {
        switchAccount: (state, action) => {
            state.currentAccount = action.payload
        }
    },
    extraReducers: {
        [fetchAccounts.pending]: (state, action) => {
            console.log("account:loading")
            state.status = 'loading'
        },
        [fetchAccounts.fulfilled]: (state, action) => {
            console.log("account:succeeded")
            state.status = 'succeeded'
            state.accounts = state.accounts.concat(action.payload)
            state.accounts.length > 0 ? state.currentAccount = state.accounts[0] : state.currentAccount = { username: '' }
        },
        [fetchAccounts.rejected]: (state, action) => {
            console.log("account:failed")
            state.status = 'failed'
            state.error = action.error.message
        },

        [addAccount.pending]: (state, action) => {
            console.log("addAccount:loading")
            state.status = 'loading'
        },
        [addAccount.fulfilled]: (state, action) => {
            console.log("addAccount:succeeded")
            state.status = 'succeeded'
            state.accounts.push(action.payload.account)
        },
        [addAccount.rejected]: (state, action) => {
            console.log("addAccount:failed")
            state.status = 'failed'
            state.error = action.error.message
        },

    }
})

export const { switchAccount } = accountsSlice.actions

export default accountsSlice.reducer

export const selectAccounts = state => state.accounts.accounts
export const selectAccountsStatus = state => state.accounts.status
export const selectCurrentAccount = state => state.accounts.currentAccount