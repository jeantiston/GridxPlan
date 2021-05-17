import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../data/client'

export const fetchPosts = createAsyncThunk('grid/fetchGrid', async account => {
    const url = '/api/grid/' + account
    const response = await client.get(url)
    return response
})

export const moveCell = createAsyncThunk('grid/moveCell', async ( modifiedGrid, {getState}) => {
    const account = getState().accounts.currentAccount.username
    const url = '/api/grid/' + account

    const response = await client.put(url, { grid: modifiedGrid })
    return response
})

export const gridSlice = createSlice({
    name: 'grid',
    initialState: { 
        posts: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addCell: (state, action) => {
            console.log("addCell")
            state.posts.unshift(action.payload)
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            console.log("loading")
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = action.payload
        },
        [fetchPosts.rejected]: (state, action) => {
            console.log("failed")
            state.status = 'failed'
            state.error = action.error.message
        },
        [moveCell.pending]: (state, action) => {
            console.log("loading")
            state.status = 'loading'
        },
        [moveCell.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.posts = action.payload
        },
        [moveCell.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    },
})



export const { addCell } = gridSlice.actions

export default gridSlice.reducer

export const selectGrid = state => state.grid.posts