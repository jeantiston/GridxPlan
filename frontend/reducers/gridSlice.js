import { createSlice } from '@reduxjs/toolkit'

export const gridSlice = createSlice({
    name: 'grid',
    initialState: { //when where can I fetch?
        value: [
            {
                id: 1,
                url: "https://picsum.photos/id/1/300"
            },
            {
                id: 2,
                url: "https://picsum.photos/id/2/300"
            },
            {
                id: 3,
                url: "https://picsum.photos/id/3/300"
            },
            {
                id: 4,
                url: "https://picsum.photos/id/4/300"
            },
            {
                id: 5,
                url: "https://picsum.photos/id/5/300"
            },
            {
                id: 6,
                url: "https://picsum.photos/id/6/300"
            },
            {
                id: 7,
                url: "https://picsum.photos/id/7/300"
            },
        ]
    },
    reducers: {
        moveCard: (state, action) => {
            const dragCard = state.value[action.payload.dragIndex]
            state.value.splice(action.payload.dragIndex, 1)
            state.value.splice(action.payload.hoverIndex, 0, dragCard)
        }
    }
})

export const { moveCard } = gridSlice.actions

export default gridSlice.reducer

export const selectGrid = state => state.grid.value