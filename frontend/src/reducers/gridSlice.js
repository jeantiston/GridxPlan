import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../data/client'

export const fetchPosts = createAsyncThunk('grid/fetchGrid', async account => {
    const url = '/api/grid/' + account
    // console.log(account)
    const response = await client.get(url)
    // console.log("account")
    // console.log(response)
    return response
})

export const moveCell = createAsyncThunk('grid/moveCell', async ( modifiedGrid, {getState}) => {
    const account = getState().accounts.currentAccount.username
    const url = '/api/grid/' + account
    console.log("grid")
    console.log(modifiedGrid)

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
        moveCard: (state, action) => {
            const dragCard = state.posts[action.payload.dragIndex]
            state.posts.splice(action.payload.dragIndex, 1)
            state.posts.splice(action.payload.hoverIndex, 0, dragCard)

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
            console.log("moveCell success")
            console.log(action.payload)
            console.log("moveCell success end")
            state.posts = action.payload
        },
        [moveCell.rejected]: (state, action) => {
            console.log("failed")
            state.status = 'failed'
            state.error = action.error.message
        },
    },
})



export const { moveCard } = gridSlice.actions

export default gridSlice.reducer

export const selectGrid = state => state.grid.posts