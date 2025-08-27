import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserState {
    username: string;
    email: string;
};


const initialState: UserState = {
    username: "",
    email: "",
};


export const Userslice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        }
    }
});


export const { setUsername, setEmail } = Userslice.actions;
export default Userslice.reducer;