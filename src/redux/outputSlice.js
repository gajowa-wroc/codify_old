import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,

    output: "",
    outputArr: [],

    error: null,
    success: false,
}

const outputSlice = createSlice({
    name: "output",
    initialState,
    reducers: {
        addOutput(state, action) {
            state.output = action.payload;
        },
        addArray(state, action) {
            //state.outputArr.push(...[state.output, "\n>>>" + action.payload])
            state.outputArr = [];
        },
        setOutputLoading(state, action) {
            state.loading = action.payload;
          },
    },

})

export default outputSlice.reducer;
export const { addOutput, addArray, setOutputLoading } = outputSlice.actions
