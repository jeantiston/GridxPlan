import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../data/client'

export const fetchPosts = createAsyncThunk('grid/fetchGrid', async () => {
    console.log("he2y")

    const response = await client.get('/api/grid/jeloufish')
    // console.log(response)
    return response
})

export const gridSlice = createSlice({
    name: 'grid',
    initialState: { //when where can I fetch?
        posts: [],
        status: 'idle',
        error: null
    },
    reducers: {
        moveCard: (state, action) => {
            // console.log(action.payload)
            const dragCard = state.posts[action.payload.dragIndex]
            state.posts.splice(action.payload.dragIndex, 1)
            state.posts.splice(action.payload.hoverIndex, 0, dragCard)
            console.log(state.posts)
            console.log("state.posts")
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            console.log("loading")
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // console.log("succeed")
            // console.log(action.payload)
            // console.log(action.payload.slice().sort((a, b) => a.position < b.position))
            // console.log("sorted")
            state.posts = state.posts.concat(action.payload.sort((a, b) => a.position < b.position))
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