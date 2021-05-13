import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../data/client'

export const fetchTeamMembers = createAsyncThunk('team/fetchTeamMembers', async (account) => {
    const response = await client.get('/api/team/' + account.username)
    return response
})

export const addTeamMember = createAsyncThunk('team/addTeamMember', async (params) => {
    const response = await client.post('/api/team/' + params.account.username , { email: params.email })
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
            state.error = ''
            state.members = action.payload
        },
        [fetchTeamMembers.rejected]: (state, action) => {
            console.log("team:failed")
            state.status = 'failed'
            state.error = action.error.message
        },

        [addTeamMember.pending]: (state, action) => {
            console.log("addTeamMember:loading")
            state.status = 'loading'
        },
        [addTeamMember.fulfilled]: (state, action) => {
            console.log("addTeamMember:succeeded")
            state.status = 'succeeded'
            state.error = ''
            state.members.push(action.payload.member)
        },
        [addTeamMember.rejected]: (state, action) => {
            console.log("addTeamMember:failed")
            state.status = 'failed'
            state.error = action.error.message
        }

    }
})

export default teamSlice.reducer

export const selectTeamMembers = state => state.team.members
export const selectTeamStatus = state => state.team.status
export const selectTeamError = state => state.team.error