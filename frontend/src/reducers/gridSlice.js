import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../data/client'

export const fetchPosts = createAsyncThunk('grid/fetchGrid', async account => {
    const url = '/api/grid/' + account
    console.log(account)
    const response = await client.get(url)
    // console.log(response)
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
        }
    },
})



export const { moveCard } = gridSlice.actions

export default gridSlice.reducer

export const selectGrid = state => state.grid.posts