import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        postId: null,
        image: '',
        caption: '',
        status: 'backlog',
        schedule: '',
        hashtags: [],
        status: 'idle',
        error: null
    },
    reducers: {}

})