import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, actions) => {
            state.user = actions.payload;
            console.log(actions.payload)
        },
        logout: (state, actions) => {
            // state.id = null
        },
        printInfo: (state, actions) => {
            console.log(state.id)
        }
    }
});

export const {setUserInfo, logout, printInfo} = userSlice.actions;
// export const {select_user} = (state) => {};
export default userSlice.reducer;