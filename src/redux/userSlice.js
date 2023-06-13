import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchUserData } from "./api";

// Define the async thunk action creator
const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await fetchUserData(userId);
    return response;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        usersLoading(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        usersReceived(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.users = action.payload
            }
        },
    },
    extraReducers: (builder) => {   //for example, the extraReducers field in the counterSlice handles the logout action dispatched by the authSlice. When the logout action is dispatched, the extra reducer sets the counter state to 0.
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})


//const { actions, reducer } = userSlice 

//export const { usersLoading, usersReceived } = actions
//export default reducer

export default userSlice.reducer;

export { fetchUser }