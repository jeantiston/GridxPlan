import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../data/client'

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async () => {
    const response = await client.get('api/team')
    return response
})

export const teamSlice = createSlice({
    name: 'team',
    initialState: {
        members: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers:{
        [fetchTeamMembers.pending]: (state, action) => {
            console.log("team:loading")
            state.status = 'loading'
        },
        [fetchTeamMembers.fulfilled]: (state, action) => {
            console.log("team:succeeded")
            state.status = 'succeeded'
            state.members = state.members.concat(action.payload)
        },
        [fetchTeamMembers.rejected]: (state, action) => {
            console.log("team:failed")
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default teamSlice.reducer

export const selectTeamMembers = state => state.team.members
export const selectTeamStatus = state => state.team.status