import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Define the async thunk action creator
const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
    /*const response = await fetchUser(userId);
    return response;*/
});

const initialState = {
    loading: false,

    userId: "",
    userName: "",
    userEmail: "",
    userToken: "",
    userEmail_verified: false,

    error: null,
    success: false, // for monitoring the registration process.
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /*usersLoading(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        usersReceived(state, action) {
            if (state.loading === 'pending') {
                state.loading = 'idle'
                state.users = action.payload
            }
        },*/
        
        setUser(state, action) {
            state.userId = action.payload.id
            state.userName = action.payload.name
            state.userEmail = action.payload.email
            state.userToken = action.payload.token
            state.userEmail_verified = action.payload.token
        },
        removeUser(state) {
            state.userId = ""
            state.userName = ""
            state.userEmail = ""
            state.userToken = ""
        },
    },
    /*extraReducers: (builder) => {   //for example, the extraReducers field in the counterSlice handles the logout action dispatched by the authSlice. When the logout action is dispatched, the extra reducer sets the counter state to 0.
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },*/
})


//const { actions, reducer } = userSlice 

//export const { usersLoading, usersReceived } = actions
//export default reducer

export default userSlice.reducer;
export const { setUser, removeUser } = userSlice.actions

//export { fetchUser }