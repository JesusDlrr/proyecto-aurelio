import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    user: null
};

const userSlice = createSlice({
    name: "user",
    initial_state,
    reducers: {
        login: (state, actions) => {
            state.user = actions.payload
        },
        logout: (state, actions) => {
            state.user = null
        }
    }
});

export const {login, logout} = userSlice.actions;
export const {select_user} = (state) => {};
export default userSlice.reducer;